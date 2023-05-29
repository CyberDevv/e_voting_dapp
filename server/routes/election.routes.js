import express from 'express';
import {
   CreateElection,
   GetElections,
   GetElectionById
} from '../controllers/election.controller';

const router = express.Router();

router.route('/').get(GetElections).post(CreateElection);
router.route('/:electionId').get(GetElectionById);

export default router;
