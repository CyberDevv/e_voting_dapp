require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: '0.8.18',
   networks: {
      development: {
         url: 'http://localhost:8545',
      },
      sepolia: {
         url: process.env.SEPOLIA_RPC_URL,
         accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      },
   },
};
