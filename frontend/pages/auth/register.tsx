import Auth from '@/components/layout/Auth';
import { Button, TextField } from '@mui/material';
import React from 'react';

const Register = () => {
   const [name, setName] = React.useState<string>('');
   const [email, setEmail] = React.useState<string>('');
   const [password, setPassword] = React.useState<string>('');
   const [confirmPassword, setConfirmPassword] = React.useState<string>('');

   return (
      <Auth
         type='Register'
         title='Sign Up'
         desc='Create an account to vote your favorite candidate'
         heading='Welcome'
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

         <Button
            className='w-full text-sm normal-case md:text-base lg:text-lg bg-primary'
            variant='contained'
         >
            Sign up
         </Button>
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
