import express from 'express';
import {
   CreateElection,
   GetElections,
} from '../controllers/election.controller';

const router = express.Router();

router.route('/').get(GetElections).post(CreateElection);

export default router;
