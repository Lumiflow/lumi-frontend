// @ts-expect-error: no typing
import * as fcl from "@onflow/fcl";

export const createStreamFlowLending = async (
  receiverAddress: string,
  amount: string,
  startTimestamp: number,
  endTimestamp: number,
  tag: string,
) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken
      import PoolWrapper from 0xPoolWrapper

      transaction(receiver: Address, amount: UFix64, startTime: UFix64, endTime: UFix64, tag: String){
        prepare(acct: AuthAccount){
            var currentTimeStamp = getCurrentBlock().timestamp;
    
            var receiverCapability = getAccount(receiver).getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            var ownerReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            var ownerProviderCapability = acct.borrow<&PoolWrapper.Vault>(from: /storage/poolWrapper)
                ?? panic("Could not borrow reference to the owner's Vault!")
    
            var depositVault <- ownerProviderCapability.withdraw(amount: amount);
            
            var streamResource <- Lumi.createStream(
                streamVault: <- depositVault, 
                tag: tag,
                receiverCapability: receiverCapability, 
                ownerReceiverCapability: ownerReceiverCapability,
                startTime: startTime, 
                endTime: endTime)
    
    
            var collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
    
            if(collectionRef == nil){
                var streamCollection <- Lumi.createEmptyCollection()
                acct.save<@Lumi.SourceCollection>(<-streamCollection, to: /storage/sourceCollectionv2)
                let ReceiverRef = acct.link<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/mainGetter, target: /storage/sourceCollectionv2)
                let ClaimerRef = acct.link<&Lumi.SourceCollection{Lumi.StreamClaimer}>(/public/mainClaimer, target: /storage/sourceCollectionv2)
    
                collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
            }
    
            collectionRef!.deposit(source: <- streamResource)
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
      arg(tag, t.String),
    ],
    limit: 200,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const createStreamUsdc = async (
  receiverAddress: string,
  amount: string,
  startTimestamp: number,
  endTimestamp: number,
  tag: string,
) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken
      import FiatToken from 0xUsdcToken

      transaction(receiver: Address, amount: UFix64, startTime: UFix64, endTime: UFix64, tag: String){
        prepare(acct: AuthAccount){
            var currentTimeStamp = getCurrentBlock().timestamp;
    
            var receiverCapability = getAccount(receiver).getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(FiatToken.VaultReceiverPubPath)
            var ownerReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(FiatToken.VaultReceiverPubPath)
            var ownerProviderCapability = acct.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath)
                ?? panic("Could not borrow reference to the owner's Vault!")
    
            var depositVault <- ownerProviderCapability.withdraw(amount: amount);
            
            var streamResource <- Lumi.createStream(
                streamVault: <- depositVault, 
                tag: tag,
                receiverCapability: receiverCapability, 
                ownerReceiverCapability: ownerReceiverCapability,
                startTime: startTime, 
                endTime: endTime)
    
    
            var collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
    
            if(collectionRef == nil){
                var streamCollection <- Lumi.createEmptyCollection()
                acct.save<@Lumi.SourceCollection>(<-streamCollection, to: /storage/sourceCollectionv2)
                let ReceiverRef = acct.link<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/mainGetter, target: /storage/sourceCollectionv2)
                let ClaimerRef = acct.link<&Lumi.SourceCollection{Lumi.StreamClaimer}>(/public/mainClaimer, target: /storage/sourceCollectionv2)
    
                collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
            }
    
            collectionRef!.deposit(source: <- streamResource)
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
      arg(tag, t.String),
    ],
    limit: 200,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const createStreamFlow = async (
  receiverAddress: string,
  amount: string,
  startTimestamp: number,
  endTimestamp: number,
  tag: string,
) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken
      import FlowToken from 0xFlowToken

      transaction(receiver: Address, amount: UFix64, startTime: UFix64, endTime: UFix64, tag: String){
        prepare(acct: AuthAccount){
            var currentTimeStamp = getCurrentBlock().timestamp;
    
            var receiverCapability = getAccount(receiver).getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            var ownerReceiverCapability = acct.getCapability<&FungibleToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            var ownerProviderCapability = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Could not borrow reference to the owner's Vault!")
    
            var depositVault <- ownerProviderCapability.withdraw(amount: amount);
            
            var streamResource <- Lumi.createStream(
                streamVault: <- depositVault, 
                tag: tag,
                receiverCapability: receiverCapability, 
                ownerReceiverCapability: ownerReceiverCapability,
                startTime: startTime, 
                endTime: endTime)
    
    
            var collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
    
            if(collectionRef == nil){
                var streamCollection <- Lumi.createEmptyCollection()
                acct.save<@Lumi.SourceCollection>(<-streamCollection, to: /storage/sourceCollectionv2)
                let ReceiverRef = acct.link<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/mainGetter, target: /storage/sourceCollectionv2)
                let ClaimerRef = acct.link<&Lumi.SourceCollection{Lumi.StreamClaimer}>(/public/mainClaimer, target: /storage/sourceCollectionv2)
    
                collectionRef = acct.borrow<&Lumi.SourceCollection>(from: /storage/sourceCollectionv2)
            }
    
            collectionRef!.deposit(source: <- streamResource)
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
      arg(tag, t.String),
    ],
    limit: 200,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const wrapLending = async (amount: string) => {
  const transactionId = await fcl.mutate({
    cadence: `
    import Lumi from 0xLumi
    import FungibleToken from 0xFungibleToken
    import PoolWrapper from 0xPoolWrapper
    import FlowToken from 0xFlowToken
    
    transaction(amount: UFix64){
      prepare(acct: AuthAccount){
  
          var lendingAssetProvider = acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow reference to the owner's Vault!")
  
          var lendAsset <- lendingAssetProvider.withdraw(amount: amount);
  
          var vault <- PoolWrapper.wrap(lendAsset: <- lendAsset)
  
  
          var ownerVault = acct.borrow<&PoolWrapper.Vault>(from: /storage/poolWrapper)
  
          if(ownerVault == nil){
              var emptyVault <- PoolWrapper.createEmptyVault()
              acct.save<@FungibleToken.Vault>(<-emptyVault, to: /storage/poolWrapper)
  
              // Create a public Receiver capability to the Vault
          let ReceiverRef =
                  acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>
                  (/public/poolWrapperReceiver, target: /storage/poolWrapper)
  
              ownerVault = acct.borrow<&PoolWrapper.Vault>(from: /storage/poolWrapper)
          }
  
          log("minted ".concat(vault.balance.toString()))
  
          ownerVault!.deposit(from: <- vault)
      }
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    args: (arg: any, t: any) => [arg(amount, t.UFix64)],
    limit: 200,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const claimAvailable = async (streamId: string) => {
  const transactionId = await fcl.mutate({
    cadence: `
      import Lumi from 0xLumi
      import FungibleToken from 0xFungibleToken

      transaction(streamId: UInt64){
        prepare(acct: AuthAccount){
            var sender = Lumi.toDestinationSources[acct.address]![streamId] ?? panic("No stream with this id")
            let lumiStreamClaimer = getAccount(sender).getCapability<&Lumi.SourceCollection{Lumi.StreamClaimer}>(/public/mainClaimer)
        
            var amountClaimed = lumiStreamClaimer.borrow()!.claimAvailable(id: streamId) 
        }    
      }
    `,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    args: (arg: any, t: any) => [arg(streamId, t.UInt64)],
    limit: 200,
  });

  const transaction = await fcl.tx(transactionId).onceSealed();
  console.log(transaction);
};

export const getIncomingStreams = async (userAddress: string) => {
  try {
    const streamIn = await fcl.query({
      cadence: `
      import Lumi from 0xLumi
      
      pub fun main(account: Address): [Lumi.Stream] {
        var res: [Lumi.Stream] = []
    
        for key in Lumi.toDestinationSources[account]!.keys {
            var sender = Lumi.toDestinationSources[account]![key]!
            let lumiStreamGetter = getAccount(sender).getCapability<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/mainGetter)
    
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

export const getOutcomingStreams = async (userAddress: string) => {
  try {
    const streamOut = await fcl.query({
      cadence: `
      import Lumi from 0xLumi

      pub fun main(account: Address): [Lumi.Stream] {
        var res: [Lumi.Stream] = []
    
        let lumiStreamGetter = getAccount(account).getCapability<&Lumi.SourceCollection{Lumi.StreamInfoGetter}>(/public/mainGetter)
    
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
