require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: '0.8.18',
   network: {
      hardhat: {
         chainId: 31337,
      },
      Sepolia: {
         url: process.env.GOERLI_URL || '',
         accounts: [process.env.GOERLI_PRIVATE_KEY || ''],
         chainId: 5,
         blockConfirmations: 6,
      },
   },
   etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || '',
      customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
   },
   namedAccounts: {
      deployer: {
         default: 0,
         1: 0,
      },
   },
   gasReporter: {
      enabled: true,
      currency: 'USD',
      outputFile: 'gas-report.txt',
      noColors: true,
      // coinmarketcap: COINMARKETCAP_API_KEY,
   },
};
