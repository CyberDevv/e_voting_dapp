import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import { ethers } from 'ethers';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
   try {
      const { walletAddress, signature, nonce } = req.body;

      const signerAddress = ethers.utils.verifyMessage(nonce, signature);

      if (signerAddress !== walletAddress) {
         res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Authentication failed. wrong signature',
         });
         return;
      }

      await dbConnect();

      const user = await User.findOne({ walletAddress, nonce });

      if (!user) {
         res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Authentication failed. User not found.',
         });
         return;
      }

      const token = jwt.sign(
         {
            id: user.id,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: '30d',
         }
      );

      res.status(StatusCodes.OK).json({
         userId: user.id,
         token: token,
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
};

export default handler;
