import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
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
   const nonce = uuidv4();

   await dbConnect();

   try {
      const user = await User.findOne({ walletAddress });

      if (user) {
         const updatedUser = await User.findOneAndUpdate(
            { walletAddress: walletAddress },
            { $set: { nonce: nonce } },
            { new: true }
         );

         return res.status(StatusCodes.OK).json({
            data: {
               userId: updatedUser._id,
               nonce: updatedUser.nonce,
               walletAddress: updatedUser.walletAddress,
            },
         });
      }

      const updatedUser = await User.findOneAndUpdate(
         { _id: userId },
         { $set: { nonce: nonce, walletAddress: walletAddress } },
         { new: true }
      );

      res.status(StatusCodes.OK).json({
         data: {
            userId: updatedUser._id,
            nonce: updatedUser.nonce,
            walletAddress: updatedUser.walletAddress,
         },
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
