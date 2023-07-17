const { Network, Alchemy } = require("alchemy-sdk");

const ALCHEMY_API_KEY = 'S-Q_cXKBC4u0Q_Xe32QjPq_938H71H3X';
//backup alchemy api key: alcht_mtGRPLFtKj7sDTomQZpnUdoAHuY53u

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA , // Replace with your network.
};

const alchemy = new Alchemy(settings);

//define a function called get highest token id
async function getHighestID() {
  const response = await alchemy.nft.getNftsForContract("0x9ba5e28274dae2cc9c2285af96571a1de2a67b11");
  const nfts = response[Object.keys(response)[0]];
  const highestTokenId = Math.max(...nfts.map(nft => parseInt(nft.tokenId, 10)));
  
  return highestTokenId;
}


export default getHighestID;


    // Print all NFTs returned in the response:
// alchemy.nft.getNftsForOwner('vitalik.eth').then(console.log);

// alchemy.nft.getNftMetadata(
// "0x9bA5e28274Dae2CC9C2285Af96571A1DE2A67b11",
// "0"
// ).then(console.log);


  // alchemy.core
  // .getTransactionReceipt('0x3d75a7337b1ea9808e5760bac0aa05b9b5fb0903c263775fab5a336caa5ed5f8')
  // .then(console.log);