// @ts-expect-error: no typings
import { config } from "@onflow/fcl";

config({
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xProfile": "0xba1132bc08f82fe2",
  "0xTestToken": "0x90ca26a9bb9bda76",
  "0xLumi": "0xf72c6cd48b64d09b",
  "0xFungibleToken": "0x9a0766d93b6608b7",
  "0xFlowToken": "0x7e60df042a9c0868",
  "0xUsdcToken": "0xa983fecbed621163",
  "0xPoolWrapper": "0x5b377a52afaab876",
});
