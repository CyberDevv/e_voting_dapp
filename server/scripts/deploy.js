const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../utils/dbConnect');
require('dotenv').config();
const Contract = require('../models/contract');

const connectMogoDb = async () => {
   try {
      await connectDB(process.env.MONGODB_URI);
      console.log(`Connected to MongoDB`);
   } catch (error) {
      // logger.error(error);
      console.error('Failed to connect to MongoDB:', error);
   }
};

async function uploadContractToMongo(name, abi, address) {
   try {
      // check if contract already exists in MongoDB
      await Contract.findOneAndDelete({ name });

      await Contract.create({
         name,
         abi,
         address,
      });

      console.log('Contract uploaded to MongoDB successfully');
   } catch (error) {
      console.error('Failed to upload contract to MongoDB:', error);
   }
}

async function main() {
   const Voting = await hre.ethers.getContractFactory('Voting');
   const voting = await Voting.deploy();

   await voting.deployed();

   const contractAddress = voting.address;
   const contractAbiPath = path.join(
      __dirname,
      '..',
      'artifacts',
      'contracts',
      'Voting.sol',
      'Voting.json'
   );

   try {
      const contractAbi = JSON.parse(fs.readFileSync(contractAbiPath, 'utf8'));
      await uploadContractToMongo('Voting', contractAbi.abi, contractAddress);
      console.log('Voting contract deployed to:', contractAddress);
   } catch (error) {
      console.error('Failed to deploy and upload contract:', error);
   }
}

connectMogoDb().then(() => {
   main()
      .then(() => process.exit(0))
      .catch((error) => {
         console.error(error);
         process.exit(1);
      });
});
