"use client";

import Search from '@/components/ui/inputs/Search'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useToken from '@/hook/useToken';
import { useState, useEffect, useMemo } from 'react';
import ExportDropdown from '@/components/ExportDropdown';
import { FetchAllUsers } from '@/app/actions/unizikpgs';
import { baseUrl } from '@/config';
import { DataTable } from '@/components/ui/datatable/DataTable';
import { user_columns } from './user_table.columns';
import { filterData } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookPlusIcon } from 'lucide-react';

const UsersPage = () => {
   const basePath = `${baseUrl}/dashboard/admin/users`;
   const { token } = useToken();
   const [userData, setUserData] = useState<any>([]);
   const [filter, setFilter] = useState("ALL");
   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      const getAlluser = async () => {
         if (token) {
            const { success, error } = await FetchAllUsers(token)
            if (success) {
               const descendingData = [...success.data].sort((a, b) => b.id - a.id);
               setUserData(descendingData);
               return
            }
            if (error) {
               console.error('Error Fetching user Data: ', error.message);
            }
         }
      }
      getAlluser();
   }, [token])

   const filteredusers = useMemo(() =>
      filterData(userData, "role", filter, ["first_name", "last_name"], searchQuery),
      [filter, searchQuery, userData]
   );

   return (
      <>
         <Card className="mt-7 p-10">
            <header className="w-full flex items-center justify-between text-orange-500 font-bold">
               <h5 className="text-2xl font-bold tracking-tight text-[#23628d] dark:text-white mb-7">
                  All Users
               </h5>
               {userData && userData.length > 0 && (
                  <ExportDropdown
                     data={userData}
                     columns={
                        [
                           'first_name',
                           'last_name',
                           'email',
                           'program',
                           'department',
                        ]
                     }
                  />
               )}
            </header>
            <div className="font-normal text-gray-700 dark:text-gray-400 space-y-10 mb-7">
               <div className="grid sm:grid-cols-2 gap-3 md:gap-10">
                  <div className="search">
                     <Search
                        name={'search'}
                        placeholder='Search by name or registration number...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 rounded w-full"
                     />
                  </div>
                  <div className="search flex justify-end gap-5">
                     <Select
                        onValueChange={(value: string) => setFilter(value)} 
                        defaultValue={filter}
                     >
                        <SelectTrigger className='w-[280px]'>
                           <SelectValue placeholder="Select Filter Key" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ALL">All Users</SelectItem>
                           <SelectItem value="STUDENT">Students</SelectItem>
                           <SelectItem value="TEACHER">Teachers</SelectItem>
                           <SelectItem value="MANAGER">Managers</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
               <div className="flex flex-col">
                  <div className="">
                     <Link href={`${basePath}/bulkupload`} >
                        <Button variant={'secondary'}>
                           <BookPlusIcon className="h-5 md:ml-4" />
                           Bulk User Upload
                        </Button>
                     </Link>
                  </div>
               </div>
               <div className="grid grid-cols-1">
                  <DataTable columns={user_columns} data={filteredusers} />
               </div>
            </div>
         </Card>
      </>
   )
}

export default UsersPage


// function filterUser(userData: any, filterer: string, query: string) {
//    let result = userData;
//       switch (filterer) {
//          case "ALL":
//             result = userData;
//             break;
//          case "STUDENT":
//             result = userData.filter((user: any) => user.role === Roles.STUDENT);
//             break;
//          case "TEACHER":
//             result = userData.filter((user: any) => user.role === Roles.TEACHER);
//             break;
//          case "MANAGER":
//             result = userData.filter((user: any) => user.role === Roles.MANAGER);
//             break;
//          default:
//             result = userData;
//             break;
//       }

//       if (query) {
//          const lowerQuery = query.toLowerCase();
//          result = result.filter((user:any) =>
//             user.first_name.toLowerCase().includes(lowerQuery)
//             || user.last_name.toLowerCase().includes(lowerQuery)
//             // user.program.toLowerCase().includes(lowerQuery)
//          );
//       }

//       return result;
// }
