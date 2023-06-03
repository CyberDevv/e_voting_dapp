import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
   msg?: string;
   error?: any;
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { name, email, password } = req.body;

   await dbConnect();

   try {
      // check if email already exists
      const user = await User.findOne({ email });

      if (user) {
         res.status(StatusCodes.BAD_REQUEST).json({
            error: 'User already exists',
         });
         return;
      }

      await User.create({
         name,
         email,
         hashPassword: bcrypt.hashSync(password, 14),
      });

      res.status(StatusCodes.CREATED).json({
         msg: 'User created successfully',
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
