import Contract from '@/models/Contract';
import dbConnect from '@/utils/dbConnect';
import { StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
   try {
      const name = req.query.name;

      await dbConnect();

      //  get contract address and abi from MongoDB
      const contractModel = await Contract.findOne({ name: name });
      const contractAddress = contractModel.address;
      const contractAbi = contractModel.abi;

      res.status(StatusCodes.OK).json({
         contractAddress: contractAddress,
         contractAbi: contractAbi,
      });
   } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
   }
}
