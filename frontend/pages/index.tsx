import Layout from '@/components/layout';
import { Button, Divider, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {

   return (
      <Layout title='Home'>
         <section className='h-full pt-10'>
            <h4 className='text-3xl font-bold tracking-wide text-gray-200'>
               Hello, Jane
            </h4>
            <p className='mt-4 text-base text-gray-400'>
               Welcome to the voting portal, make sure you vote the right
               candidate.
            </p>

            <div>
               {/* Activity */}
               {/* Live Results */}
               {/* monitor */}
            </div>
         </section>
      </Layout>
   );
}