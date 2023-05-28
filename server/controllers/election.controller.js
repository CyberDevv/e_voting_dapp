import { ethers } from 'hardhat';
import Contract from '../models/contract';
import asyncHandler from 'express-async-handler';
import logger from '../utils/winston';
import { StatusCodes } from 'http-status-codes';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

export const CreateElection = asyncHandler(async (req, res) => {
   const { title, startTime, candidates = [], endTime } = req.body;
   const { _id } = req.user;

   // create new election
   //  const newElection = await Election.create({
   //     name,
   //     description,
   //     candidates,
   //     start,
   //     end,
   //     createdBy: _id,
   //  });

   //  get contract address and abi from MongoDB
   const contractModel = await Contract.findOne({ name: 'Voting' });
   const contractAddress = contractModel.address;
   const contractAbi = contractModel.abi;

   // Call the smart contract to record the vote
   const votingContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner()
   );

   await votingContract.createElection(title, startTime, endTime, candidates);

   logger.info(`Election "${title}" created`);

   res.status(StatusCodes.CREATED).json({
      message: 'Election created successfully',
   });
});
