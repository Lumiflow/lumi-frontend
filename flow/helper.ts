// @ts-expect-error: no typing
import * as fcl from "@onflow/fcl";

export const mintTestTokens = async () => {
  const transactionId = await fcl.mutate({
    cadence: `
      import FungibleToken from 0xFungibleToken
      import TestToken from 0xTestToken

      transaction(){
        prepare(acct: AuthAccount){
            var vault <- TestToken.createVaultTEST(amount: 5.0)
            acct.save<@FungibleToken.Vault>(<-vault, to: /storage/MainVault)
    
            // Create a public Receiver capability to the Vault
            acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)
        }
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const queryTokens = async (userAddress?: string) => {
  const tokens = await fcl.query({
    cadence: `
    import FungibleToken from 0xFungibleToken
    import TestToken from 0xTestToken

    pub fun main(account: Address): UFix64 {
      let acct = getAccount(account)
      let vaultRef = acct.getCapability<&FungibleToken.Vault{FungibleToken.Balance}>(/public/MainReceiver)
      return vaultRef.borrow()!.balance
    }
    `,
    args: (arg: any, t: any) => [arg(userAddress, t.Address)],
  });
  console.log({ tokens });
};
