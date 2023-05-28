import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
   name: string;
};

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { name, email, password } = req.body;

   axios
      .post('http://localhost:8000/api/auth/register', {
         name,
         email,
         password,
      })
      .then(
         (response) => {
            console.log(response);
            res.status(200).json({ name: 'John Doe' });
         },
         (error) => {
            console.log(error);
            res.status(error.response.status).json(error.response.data);
         }
      );
}
