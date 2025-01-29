"use client";
import React, { useMemo, useState } from 'react';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DeleteFaculty } from "./FacultyButtons";
import SwitchToggle from "../../inputs/SwitchToggle";
import { UpdateSingleFaculty } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';

export default function FacultyTable({ faculty, token, basePath }: { faculty: any[], token: string, basePath: string }) {
   const [faculties, setFaculties] = useState(faculty);

   

   // Memoize table rows to prevent unnecessary re-renders
   const renderedRows = useMemo(() => {
      const handleCheckboxChange = async (facultyId: string, status: number) => {
      const { error, success } = await UpdateSingleFaculty(facultyId, token, { status });
      if (error) {
         console.log('error', error);
         notify({ message: "Status could not be updated", variant: "error", timeout: 5000 });
      }
      if (success.data) {
         setFaculties(prevFaculties =>
            prevFaculties.map(faculty =>
               faculty.id === facultyId ? { ...faculty, status } : faculty
            )
         );
         notify({ message: "Status updated successfully", variant: "success", timeout: 5000 });
      }
      };
      
      return faculties.map((item) => (
         <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
               {item.id}
            </TableCell>
            <TableCell>{item.faculty_name}</TableCell>
            <TableCell>
               <SwitchToggle
                  classList="mx-auto"
                  data-id={item.id}
                  checked={item.status === 1}
                  onChange={(status) => handleCheckboxChange(item.id, status)}
                  label=""
                  name="status"
               />
            </TableCell>
            <TableCell className="text-cyan-600">
               <Dropdown label={`Expand`} inline size="lg" className="z-50">
                  <Link href={`${basePath}/${item.id}/edit`}>
                     <DropdownItem>
                        <PencilIcon className="w-5" />
                        <span className="inline-block">Edit</span>
                     </DropdownItem>
                  </Link>
                  <DeleteFaculty token={token} id={item.id} />
               </Dropdown>
            </TableCell>
         </TableRow>
      ));
   }, [faculties, token, basePath]);

   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Faculty Name</TableHeadCell>
               <TableHeadCell>Active State</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {/* {faculties && faculties.map((item) => (
                  <TableRow key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.id}
                     </TableCell>
                     <TableCell>{item.faculty_name}</TableCell>
                     <TableCell>
                        <SwitchToggle
                           classList="mx-auto"
                           data-id={item.id}
                           checked={item.status === 1}
                           onChange={(status) => handleCheckboxChange(item.id, status)}
                           label=""
                           name="status"
                        />
                     </TableCell>
                     <TableCell className="text-cyan-600">
                        <Dropdown label={`Expand`} inline size="lg" className="z-50">
                           <Link href={`${basePath}/${item.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteFaculty token={token} id={item.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))} */}
               {renderedRows}
            </TableBody>
         </Table>
      </div>
   );
}
