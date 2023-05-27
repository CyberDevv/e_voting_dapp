require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: '0.8.18',
   networks: {
      development: {
         url: 'http://localhost:8545',
      },
   },
};