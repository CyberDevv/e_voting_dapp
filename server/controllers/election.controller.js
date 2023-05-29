import { ethers } from 'hardhat';
import Contract from '../models/contract';
import asyncHandler from 'express-async-handler';
import logger from '../utils/winston';
import { StatusCodes } from 'http-status-codes';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

const getContract = async (name) => {
   //  get contract address and abi from MongoDB
   const contractModel = await Contract.findOne({ name: name });
   const contractAddress = contractModel.address;
   const contractAbi = contractModel.abi;

   // Call the smart contract to record the vote
   return new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner()
   );
};

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

   const votingContract = await getContract('Voting');

   await votingContract.createElection(title, startTime, endTime, candidates);

   logger.info(`Election "${title}" created`);

   res.status(StatusCodes.CREATED).json({
      message: 'Election created successfully',
   });
});

// get all elections
export const GetElections = asyncHandler(async (req, res) => {
   const votingContract = await getContract('Voting');

   const [titles, startTimes, endTimes, numCandidatesArray] =
      await votingContract.getAllElections();

   const elections = [];
   for (let i = 0; i < titles.length; i++) {
      const election = {
         title: titles[i],
         startTime: parseInt(startTimes[i].toString(), 10),
         endTime: parseInt(endTimes[i].toString(), 10),
         numCandidates: parseInt(numCandidatesArray[i].toString(), 10),
      };
      elections.push(election);
   }

   res.status(StatusCodes.OK).json({
      data: elections,
   });
});
