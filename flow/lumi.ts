// @ts-expect-error: no typing
import * as fcl from "@onflow/fcl";

export const getUsdcVault = async () => {};

export const createStreamFlow = async (
  receiverAddress: string,
  amount: string,
  startTimestamp: number,
  endTimestamp: number,
) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken
      import FlowToken from 0xFlowToken

      transaction(receiver: Address, amount: UFix64, startTimestamp: UFix64, endTimestamp: UFix64){
        prepare(acct: AuthAccount){
            var currentTimeStamp = getCurrentBlock().timestamp;

            var ownerProviderCapability = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
        		  ?? panic("Could not borrow reference to the owner's Vault!")
            var vault <- ownerProviderCapability.withdraw(amount: amount);
    
            var receiverCapability = getAccount(receiver).getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/MainReceiver)
            var ownerReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/MainReceiver)
            
            var streamResource <- Lumi.createStream(
                streamVault: <- vault, 
                receiverCapability: receiverCapability, 
                ownerReceiverCapability: ownerReceiverCapability,
                startTime: startTimestamp, 
                endTime: endTimestamp)
    
            var streamCollection <- Lumi.createEmptyCollection()
            streamCollection.deposit(source: <- streamResource)
    
            acct.save<@Lumi.SourceCollection>(<-streamCollection, to: /storage/SourceCollection)
            acct.link<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/MainGetter, target: /storage/SourceCollection)
            acct.link<&Lumi.SourceCollection{Lumi.StreamClaimer}>(/public/MainClaimer, target: /storage/SourceCollection)
        }
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    args: (arg: any, t: any) => [
      arg(receiverAddress, t.Address),
      arg(amount, t.UFix64),
      arg(startTimestamp, t.UFix64),
      arg(endTimestamp, t.UFix64),
    ],
    limit: 50,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const getLastStreamInfoIn = async (userAddress: string) => {
  try {
    const streamIn = await fcl.query({
      cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken
      import FlowToken from 0xFlowToken
      
      pub fun main(account: Address): [Lumi.Stream] {
        let acct = getAccount(account)
        var currentTimeStamp = getCurrentBlock().timestamp
        var res: [Lumi.Stream] = []
    
        for key in Lumi.toDestinationSources[account]!.keys {
            var sender = Lumi.toDestinationSources[account]![key]!
            let lumiStreamGetter = getAccount(sender).getCapability<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/MainGetter)
    
            res.append(lumiStreamGetter.borrow()!.getInfo(id: key)) 
        }
    
        return res
      }
    `,
      args: (arg: any, t: any) => [arg(userAddress, t.Address)],
    });
    return streamIn;
  } catch {
    return [];
  }
};

export const getLastStreamInfoOut = async (userAddress: string) => {
  try {
    const streamOut = await fcl.query({
      cadence: `
      import Lumi from 0xLumi

      pub fun main(account: Address): [Lumi.Stream] {
          var res: [Lumi.Stream] = []
      
          let lumiStreamGetter = getAccount(account).getCapability<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/MainGetter)
          var keys = lumiStreamGetter.borrow()!.getSourceStreamKeys()
      
          for id in keys {
              res.append(lumiStreamGetter.borrow()!.getInfo(id: id)) 
          }
      
          return res
      }
    `,
      args: (arg: any, t: any) => [arg(userAddress, t.Address)],
    });
    return streamOut;
  } catch {
    return [];
  }
};
