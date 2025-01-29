"use client";
import { Table, Checkbox } from 'flowbite-react'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface IAppTableProps extends HTMLAttributes<HTMLDivElement> {
   data?: any[];
}

const AppTable: FC<IAppTableProps> = ({data}) => {
   const [urlBasePath, seturlBasePath] = useState("");

   useEffect(() => {
      if (typeof window !== 'undefined') {
         seturlBasePath(window.location.pathname);
      }
   }, [data])

   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <Table.Head className=' border-b-4'>
               <Table.HeadCell className="p-4">
                  <Checkbox />
               </Table.HeadCell>
               <Table.HeadCell>S/N</Table.HeadCell>
               <Table.HeadCell>Student Name</Table.HeadCell>
               <Table.HeadCell>Reference</Table.HeadCell>
               <Table.HeadCell>Has Applied</Table.HeadCell>
               <Table.HeadCell>Admission Status</Table.HeadCell>
               <Table.HeadCell className='text-cyan-600'>
                  Actions
                  <span className="sr-only">Details</span>
               </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
               {data!.length > 0 ? (
                  data!.map((student: any, i:any) => (
                     <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                        <Table.Cell className="p-4">
                           <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="p-4">
                           {++i}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                           {student.first_name && student.first_name + " "}
                           {student.last_name && student.last_name + " "}
                           {student.other_name && student.other_name}
                        </Table.Cell>
                        <Table.Cell>{student.reference && student.reference}</Table.Cell>
                        <Table.Cell>
                           {(student.is_applied === 1) ?
                              <span className='text-green-700 font-semibold'><CheckIcon fontSize={50} width={25} height={25} /></span> :
                              <span className='text-red-700 font-semibold'><XMarkIcon width={25} height={25} /></span>}
                        </Table.Cell>
                        <Table.Cell>
                           {(() => {
                              switch (student.admission_status) {
                                 case "admitted":
                                    return <span className="text-green-400 font-semibold">{student.admission_status}</span>;

                                 case "pending":
                                    return <span className="text-cyan-400 font-semibold">{student.admission_status}</span>;

                                 case "not admitted":
                                    return <span className="text-red-400 font-semibold">{student.admission_status}</span>;

                                 default:
                                    return <span className="text-gray-400 font-semibold">Unknown</span>;
                              }
                           })()}
                        </Table.Cell>
                        <Table.Cell>
                           <a href={`${urlBasePath}/${student.id}`} className='text-cyan-600'>Details</a>
                        </Table.Cell>
                     </Table.Row>
                  ))
               ):(
                  <tr>
                     <td colSpan={7} className="border border-gray-300 p-2 text-center text-2xl text-red-500">
                     No matching students found.
                     </td>
                  </tr>
               )}
            </Table.Body>
         </Table>
      </div>
   )
}

export default AppTable