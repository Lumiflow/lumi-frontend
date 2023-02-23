// @ts-expect-error: no typings
import { config } from "@onflow/fcl";

config({
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xProfile": "0xba1132bc08f82fe2",
  "0xTestToken": "0xf817fd9a8593bf0a",
  "0xLumi": "0xf817fd9a8593bf0a",
  "0xFungibleToken": "0xf817fd9a8593bf0a",
});
