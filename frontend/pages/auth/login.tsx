import Auth from '@/components/layout/Auth';
import { Button } from '@mui/material';
import React from 'react';
import { Input } from './register';

const Login = () => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   return (
      <Auth
         type='Login'
         title='Sign In'
         desc='To vote your favorite candidate, please login'
         heading='Welcome Back'
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

         <Button
            className='w-full text-sm normal-case md:text-base lg:text-lg bg-primary'
            variant='contained'
         >
            Sign in
         </Button>
      </Auth>
   );
};

export default Login;
