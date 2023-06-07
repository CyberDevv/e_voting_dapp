import Layout from '@/components/layout';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { web3Init } from '../../utils/Web3Init';
import { Input } from '../profile';

const Create = () => {
   const [open, setOpen] = React.useState(false);
   const [title, setTitle] = React.useState('Election 1');
   const [startDate, setStartDate] = React.useState('');
   const [endDate, setEndDate] = React.useState('');
   const [candidateName, setCandidateName] = React.useState('Candidate 1');
   const [candidateDept, setCandidateDept] = React.useState('Computer Science');
   const [quote, setQuote] = React.useState('Election is the best');
   const [campaign, setCampaign] = React.useState('I will do my best');
   const [contractAddress, setContractAddress] = React.useState('');
   const [abi, setAbi] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(false);

   const [candidates, setCandidates] = React.useState<any[]>([]);

   const handleClose = () => {
      setOpen(false);
   };

   const handleAddCandidate = () => {
      setCandidates([
         ...candidates,
         {
            candidateName,
            department: candidateDept,
            quote,
            campainPromise: campaign,
         },
      ]);

      setCandidateName('');
      setCandidateDept('');
      setQuote('');
      setCampaign('');

      setOpen(false);
   };

   const handleCreateElection = async () => {
      setIsLoading(true);

      if (!title || !startDate || !endDate || candidates.length === 0) {
         toast.error('Please fill in all the fields');
         setIsLoading(false);
         return;
      }

      try {
         const { userAddress, nonce, contract, web3 } = await web3Init(
            setContractAddress,
            setAbi,
            abi,
            contractAddress
         );

         // extract candidate names
         const candidateNames = [];
         for (let i = 0; i < candidates.length; i++) {
            candidateNames.push(candidates[i].candidateName);
         }

         // Convert the start and end dates to timestamps
         const startDatetamp = Math.floor(new Date(startDate).getTime() / 1000);
         const endDatetamp = Math.floor(new Date(endDate).getTime() / 1000);

         const electionId = uuidv4();

         // Create the transaction object
         const transaction = {
            from: userAddress,
            to: contractAddress,
            nonce: nonce,
            // gas: 200000,
            data: contract.methods
               ?.createElection(
                  title,
                  startDatetamp,
                  endDatetamp,
                  candidateNames,
                  electionId
               )
               .encodeABI(),
         };

         // Sign the transaction using Metamask
         await web3.eth
            .sendTransaction(transaction)
            .then(async (res) => {
               await axios
                  .post('/api/election/create', {
                     electionId,
                     title,
                     startTime: startDate,
                     endTime: endDate,
                     candidates,
                  })
                  .then((res) => {
                     setIsLoading(false);
                     toast.success('Election created successfully');

                     setTitle('');
                     setStartDate('');
                     setEndDate('');
                     setCandidates([]);
                  })
                  .catch((err) => {
                     console.log(err);
                     setIsLoading(false);
                     toast.error(err?.response?.data?.error?.message);
                  });
            })
            .catch((err) => {
               console.log(err);
               setIsLoading(false);
               toast.error('Something went wrong');
            });
      } catch (error: any) {
         if (error) {
            toast.error(error?.response?.data?.error);

            setIsLoading(false);
            console.log(error);
         }
      }
   };

   return (
      <Layout title='Create Election' requireMetaMask>
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
                                          {candidate.candidateName}
                                       </h5>
                                       <p className='mt-1 text-center text-gray-200'>
                                          {candidate.department}
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
                  <LoadingButton
                     loading={isLoading}
                     onClick={handleCreateElection}
                     className='px-8 py-2 font-semibold text-gray-100 normal-case rounded-md bg-primary'
                  >
                     Save
                  </LoadingButton>
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
