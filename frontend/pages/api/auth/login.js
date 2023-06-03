import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import process from 'process';

const JWT_SECRET = process.env.JWT_SECRET;

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
         token: jwt.sign(
            {
               email: user.email,
               name: user.name,
               _id: user.id,
            },
            JWT_SECRET,
            {
               expiresIn: '30d',
            }
         ),
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
