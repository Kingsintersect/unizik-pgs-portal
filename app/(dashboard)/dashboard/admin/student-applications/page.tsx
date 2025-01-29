"use client";

import Search from '@/components/ui/inputs/Search'
import { Card, Select } from 'flowbite-react'
import AppTable from '@/components/ui/admin/AppTable'
import AppPagination from '@/components/ui/application/AppPagination'
import { fetchAllStudentApplications } from '@/app/actions/admin';
import useToken from '@/hook/useToken';
import { useState, useEffect, useMemo } from 'react';
import ExportDropdown from '@/components/ExportDropdown';

const StudentApplications = () => {
   const { token } = useToken();
   const [studentData, setStudentData] = useState<any>([]);
   const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      const getAllStudent = async () => {
         if (token) {
            const { success, error } = await fetchAllStudentApplications(token)
            if (success) {
               if (success.status === 200) {
                  const ascendingData = [...success.data].sort((a, b) => a.id - b.id);
                  const descendingData = [...success.data].sort((a, b) => b.id - a.id);
                  setStudentData(descendingData);
               } else {
                  console.error("Authentication Error: ", "User Unauthenticated");
               }
               return
            }
            if (error) {
               console.error('Error Fetching Student Data: ', error.message);
            }
         } else {
            console.error("User Auth Token Not Found!!!");
         }
      }
      getAllStudent();
   }, [token])

   const filteredStudents = useMemo(() => {
      let result = studentData;
      console.log('filter', filter)
      switch (filter) {
         case "all":
            result = studentData;
            break;
         case "applied":
            result = studentData.filter((student: any) => student.application_payment_status === 1);
            break;
         case "notapplied":
            result = studentData.filter((student: any) => student.application_payment_status === 0);
            break;
         case "paidacceptance":
            result = studentData.filter((student: any) => student.acceptance_fee_payment_status === 1);
            break;
         case "paidtuition":
            result = studentData.filter((student: any) => student.tuition_payment_status === 1);
            break;
         case "admitted":
            result = studentData.filter((student: any) => student.admission_status === filter);
            break;
         case "pending":
            result = studentData.filter((student: any) => student.admission_status === filter);
            break;
         case "not admitted":
            result = studentData.filter((student: any) => student.admission_status === filter);
            break;
         default:
            // console.warn(`Unknown filter: ${filter}`);
            result = studentData;
            console.log('result', result);
            break;
      }

      if (searchQuery) {
         const lowerQuery = searchQuery.toLowerCase();
         result = result.filter((student:any) =>
            student.first_name.toLowerCase().includes(lowerQuery) ||
            student.last_name.toLowerCase().includes(lowerQuery) ||
            student.reference.toLowerCase().includes(lowerQuery)
         );
      }

      return result;
      
   }, [filter, searchQuery, studentData]);
   
   return (
      <>
         <Card className="mt-7">
            <header className="w-full flex items-center justify-between text-orange-500 font-bold">
               <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-7">
                  Student admission list
               </h5>
               <ExportDropdown
                  data={studentData}
                  columns={
                     [
                        'first_name',
                        'last_name',
                        'reference',
                        'admission_status',
                        'application_payment_status',
                        'accpetance_fee_payment_status',
                        'tuition_payment_status',
                        'email',
                        'phone_number',
                        'state',
                     ]
                  }
               />
            </header>
            <div className="font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7">
               <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
                  <div className="search">
                     <Search
                        name={'search'}
                        placeholder='Search by name or registration number...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border p-2 rounded w-full"
                     />
                  </div>
                  <div className="search flex justify-end gap-5">
                     <Select id="student-filter"  onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value={"all"}>Payment Status</option>
                        <option value={"applied"}>Applied</option>
                        <option value={"notapplied"}>Not Applied</option>
                        <option value={'paidacceptance'}>Paid Accceptance</option>
                        <option value={"paidtuition"}>Paid Tuition</option>
                     </Select>
                     <Select id="student-filter"  onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value={"all"}>Admission Status</option>
                        <option value={"pending"}>Pending</option>
                        <option value={'admitted'}>Admitted</option>
                        <option value={"not admitted"}>Not Admitted</option>
                     </Select>
                  </div>
               </div> 
               <AppTable data={filteredStudents} />
            </div>
            <div className="flex items-center justify-center">
               <AppPagination />
            </div>
         </Card>
      </>
   )
}

export default StudentApplications