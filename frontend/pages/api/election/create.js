import dbConnect from '@/utils/dbConnect';
import { StatusCodes } from 'http-status-codes';
import Election from '../../../models/Election';

export default async function handler(req, res) {
   if (req.method === 'POST') {
      try {
         const { electionId, title, startTime, candidates, endTime } = req.body;

         await dbConnect();

         // create new election
         await new Election({
            electionId,
            title,
            startTime,
            endTime,
            electionCandidates: {
               items: candidates,
            },
         }).save();

         res.status(StatusCodes.OK).json({
            success: true,
            msg: 'Election created successfully',
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
   }
}
