import { GetListOfFaculties } from '@/app/actions/server.admin';
import FacultyTable from '@/components/ui/admin/faculty/FacultyTable';
import AppPagination from '@/components/ui/application/AppPagination';
import { InvoicesTableSkeleton } from '@/components/ui/application/suspence/Skeletons';
import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/dal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Card, Select } from 'flowbite-react';
import Link from 'next/link';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const Faculty = async () => {
   const session = await verifySession();
   const basePath = `${baseUrl}/dashboard/admin/course-management/faculty`;
   let descendingData: any[]

   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfFaculties()));
   if (success) {
      const ascendingData = [...success.data].sort((a, b) => a.id - b.id);
      descendingData = [...success.data].sort((a, b) => b.id - a.id);
   } else {
      descendingData = [];
   }

   return (
      <>
         <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
            <div className="search">
               <Search name={'search'} placeholder='Search for a faculty' />
            </div>
            <div className="search flex justify-end">
               <Select id="countries" required>
                  <option>Name</option>
               </Select>
            </div>
         </div>
         <Card className="mt-7">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7">
               List Of Faculty
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7">
               <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                     <span>Show</span>
                     <Select id="countries">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                     </Select>
                     <span>entries</span>
                  </div>
                  <div className="">
                     <Link href={`${basePath}/create`} >
                        <Button>
                           <PlusIcon className="h-5 md:ml-4" />
                           Create New Category
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="">
                  <Suspense fallback={<InvoicesTableSkeleton />}>
                     <FacultyTable basePath={basePath} faculty={descendingData} token={session.token} />
                  </Suspense>
               </div>
            </div>
            <div className="flex items-center justify-center">
               <AppPagination />
            </div>
         </Card>
      </>
   )
}

export default Faculty