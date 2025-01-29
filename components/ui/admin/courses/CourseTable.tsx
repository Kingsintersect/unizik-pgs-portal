import { GetListOfCourses } from '@/app/actions/server.admin';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from "flowbite-react";
import { baseUrl } from '@/config';
import React from 'react'
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import { DeleteCourse } from './CourseButtons';

const CourseTable = async ({ slug, token }: { slug: any, token: string }) => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/courses`;
   let descendingData: any[]

   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCourses(token)));
   if (success) {
      const ascendingData = [...success.data].sort((a, b) => a.id - b.id);
      descendingData = [...success.data].sort((a, b) => b.id - a.id);
   } else {
      descendingData = [];
   }

   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Course Title</TableHeadCell>
               <TableHeadCell>Course Code</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData && descendingData.map((course: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{course.course_title}</TableCell>
                     <TableCell className='font-bold'>{course.course_code}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${course.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteCourse token={token} id={course.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default CourseTable