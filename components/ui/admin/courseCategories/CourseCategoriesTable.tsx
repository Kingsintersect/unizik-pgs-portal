import { GetListOfCourseCategories, GetListOfCourses } from '@/app/actions/server.admin';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from "flowbite-react";
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import React from 'react'
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';
import { DeleteCourseCategories } from './CourseCategoriesButtons';

const CourseCategoriesTable = async ({ slug, token }: { slug: any, token: string }) => {
   const basePath = `${baseUrl}/dashboard/admin/course-management/course-categories`;
   let descendingData: any[];

   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCourseCategories(token)));

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
               <TableHeadCell>Short Code</TableHeadCell>
               <TableHeadCell>Faculty</TableHeadCell>
               <TableHeadCell>Department</TableHeadCell>
               <TableHeadCell>Level</TableHeadCell>
               <TableHeadCell>Semester</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {descendingData.map((courseCategory: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{courseCategory.short_code}</TableCell>
                     <TableCell>{courseCategory.faculty.faculty_name}</TableCell>
                     <TableCell>{courseCategory.department.department_name}</TableCell>
                     <TableCell className='font-bold'>{courseCategory.level}</TableCell>
                     <TableCell className='font-bold'>{courseCategory.semester}</TableCell>
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${courseCategory.id}/edit?faculty=${courseCategory.faculty.id}&department=${courseCategory.department.id}`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteCourseCategories token={token} id={courseCategory.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default CourseCategoriesTable