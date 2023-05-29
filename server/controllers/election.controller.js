import { ethers } from 'hardhat';
import Contract from '../models/contract';
import Election from '../models/election.model';
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
   const { title, startTime, candidates, endTime } = req.body;
   const { _id } = req.user;

   // create new election
   await Election.create({
      title,
      startTime,
      endTime,
      electionCandidates: {
         items: candidates,
      },
   });

   // get election id
   const election = await Election.findOne({ title: title }).select('_id');
   const electionId = election._id.toString();

   // extract candidate names
   const candidateNames = [];
   for (let i = 0; i < candidates.length; i++) {
      candidateNames.push(candidates[i].candidateName);
   }

   const votingContract = await getContract('Voting');

   try {
      await votingContract.createElection(
         title,
         startTime,
         endTime,
         candidateNames,
         electionId
      );
   } catch (err) {
      Election.deleteOne({ title: title });
   }

   logger.info(`Election "${title}" created`);

   res.status(StatusCodes.CREATED).json({
      message: 'Election created successfully',
   });
});

// get all elections
export const GetElections = asyncHandler(async (req, res) => {
   const votingContract = await getContract('Voting');

   const [titles, startTimes, endTimes, electionIds, numCandidatesArray] =
      await votingContract.getAllElections();

   console.log(
      'Development >>>>>>',
      titles,
      startTimes,
      endTimes,
      electionIds,
      numCandidatesArray
   );

   const elections = [];
   for (let i = 0; i < titles.length; i++) {
      const election = {
         title: titles[i],
         startTime: parseInt(startTimes[i].toString(), 10),
         endTime: parseInt(endTimes[i].toString(), 10),
         electionId: electionIds[i],
         numCandidates: parseInt(numCandidatesArray[i].toString(), 10),
      };
      elections.push(election);
   }

   res.status(StatusCodes.OK).json({
      data: elections,
   });
});

// get election by id
export const GetElectionById = asyncHandler(async (req, res) => {
   const { electionId } = req.params;

   const votingContract = await getContract('Voting');

   const [title, startTime, endTime, numCandidates, candidates] =
      await votingContract.getElection(electionId);

   const candidatesArray = [];

   for (let i = 0; i < candidates.length; i++) {
      const candidate = {
         candidateName: candidates[i].name,
         voteCount: parseInt(candidates[i].voteCount.toString(), 10),
      };
      candidatesArray.push(candidate);
   }

   const election = {
      title,
      startTime: parseInt(startTime.toString(), 10),
      endTime: parseInt(endTime.toString(), 10),
      numCandidates: parseInt(numCandidates.toString(), 10),
      candidatesArray,
   };

   res.status(StatusCodes.OK).json({
      data: election,
   });
});

// // cast vote
// export const CastVote = asyncHandler(async (req, res) => {
//    const { electionId, candidateId } = req.body;
//    const { _id } = req.user;

//    const votingContract = await getContract('Voting');

//    await votingContract.castVote(electionId, candidateId);

//    logger.info(`Vote cast for election "${electionId}"`);

//    res.status(StatusCodes.OK).json({
//       message: 'Vote cast successfully',
//    });
// });
