import Auth from '@/components/layout/Auth';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import axios from 'axios';
import Router from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const Register = () => {
   const [name, setName] = React.useState<string>('');
   const [email, setEmail] = React.useState<string>('');
   const [password, setPassword] = React.useState<string>('');
   const [confirmPassword, setConfirmPassword] = React.useState<string>('');
   const [isLoading, setIsLoading] = React.useState<boolean>(false);

   const handleSubmit = (event: React.FormEvent) => {
      event?.preventDefault();

      setIsLoading(true);

      // validate inputs
      if (!name || !email || !password || !confirmPassword) {
         return toast.error('Fill all empty inputs');
      }

      // check if password matches
      if (password !== confirmPassword) {
         return toast.error('Password do not match!');
      }

      axios
         .post('/api/auth/register', { name, email, password })
         .then((res) => {
            toast.success(res?.data?.msg);

            Router.push('/auth/login');

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
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
         type='Register'
         title='Sign Up'
         desc='Create an account to vote your favorite candidate'
         heading='Welcome'
         handleSubmit={handleSubmit}
      >
         <Input placeholder='Name' value={name} setValue={setName} />
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
         <Input
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            setValue={setConfirmPassword}
         />
         <LoadingButton
            loading={isLoading}
            className='w-full text-sm normal-case md:text-base lg:text-lg bg-primary'
            variant='contained'
            type='submit'
         >
            Sign up
         </LoadingButton>
      </Auth>
   );
};

type InputProps = {
   value: string;
   setValue: React.Dispatch<React.SetStateAction<string>>;
   type?: string;
   placeholder: string;
};

export const Input = ({ value, setValue, type, placeholder }: InputProps) => (
   <TextField
      variant='standard'
      type={type || 'text'}
      fullWidth
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      sx={{
         '& .MuiInputBase-input': {
            color: 'rgb(243 244 246)',
            fontSize: {
               xs: '14px',
               sm: '16px',
               md: '18px',
               lg: '20px',
            },
         },
         '& .MuiInput-root:after': {
            borderBottomColor: 'rgb(243 244 246)',
         },
      }}
   />
);

export default Register;
