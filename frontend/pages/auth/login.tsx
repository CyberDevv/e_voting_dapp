import Auth from '@/components/layout/Auth';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { Input } from './register';

const Login = () => {
   const [email, setEmail] = React.useState('admin@test.com');
   const [password, setPassword] = React.useState('string');
   const [isLoading, setIsLoading] = React.useState<boolean>(false);

   const handleSubmit = (event: React.FormEvent) => {
      event?.preventDefault();

      setIsLoading(true);

      // validate inputs
      if (!email || !password) {
         return toast.error('Fill all empty inputs');
      }

      axios
         .post('/api/auth/login', { email, password })
         .then((res) => {
            Router.push('/');

            setEmail('');
            setPassword('');
            setIsLoading(false);
         })
         .catch((err) => {
            console.log('Error ==>', err?.response?.data);
            toast.error(err?.response?.data?.error);
            setIsLoading(false);
         });
   };

   return (
      <Auth
         type='Login'
         title='Sign In'
         desc='To vote your favorite candidate, please login'
         heading='Welcome Back'
         handleSubmit={handleSubmit}
      >
         <Input
            placeholder='Email'
            type='email'
            value={email}
            setValue={setEmail}
         />
         <Input
            placeholder='Password'
            type='password'
            value={password}
            setValue={setPassword}
         />

         <LoadingButton
            loading={isLoading}
            className='w-full text-sm normal-case md:text-base lg:text-lg bg-primary'
            variant='contained'
            type='submit'
         >
            Sign in
         </LoadingButton>
      </Auth>
   );
};

export default Login;
