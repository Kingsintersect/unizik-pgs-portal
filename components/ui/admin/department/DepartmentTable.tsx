"use client";
import { UpdateSingleDepartment } from "@/app/actions/server.admin";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { notify } from "@/contexts/ToastProvider";
import { DeleteDepartment } from "./DepartmentButtons";
import SwitchToggle from "../../inputs/SwitchToggle";
import { useState } from "react";

export default function DepartmentTable({ department, token, basePath }: { department: any[], token: string, basePath: string }) {
   const [departments, setDepartments] = useState(department);

   const handleCheckboxChange = async (departmentId: string, status: number) => {
      const { error, success } = await UpdateSingleDepartment(departmentId, token, { status });
      if (error) {
         console.log('error', error);
         notify({ message: "Status could not be updated", variant: "error", timeout: 5000 });
      }
      if (success.data) {
         setDepartments((prevDepartments) =>
            prevDepartments.map(department =>
               department.id === departmentId ? { ...department, status } : department
            )
         );
         notify({ message: "Status updated successfully", variant: "success", timeout: 5000 });
      }
   };


   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead>
               <TableHeadCell>Id</TableHeadCell>
               <TableHeadCell>Title</TableHeadCell>
               <TableHeadCell>Active State</TableHeadCell>
               <TableHeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Edit</span>
               </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
               {departments && departments.map((item: any, i: any) => (
                  <TableRow key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++i}
                     </TableCell>
                     <TableCell>{item.department_name}</TableCell>
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
                     <TableCell className='text-cyan-600'>
                        <Dropdown label={`Expand`} inline size={`lg`} className="">
                           <Link href={`${basePath}/${item.id}/edit`}>
                              <DropdownItem>
                                 <PencilIcon className="w-5" />
                                 <span className="inline-block">Edit</span>
                              </DropdownItem>
                           </Link>
                           <DeleteDepartment token={token} id={item.id} />
                        </Dropdown>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
}
