import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
   const { email, password } = req.body;

   await dbConnect();

   try {
      // get user
      const user = await User.findOne({ email });

      if (!user) {
         res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Authentication failed. User not found.',
         });
         return;
      }
      // compare password
      const isPasswordMatch = await user.comparePassword(
         password,
         user.hashPassword
      );

      if (!isPasswordMatch) {
         res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Authentication failed. wrong email or password ',
         });
         return;
      }

      res.status(StatusCodes.CREATED).json({
         userId: user.id,
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
