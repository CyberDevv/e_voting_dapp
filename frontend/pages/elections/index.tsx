import Layout from '@/components/layout';
import Election from '@/models/Election';
import dbConnect from '@/utils/dbConnect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Repo = {
   name: string;
   stargazers_count: number;
};

// getServerSideProps
export const getServerSideProps = async () => {
   await dbConnect();

   const res = await Election.find({});

   const elections = JSON.parse(JSON.stringify(res));

   return {
      props: {
         elections: elections || [],
      },
   };
};

const ElectionOverview = ({ elections }: any) => {
   const router = useRouter();

   const rows = elections.map((election: any) => ({
      id: election?._id,
      name: election?.title,
      startDate: election?.startTime,
      endDate: election?.endTime,
      status: { endDate: election?.endTime, startDate: election?.startTime },
      candidates: election?.electionCandidates.items.length,
      actions: '',
   }));

   // datagrid columns
   const columns: GridColDef[] = [
      {
         field: 'name',
         headerName: 'Election Tile',
         minWidth: 120,
         flex: 1,
         headerClassName: '',
      },
      {
         field: 'startDate',
         headerName: 'Start Time',
         minWidth: 180,
         renderCell: (params) => {
            return <span>{moment(params.value).format('LLL')}</span>;
         },
      },
      {
         field: 'endDate',
         headerName: 'End Time',
         minWidth: 180,
         renderCell: (params) => {
            return <span>{moment(params.value).format('LLL')}</span>;
         },
      },
      {
         field: 'status',
         headerName: 'Status',
         minWidth: 150,
         renderCell: (params) => {
            return (
               <span>
                  {moment().isBetween(
                     moment(params.value.endDate),
                     moment(params.value.startDate)
                  )
                     ? 'Open'
                     : moment().isAfter(moment(params.value.endDate))
                     ? 'Closed'
                     : 'Not Started'}
               </span>
            );
         },
      },
      {
         field: 'candidates',
         headerName: 'Candidates',
         minWidth: 120,
         renderCell: (params) => (
            <span>{params?.value?.toLocaleString('en-US')}</span>
         ),
      },
      {
         field: 'actions',
         headerName: '',
         minWidth: 150,
         type: 'actions',
         getActions: (params) => [
            // <GridActionsCellItem
            //    key={params.id}
            //    icon={<BorderColorIcon />}
            //    label='view'
            //    onClick={() =>
            //       router.push(`/elections/create?id=${params.id}&edit=true`)
            //    }
            // />,
            <GridActionsCellItem
               key={params.id}
               icon={<RemoveRedEyeIcon />}
               label='view'
               onClick={() => router.push(`/elections/${params.id}`)}
            />,
            // <GridActionsCellItem
            //    key={params.id}
            //    icon={<DeleteIcon />}
            //    label='view'
            //    onClick={() => console.log(params.id)}
            // />,
         ],
      },
   ];

   return (
      <Layout title='Election Overview'>
         <section className='pt-10'>
            <div className='between'>
               <h4 className='text-lg font-bold tracking-wide'>
                  List of Elections
               </h4>

               <Link href='/elections/create'>
                  <Button className='px-4 py-2 text-sm font-semibold text-gray-100 normal-case rounded-md bg-primary'>
                     Create Election
                  </Button>
               </Link>
            </div>

            <DataGrid
               rows={rows}
               columns={columns}
               autoHeight
               density='comfortable'
               disableColumnMenu
               disableColumnFilter
               disableColumnSelector
               disableRowSelectionOnClick
               hideFooter
               rowSelection={false}
               className='mt-4'
               editMode='row'
               sx={{
                  '& .MuiDataGrid-columnHeaders': {
                     backgroundColor: 'rgb(31 41 55 )',
                     fontWeight: '700',
                     fontSize: '1rem',
                  },
                  '& .MuiDataGrid-row': {},
               }}
            />
         </section>
      </Layout>
   );
};

export default ElectionOverview;
