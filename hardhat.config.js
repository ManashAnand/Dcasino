require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
const sepolia_url = process.env.SEPOLIA_URL;
const private_key = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url: sepolia_url,
      accounts: [private_key]
    }
  }
};
 