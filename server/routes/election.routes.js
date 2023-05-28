import express from 'express';
import { CreateElection } from '../controllers/election.controller';

const router = express.Router();

router.post('/crete-election', CreateElection);

export default router;
