import { GetAllCourseAssignment } from '@/app/actions/server.admin';
import CourseAssignmentTable from '@/components/ui/admin/courseAssignment/CourseAssignmentTable';
import AppPagination from '@/components/ui/application/AppPagination';
import { InvoicesTableSkeleton } from '@/components/ui/application/suspence/Skeletons';
import Search from '@/components/ui/inputs/Search';
import { baseUrl } from '@/config';
import { verifySession } from '@/lib/dal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Select, Card, Button } from 'flowbite-react';
import Link from 'next/link';
import React, { Suspense } from 'react'

const page = async ({ params, searchParams, }: { params: { slug: string }, searchParams: { [key: string]: string } }) => {
   const session = await verifySession();
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-assignment`;
   const { slug } = params;
   let descendingData: any[];

   const { error, success }: any = await new Promise((resolve) => resolve(GetAllCourseAssignment(session.token)));

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
               <Search name={'search'} placeholder='Search for a department' />
            </div>
            <div className="search flex justify-end">
               <Select id="countries" required>
                  <option>Name</option>
               </Select>
            </div>
         </div>
         <Card className="mt-7">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7">
               List Of Course Categories
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
                           Assign Courses To A Category
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="">
                  <Suspense fallback={<InvoicesTableSkeleton />}>
                     <CourseAssignmentTable basePath={basePath} data={descendingData} slug={slug} />
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

export default page