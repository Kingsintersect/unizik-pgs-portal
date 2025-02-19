import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/server.utils';
import { PlusIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import SelectMenu from '@/components/SelectMenu';
import CustomCard from '@/components/CustomCard';
import Link from 'next/link';
import { DataTable } from '@/components/ui/datatable/DataTable';
import { subjects_columns } from './subjects_table.columns';
import { GetListOfClassSubjects } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';

export const dynamic = "force-dynamic";
const page = async () => {
   const basePath = `${baseUrl}/dashboard/admin/highschool/subjects`;

   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfClassSubjects()));
   if (error) notify({ message: "Their was an error trying to get Subject list", variant: "error", timeout: 5000 });
   const ascendingData = [...success].sort((a, b) => a.id - b.id);
   const descendingData = [...success].sort((a, b) => b.id - a.id);

   return (
      <>
         <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
            <div className="search">
               <Search name={'search'} placeholder='Search for a department' />
            </div>
            <div className="search flex justify-end">
               <SelectMenu
                  placeholder='Theme'
                  menu={[
                     { title: 'namae', value: "namae" },
                  ]}
               />
            </div>
         </div>
         <CustomCard
            className='mt-7'
            title="Class Subjects"
            description="List Of Class Subjects"
            titleClassName='text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7'
            contentClassName='font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7'
         >
            <div className="flex items-center justify-between">
               <div className="flex gap-2 items-center">
                  <span>Show</span>
                  <SelectMenu
                     placeholder='Numbers of entries'
                     menu={[
                        { title: '10', value: "10" },
                        { title: '20', value: "20" },
                        { title: '30', value: "30" },
                     ]}
                  />
                  <span>entries</span>
               </div>
               <div className="">
                  <Link href={`${basePath}/create`} >
                     <Button>
                        <PlusIcon className="h-5 md:ml-4" />
                        Create New Course Category
                     </Button>
                  </Link>
               </div>
            </div>
            <div className="">
               <DataTable columns={subjects_columns} data={descendingData} />
            </div>
         </CustomCard>
      </>
   )
}

export default page