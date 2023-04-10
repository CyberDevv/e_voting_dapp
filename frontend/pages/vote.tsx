import Layout from '@/components/layout';
import { Button, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
   const colors = ['bg-primary', 'bg-secondary', 'bg-tetiary'];
   const randomColor = colors[Math.floor(Math.random() * colors.length)];

   function getRandomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
   }

   return (
      <Layout title='Home'>
         <section className='h-full pt-10'>
            <h4 className='text-3xl font-bold tracking-wide text-gray-200'>
               Your vote is secure, your vote counts
            </h4>
            <p className='mt-4 text-base text-gray-400'>
               You can only vote once, so make sure you vote for the right
            </p>

            <div className='mt-8 space-y-8'>
               {candidatePosition.slice(0, 8).map((item, index) => {
                  return (
                     <div
                        key={index}
                        className='w-full p-4 bg-gray-800 rounded-md'
                     >
                        <h6 className='space-x-2 font-bold tracking-wide start'>
                           <span
                              className={`block w-4 h-4 rounded-full ${getRandomColor()}`}
                           />
                           <span>{item.position}</span>
                        </h6>

                        <div className='my-6 space-x-8 overflow-x-scroll start max-w-[calc(100vw-384px)] hide-scrollbar'>
                           {item.candidates.map((voter, i) => (
                              <CandidateComp
                                 key={i}
                                 name={voter.name}
                                 mail={voter.email}
                              />
                           ))}
                        </div>
                     </div>
                  );
               })}
            </div>
         </section>
      </Layout>
   );
}

type CandidateCompProps = {
   name: string;
   mail: string;
};

const CandidateComp = ({ name, mail }: CandidateCompProps) => {
   return (
      <div className='flex-shrink-0 col-center min-w-fit'>
         <span className='w-20 h-20 bg-gray-700 rounded-full' />
         <h6 className='mt-2 text-lg font-bold tracking-wide text-gray-200'>
            {name}
         </h6>
         <p className='mt-1 text-sm text-gray-400'>{mail}</p>

         <div className='mt-4'>
            <Button className='px-4 py-2 text-sm font-semibold text-gray-200 normal-case rounded-md bg-primary'>
               Vote
            </Button>

            <Button className='px-4 py-2 ml-4 text-sm font-semibold text-gray-200 normal-case bg-gray-700 rounded-md'>
               View
            </Button>
         </div>
      </div>
   );
};

const candidatePosition = [
   {
      position: 'President',
      candidates: [
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
      ],
   },
   {
      position: 'Secretary',
      candidates: [
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
         {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
         },
      ],
   },
];
