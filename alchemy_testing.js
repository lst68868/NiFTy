const { Network, Alchemy } = require("alchemy-sdk");

const ALCHEMY_API_KEY = 'S-Q_cXKBC4u0Q_Xe32QjPq_938H71H3X';
//backup alchemy api key: alcht_mtGRPLFtKj7sDTomQZpnUdoAHuY53u

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA , // Replace with your network.
};

const alchemy = new Alchemy(settings);

// Print all NFTs returned in the response:
//alchemy.nft.getNftsForOwner("0xd42fb10F209e3DA159c30d04Dc9e6Fa0f9A50F80").then(console.log);

alchemy.nft
  .getNftsForContract("0x9bA5e28274Dae2CC9C2285Af96571A1DE2A67b11")
  .then(console.log);

// alchemy.nft.getNftMetadata(
// "0x9bA5e28274Dae2CC9C2285Af96571A1DE2A67b11",
// "0"
// ).then(console.log);