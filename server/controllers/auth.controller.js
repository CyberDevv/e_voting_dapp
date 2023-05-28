import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';
import User from '../models/user.model';
import logger from '../utils/winston';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const register = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   // check if email already exists
   const user = await User.findOne({ email });
   if (user) throw new BadRequestError('User already exists');

   // create new user
   const newUser = await User.create({
      name,
      email,
      hashPassword: bcrypt.hashSync(password, 14),
   });

   logger.info(`User ${newUser.email} created`);

   res.status(StatusCodes.CREATED).json({
      message: 'User created successfully',
   });
});

export const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   // get user
   const user = await User.findOne({ email });
   if (!user)
      throw new UnauthenticatedError('Authentication failed. User not found.');

   // compare password
   const isPasswordMatch = await user.comparePassword(
      password,
      user.hashPassword
   );

   if (!isPasswordMatch)
      throw new UnauthenticatedError('Authentication failed. Wrong password.');

   logger.info(`User ${user.email} logged in`);

   res.status(StatusCodes.OK).json({
      token: jwt.sign(
         {
            email: user.email,
            name: user.name,
            _id: user.id,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: '30d',
         }
      ),
   });
});

export const linkAddress = asyncHandler(async (req, res) => {
   const { address } = req.body;

   // get user
   const user = await User.findOne({ email: req.user.email });
   if (!user) throw new UnauthenticatedError('Authentication failed.');

   function isValidWalletAddress(address) {
      if (!address) {
         // Empty address
         return false;
      }

      // Remove the 0x prefix if present
      if (address.substring(0, 2) === '0x') {
         address = address.substring(2);
      }

      // Check if the address is 40 characters long
      if (address.length !== 40) {
         return false;
      }

      // Check if the address contains only hexadecimal characters
      var hexRegex = /^[0-9a-fA-F]+$/;
      if (!hexRegex.test(address)) {
         return false;
      }

      return true;
   }

   if (!isValidWalletAddress(address)) {
      throw new BadRequestError('Invalid address');
   }

   // update user
   user.accountAddress = address;
   await user.save();

   logger.info(`User ${user.email} linked address ${address}`);

   res.status(StatusCodes.OK).json({
      message: 'Address linked successfully',
   });
});
