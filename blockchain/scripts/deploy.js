const { ethers, getNamedAccounts } = require('hardhat');

async function main() {
   const { deployer } = await getNamedAccounts();
   const vote = await ethers.getContractAt('Vote', deployer);
   console.log(`Got contract Vote at ${vote.address}`);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
