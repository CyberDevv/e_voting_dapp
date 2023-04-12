import Layout from '@/components/layout';
import { Button, Dialog } from '@mui/material';
import React from 'react';
import { Input } from '../profile';

const Create = () => {
   const [open, setOpen] = React.useState(false);
   const [title, setTitle] = React.useState('');
   const [startDate, setStartDate] = React.useState('');
   const [endDate, setEndDate] = React.useState('');
   const [candidateName, setCandidateName] = React.useState('');
   const [candidateDept, setCandidateDept] = React.useState('');
   const [quote, setQuote] = React.useState('');
   const [campaign, setCampaign] = React.useState('');

   const [candidates, setCandidates] = React.useState<any[]>([]);

   const handleClose = () => {
      setOpen(false);
   };

   const handleAddCandidate = () => {
      setCandidates([
         ...candidates,
         {
            name: candidateName,
            dept: candidateDept,
            quote,
            campaign,
         },
      ]);

      setCandidateName('');
      setCandidateDept('');
      setQuote('');
      setCampaign('');

      setOpen(false);
   };

   return (
      <Layout title='Create Election'>
         <section className='pt-10'>
            <h4 className='text-3xl font-bold tracking-wide text-gray-200'>
               Create New Election
            </h4>
            <p className='mt-4 text-base text-gray-400'>
               Create a new election
            </p>

            <form className='px-10 py-20 mt-10 space-y-10 bg-gray-800 rounded-md'>
               <Input
                  label='Title'
                  placeholder='Election Title'
                  type='text'
                  value={title}
                  setValue={setTitle}
               />

               <div className='grid grid-cols-2 gap-x-20'>
                  <Input
                     label='Start Date'
                     type='datetime-local'
                     value={startDate}
                     setValue={setStartDate}
                  />
                  <Input
                     label='End Date'
                     type='datetime-local'
                     value={endDate}
                     setValue={setEndDate}
                  />
               </div>

               <div>
                  <div className='mt-2 space-x-4 between'>
                     <h5 className='font-bold'>Candidates</h5>

                     <Button
                        onClick={() => setOpen(true)}
                        className='px-4 py-2 text-sm font-semibold text-gray-200 normal-case rounded-md bg-primary'
                     >
                        Add Candidate
                     </Button>
                  </div>

                  <div className='mt-4'>
                     {candidates.length === 0 ? (
                        <p className='mt-4 text-center text-gray-200'>
                           No candidates added
                        </p>
                     ) : (
                        <div className='grid w-full grid-cols-3 gap-10 mt-4'>
                           {candidates
                              .map((candidate, index) => (
                                 <div
                                    key={index}
                                    className='p-8 bg-gray-700 rounded-lg col-center'
                                 >
                                    <div className='w-24 h-24 bg-gray-600 rounded-full min-w-fit' />
                                    <div>
                                       <h5 className='mt-2 text-lg font-bold text-center text-gray-200'>
                                          {candidate.name}
                                       </h5>
                                       <p className='mt-1 text-center text-gray-200'>
                                          {candidate.dept}
                                       </p>
                                    </div>
                                    <Button
                                       onClick={() => setOpen(true)}
                                       className='px-4 py-2 mt-4 text-sm font-semibold text-gray-200 normal-case rounded-md bg-primary'
                                    >
                                       Edit Details
                                    </Button>
                                 </div>
                              ))
                              .reverse()}
                        </div>
                     )}
                  </div>
               </div>

               <div className='w-full !mt-20 center'>
                  <Button
                     onClick={() => setOpen(true)}
                     className='px-8 py-2 font-semibold text-gray-100 normal-case rounded-md bg-primary'
                  >
                     Save
                  </Button>
               </div>
            </form>

            <Dialog onClose={handleClose} open={open}>
               <div className='min-w-[320px] w-full max-w-lg px-5 py-10 space-y-6 bg-gray-900 rounded-md col-center'>
                  <div className='w-full'>
                     <Button
                        onClick={handleClose}
                        className='px-4 py-1 text-sm font-semibold text-gray-200 normal-case rounded-md'
                     >
                        Back
                     </Button>
                  </div>
                  <div className='w-20 h-20 bg-gray-700 rounded-full min-w-fit' />
                  <Input
                     label='Candidate Name'
                     placeholder='John Doe'
                     type='text'
                     value={candidateName}
                     setValue={setCandidateName}
                  />
                  <Input
                     label='Department'
                     type='text'
                     placeholder='Computer Science'
                     value={candidateDept}
                     setValue={setCandidateDept}
                  />
                  <Input
                     label='Quote'
                     type='text'
                     placeholder='Vote for me!'
                     value={quote}
                     setValue={setQuote}
                  />
                  <Input
                     label='Campaign Promise'
                     type='text'
                     placeholder='I will ...'
                     textarea
                     value={campaign}
                     setValue={setCampaign}
                  />
                  <Button
                     onClick={handleAddCandidate}
                     className='px-6 py-2 text-sm font-semibold text-gray-200 normal-case rounded-md bg-primary'
                  >
                     Add
                  </Button>
               </div>
            </Dialog>
         </section>
      </Layout>
   );
};

export default Create;
