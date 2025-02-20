"use client";
import { GetStudentStudyAccount } from "@/app/actions/student"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { lmsLoginUrl } from "@/config";
import Image from "next/image";
import { ClipboardCheck, CircleUserRound, LayoutDashboard } from "lucide-react";
import { notify } from "@/contexts/ToastProvider";

import { GetAllCoursesInACategory } from "@/app/actions/server.admin";
import useToken from "@/hook/useToken";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../button";
import CustomCard from "@/components/CustomCard";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckboxColumn, DataTableColumnHeader } from "../datatable/DataTableColumnHeader";
import { ActionMenu } from "../datatable/ActionMenu";
import { DataTable } from "../datatable/DataTable";
import { useUser } from "@/contexts/UserContext";


export type ProfileTableColum = {
    id: string
    course_code: string
    course_title: string
    credit_load: string
}

export const profile_table: ColumnDef<ProfileTableColum>[] = [
    DataTableCheckboxColumn<ProfileTableColum>(),
    {
        accessorKey: "course_code",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Course Code" />
        ),
    },
    {
        accessorKey: "course_title",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Course Title" />
        ),
    },
    {
        accessorKey: "credit_load",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Credit Load" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionMenu row={row.original} onCopy={(id) => navigator.clipboard.writeText(id)} />,
    },
]

const Profile = () => {
   const { user} = useUser();
   const router = useRouter();
   const student = user;
   const [profile, setProfile] = useState<Profile | null>(null);
   const [courses, setCourses] = useState<any | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [isClient, setIsClient] = useState(false);
   const [copied, setCopied] = useState(false);
   const { token } = useToken();

   useEffect(() => {
      async function fetchProfileData(regNumber: string, level: string, accessToken: string) {
         try {
            setIsLoading(true);

            const [profileResponse, coursesResponse] = await Promise.all([
               GetStudentStudyAccount(regNumber),
               GetAllCoursesInACategory(level, accessToken),
            ]);

            if (profileResponse.error) {
               notify({
                  message: 'Create your Study Account to view your profile!',
                  variant: 'warning',
                  timeout: 5000,
               });
               setProfile(null);
               return;
            }

            if (profileResponse.success) {
               setProfile(profileResponse.success);
            }

            if (coursesResponse.success) {
               setCourses(coursesResponse.success);
            }
         } catch (error) {
            console.error('Error fetching profile data:', error);
            notify({
               message: 'An error occurred while fetching profile data!',
               variant: 'error',
               timeout: 5000,
            });
         } finally {
            setIsLoading(false);
         }
      }

      if (student?.reg_number && student?.level && token) {
         fetchProfileData(student.reg_number, student.level, token);
      }

      setIsClient(true);
   }, [student, token]);


   function handleREdirect() {
      router.push(lmsLoginUrl)
            router.refresh();
   }

   const handleCopy = () => {
      if (isClient && student?.reg_number) {
         navigator.clipboard.writeText(student?.reg_number);
         setCopied(true);
         setTimeout(() => {
            setCopied(false)
         }, 5000)
      }
   }

   return (
      // <>
      //    {student.admission_status === "not admitted" ?
      //       <div>empty not admitted</div>
      //       :
            <>
               {profile ?
                  <>
                     <Tabs defaultValue="profile-data" className="w-[400px]">
                        <TabsList>
                           <TabsTrigger value="profile-data">
                              <LayoutDashboard/>
                              Account
                           </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile-data">
                           <div className='grid md:grid-cols-3 text-gray-700 gap-10 md:gap-20'>
                              <div className="col-span-full md:col-span-1">
                                 <div className="w-full flex flex-col items-center justify-center space-y-7 border px-5 py-10 rounded-md">
                                    <div className="relative h-[100px] w-[200px] rounded-full shadow-lg inline-block p-24 mb-5">
                                       <Image src={"/random/a5.png"} alt={"profile image"} fill style={{ objectFit: "cover" }} />
                                    </div>
                                    <span className="text-2xl font-semibold capitalize">{profile.first_name + " " + profile.last_name}</span>
                                    <div className="w-full">
                                       <div className="flex justify-between text-lg gap-5">
                                          <span className="font-semibold">Reg-Number</span>
                                          <span className="text-gray-600">{profile.reg_number}</span>
                                       </div>
                                       <div className="flex justify-between text-lg gap-5">
                                          <span className="font-semibold">Email</span>
                                          <span className="text-gray-600">{profile.email}</span>
                                       </div>

                                    </div>
                                 </div>
                              </div>
                              <div className="col-span-full md:col-span-2 space-y-10">
                                 <CustomCard 
                                    className="w-full"
                                    title="Study Credentials"
                                    titleClassName="text-3xl font-bold tracking-tight text-gray-700"
                                    description="Log into your study portal with these credentials."
                                 >                                    
                                    <div className="space-y-5 bg-white p-5 py-10">
                                       <div className="grid grid-cols-3 text-lg gap-5 rounded-md w-full">
                                          <div className="col-span-1 font-semibold text-orange-800">username</div>
                                          <div className="col-span-1 text-gray-600">{profile.reg_number}</div>
                                          <Button className="col-span-1" onClick={() => handleCopy()} size={"sm"} variant={"outline"}>
                                             <ClipboardCheck className="mr-2 h-4 w-4" /> {copied ? "copied" : "click to copy"}
                                          </Button>
                                       </div>
                                       <div className="grid grid-cols-3 text-lg gap-5 rounded-md w-full">
                                          <div className="col-span-1 font-semibold text-orange-800">Default Password</div>
                                          <div className="col-span-2 text-gray-600">{"P@55word"}</div>
                                       </div>
                                    </div>
                                    <div className="space-y-2 mt-5">
                                       <h3 className="text-3xl capitalize mb-3 font-bold tracking-tight text-gray-700">study level</h3>
                                       <div className="text-xl flex items-center gap-5">
                                          <div className="font-semibold">Faculty</div>
                                          <div className="">{courses.faculty}</div>
                                       </div>
                                       <div className=""><hr /></div>
                                       <div className="text-xl flex items-center gap-5">
                                          <div className="font-semibold">Department</div>
                                          <div className="">{courses.department}</div>
                                       </div>
                                       <div className=""><hr /></div>
                                       <div className="text-xl flex items-center gap-5">
                                          <div className="font-semibold">Level</div>
                                          <div className="">{courses.course_category}</div>
                                       </div>
                                       <div className=""><hr /></div>
                                    </div>
                                 </CustomCard>
                                 <CustomCard 
                                    className="w-full"
                                    title="Course List"
                                    titleClassName="text-3xl font-bold tracking-tight text-gray-700"
                                    description="First Semeter - First Year -courses"
                                 >                                    
                                    <div className="">
                                       <div className="overflow-x-auto">                                          
                                          <DataTable columns={profile_table} data={courses.data} />
                                       </div>
                                    </div>
                                 </CustomCard>
                              </div>
                              <div className="col-span-full">
                                 <div className="flex items-center justify-center p-5">
                                    <Button onClick={handleREdirect} className="text-lg font-semibold capitalize">Login to your Study portal</Button>
                                 </div>
                              </div>
                           </div>
                        </TabsContent>
                     </Tabs>
                  </>
                  : <>
                     <Tabs defaultValue="study-profile" className="w-[400px]">
                        <TabsList>
                           <TabsTrigger value="study-profile">
                              <CircleUserRound/>
                              Study Account
                           </TabsTrigger>
                        </TabsList>
                        <TabsContent value="study-profile">Make changes to your study account here.</TabsContent>
                     </Tabs>
                  </>}
            </>
      //    }
      // </>

   )
}

export default Profile