import Layout from '@/components/layout';
import { Button } from '@mui/material';
import React from 'react';

const Profile = () => {
   const [name, setName] = React.useState('');
   const [currentPassword, setcurrentPassword] = React.useState('');
   const [newPassword, setNewPassword] = React.useState('');

   return (
      <Layout title='Profile'>
         <section className='pt-10'>
            <h4 className='text-3xl font-bold tracking-wide text-gray-200'>
               Account
            </h4>
            <p className='mt-4 text-base text-gray-400'>
               Make changes to your account
            </p>

            <div className='mt-10 space-x-8 start'>
               <div className='w-20 h-20 bg-gray-800 rounded-full' />

               <div className='space-x-4 start'>
                  <Button className='px-8 py-1 text-sm font-semibold text-gray-200 normal-case rounded-md bg-primary'>
                     Upload
                  </Button>

                  <Button className='px-8 py-1 ml-4 text-sm font-semibold text-gray-200 normal-case bg-gray-700 rounded-md'>
                     Remove
                  </Button>
               </div>
            </div>

            <form className='max-w-2xl mt-20'>
               <Input
                  label='Name'
                  type='text'
                  placeholder='John Doe'
                  value={name}
                  setValue={setName}
               />

               <h6 className='mt-10 font-medium'>Reset Password</h6>
               <div className='mt-4 space-y-6'>
                  <Input
                     label='Current password'
                     type='password'
                     placeholder='********'
                     value={currentPassword}
                     setValue={setcurrentPassword}
                  />
                  <Input
                     label='New password'
                     type='password'
                     placeholder='********'
                     value={newPassword}
                     setValue={setNewPassword}
                  />
               </div>

               <Button className='px-8 py-2 mt-10 text-base font-bold text-gray-200 normal-case rounded-md bg-primary'>
                  Save Changes
               </Button>
            </form>
         </section>
      </Layout>
   );
};

export default Profile;

type InputProps = {
   label: string;
   type: string;
   placeholder?: string;
   textarea?: boolean;
   value: string;
   setValue: React.Dispatch<React.SetStateAction<any>>;
};

export const Input = ({
   label,
   type,
   placeholder,
   textarea,
   value,
   setValue,
}: InputProps) => {
   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
   };

   return (
      <div className='w-full'>
         <label className='block text-sm font-semibold text-gray-200'>
            {label}
         </label>
         {!textarea ? (
            <input
               type={type}
               placeholder={placeholder}
               className='block w-full p-4 mt-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-primary'
               value={value || ''}
               onChange={handleChange as any}
            />
         ) : (
            <textarea
               placeholder={placeholder}
               className='block w-full p-4 mt-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-primary'
               value={value || ''}
               onChange={handleChange as any}
            />
         )}
      </div>
   );
};
