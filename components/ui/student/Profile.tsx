"use client";
import { GetStudentStudyAccount } from "@/app/actions/student"
import { useAppContext } from "@/contexts/AppContext";
import { Key, useEffect, useState } from "react";
import StudentCreateAccount from "./StudentCreateAccount";
import { Button, Card, Table } from "flowbite-react";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { useRouter } from "next/navigation";
import { lmsLoginUrl } from "@/config";
import Image from "next/image";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { notify } from "@/contexts/ToastProvider";
import AdmissionDeniedBanner from "./AdmissionDeniedBanner";

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { GetAllCoursesInACategory } from "@/app/actions/server.admin";
import useToken from "@/hook/useToken";

type ProfileType = {
   id: number;
   first_name: string;
   last_name: string;
   email: string;
   phone: string;
   reg_number: string;
   level: string;
};

const Profile = () => {
   const { state } = useAppContext();
   const router = useRouter();
   const student = state.student;
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
      if (isClient && student.reg_number) {
         navigator.clipboard.writeText(student.reg_number);
         setCopied(true);
         setTimeout(() => {
            setCopied(false)
         }, 5000)
      }
   }

   return (
      <>
         {student.admission_status === "not admitted" ?
            <AdmissionDeniedBanner statement={student.reason_for_denial as string} />
            :
            <>
               {profile ?
                  <>
                     <Tabs aria-label="Tabs with icons" variant="underline">
                        <Tabs.Item active title="Profile Data" icon={MdDashboard}>
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
                                 <Card className="w-full">
                                    <h5 className="text-3xl font-bold tracking-tight text-gray-700">
                                       Study Credentials
                                    </h5>
                                    <p className="font-normal text-gray-700">
                                       Log into your study portal with these credentials.
                                    </p>
                                    <div className="space-y-5 bg-white p-5 py-10">
                                       <div className="grid grid-cols-3 text-lg gap-5 rounded-md w-full">
                                          <div className="col-span-1 font-semibold text-orange-800">username</div>
                                          <div className="col-span-1 text-gray-600">{profile.reg_number}</div>
                                          <Button className="col-span-1" onClick={() => handleCopy()} size={"xs"} pill>
                                             <HiOutlineClipboardCopy className="mr-2 h-4 w-4" /> {copied ? "copied" : "click to copy"}
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
                                 </Card>
                                 <Card className="w-full">
                                    <h5 className="text-3xl font-bold tracking-tight text-gray-700">
                                       Course List
                                    </h5>
                                    <p className="font-normal text-gray-700 capitalize text-lg">
                                       First Semeter - First Year -courses
                                    </p>
                                    <div className="">
                                       <div className="overflow-x-auto">
                                          <Table>
                                             <Table.Head>
                                                <Table.HeadCell></Table.HeadCell>
                                                <Table.HeadCell>Course Code</Table.HeadCell>
                                                <Table.HeadCell>Course Title</Table.HeadCell>
                                                <Table.HeadCell>Credit Load</Table.HeadCell>
                                             </Table.Head>
                                             <Table.Body className="divide-y">
                                                {courses && courses.data.map((course: any, i: Key | null | undefined) => (
                                                   <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                         <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                                      </Table.Cell>
                                                      <Table.Cell>{course.course_code}</Table.Cell>
                                                      <Table.Cell>{course.course_title}</Table.Cell>
                                                      <Table.Cell>{course.credit_load}</Table.Cell>
                                                   </Table.Row>
                                                ))}
                                             </Table.Body>
                                          </Table>
                                       </div>
                                    </div>
                                 </Card>
                              </div>
                              <div className="col-span-full">
                                 <div className="flex items-center justify-center p-5">
                                    <Button onClick={handleREdirect} className="text-lg font-semibold capitalize">Login to your Study portal</Button>
                                 </div>
                              </div>
                           </div>
                        </Tabs.Item>
                        {/* <Tabs.Item title="Register Courses" icon={HiAdjustments}>
                           <Card href="#" className="w-full">
                              <h5 className="text-3xl font-bold tracking-tight text-gray-700">
                                 Course List
                              </h5>
                              <p className="font-normal text-gray-700 capitalize text-lg">
                                 First Semeter - First Year -courses
                              </p>
                              <div className="">
                                 <div className="px-4 py-2 bg-slate-200  flex items-center gap-5">
                                    <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                    <div className="font-semibold text-xl">GSS-101 - Use of English</div>
                                 </div>
                                 <div className="px-4 py-2 bg-slate-200  flex items-center gap-5">
                                    <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                    <div className="font-semibold text-xl">GSS 104 - History and Philosophy of  Science</div>
                                 </div>
                                 <div className="px-4 py-2 bg-slate-200  flex items-center gap-5">
                                    <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                    <div className="font-semibold text-xl">GSS 107 - Nigerian People and Culture</div>
                                 </div>
                                 <div className="px-4 py-2 bg-slate-200  flex items-center gap-5">
                                    <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                    <div className="font-semibold text-xl">ACC 101 - Introduction to Accounting</div>
                                 </div>
                                 <div className="px-4 py-2 bg-slate-200  flex items-center gap-5">
                                    <HiOutlineBookOpen className="h-8 w-8 text-cyan-800" />
                                    <div className="font-semibold text-xl">SOC 101 - Introduction to Sociology I</div>
                                 </div>
                              </div>
                           </Card>
                        </Tabs.Item> */}
                     </Tabs>
                  </>
                  : <>
                     <Tabs aria-label="Tabs with icons" variant="underline">
                        <Tabs.Item title="Study Profile" icon={HiUserCircle}>
                           <StudentCreateAccount />
                        </Tabs.Item>
                     </Tabs>
                  </>}
            </>
         }
      </>

   )
}

export default Profile