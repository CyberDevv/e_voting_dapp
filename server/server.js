import express from 'express';
import { error404 } from './controllers/404.controller';
import {
   errorHandlerMiddleware,
   requestLogger,
   verifyJwt,
} from './middlewares';
import connectDB from './utils/dbConnect';
import logger from './utils/winston';
require('dotenv').config();
import authRoutes from './routes/auth.routes';
import electionRoutes from './routes/election.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwt setup
app.use(verifyJwt);

app.use(requestLogger);

// routes
app.use('/ping', (req, res) => res.json({ msg: 'pong' }));
app.use('/api/v1/', authRoutes);
app.use('/api/v1/elections', electionRoutes);
app.use(error404);

// error handler
app.use(errorHandlerMiddleware);

// server setup
const start = async () => {
   try {
      await connectDB(process.env.MONGODB_URI);
      app.listen(
         process.env.PORT,
         logger.info(`Server is running on port ${process.env.PORT}`)
      );
   } catch (error) {
      logger.error(error);
   }
};

start();

/* 
import Poll from './models/polls';
import { ethers } from 'hardhat';
import Contract from './models/contract';

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Create a new poll
app.post('/polls', async (req, res) => {
   const { question, choices } = req.body;

   // Store the poll in MongoDB
   //  const poll = await db.collection('polls').insertOne({
   //     question,
   //     choices,
   //     results: {},
   //  });

   const poll = await Poll.create({
      question,
      choices,
      results: {},
   });

   res.status(201).json(poll);
});

// Vote on a poll
app.post('/polls/:id/vote', async (req, res) => {
   const pollId = req.params.id;
   const { choice } = req.body;

   // Retrieve the poll from MongoDB
   //  const poll = await db.collection('polls').findOne({ _id: pollId });
   const poll = await Poll.findOne({ _id: pollId });

   if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
   }

   //  get contract address and abi from MongoDB
   const contractModel = await Contract.findOne({ name: 'Voting' });
   const contractAddress = contractModel.address;
   const contractAbi = contractModel.abi;

   // Call the smart contract to record the vote
   const contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      provider.getSigner()
   );
   //  console.log('🚀 ~ file: server.js:106 ~ app.post ~ contract:', contract);
   try {
      await contract.vote(ethers.utils.formatBytes32String('choice'));
   } catch (error) {
      console.log('error >>', error);
      return res.status(500).json({ error: 'Failed to record vote' });
   }

   res.status(200).json({ message: 'Vote recorded successfully' });
});

// Get poll results
app.get('/polls/:id/results', async (req, res) => {
   const pollId = req.params.id;

   // Retrieve the poll from MongoDB
   const poll = await Poll.findOne({ _id: pollId });
   if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
   }

   // Call the smart contract to get the votes
   const contract = new ethers.Contract(contractAddress, contractAbi, provider);
   const results = {};

   for (const choice of poll.choices) {
      const votes = await contract.getVotes(
         ethers.utils.formatBytes32String(choice)
      );
      results[choice] = votes.toNumber();
   }

   res.status(200).json({ results });
});

*/
