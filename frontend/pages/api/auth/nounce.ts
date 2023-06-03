import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

type Data = {
   data?: any;
   error?: any;
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { walletAddress, userId } = req.body;
   const nounce = uuidv4();

   await dbConnect();

   try {
      const user = await User.findOne({ walletAddress });

      if (user) {
         // generate new nonce

         return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: 'User already exists' });
      }

      await User.findOneAndUpdate(
         { _id: userId },
         { $set: { nonce: nounce } },
         { new: true }
      );

      res.status(StatusCodes.OK).json({ data: user });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
