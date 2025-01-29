"use client";

import { fetchSingleStudentApplications } from '@/app/actions/admin';
import { Card, ListGroup, Table } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useToken from '@/hook/useToken';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { notify } from '@/contexts/ToastProvider';
import GrantStudentAdmissionModal from '@/components/ui/app/GrantStudentAdmissionModal';
import RejectStudentAdmissionModal from '@/components/ui/app/RejectStudentAdmissionModal';
import { ImageModal } from '@/components/ui/application/ImageModal';
import { SkeletonCard } from '@/components/ui/application/suspence/CardSkeleton';

const StudentApplicationDetails = ({ params }: { params: { id: string } }) => {
   const router = useRouter();
   const [data, setData] = useState<StudentApplicationType>();
   const [firstSitting, setFirstSitting] = useState<Record<string, any>>();
   const [secondSitting, setSecondSitting] = useState<Record<string, any>>();
   const [hasApplication, setHasApplication] = useState(false);
   const { token } = useToken();

   useEffect(() => {
      const fetchStudentData = async (tokenValue: string) => {
         const { error, success } = await fetchSingleStudentApplications(tokenValue, params.id);
         if (success) {
            setData(success.data);
            if (success.data.application) {
               (success.data.application) ? setHasApplication(true) : setHasApplication(false);
               setFirstSitting(JSON.parse(success.data.application.first_sitting))
               setSecondSitting(JSON.parse(success.data.application.second_sitting))
            }
            return;
         }
         if (error) {
            console.log('error', error.message)
            notify({ message: 'Something went wrong!', variant: "error", timeout: 5000 });
            setHasApplication(true);
            return;
         }
      }

      if (token) {
         fetchStudentData(token);
      }
   }, [router, params.id, token]);
   return (
      <div className=' space-y-7'>
         {(!data) ?
            <>
               <div className="flex items-center justify-center w-full h-[500px]">
                  <SkeletonCard />
               </div>
            </>
            :
            <>
               {hasApplication === false ?
                  <>
                     <Card>
                        <div className="flex items-center justify-center min-h-[400px] text-gray-600 text-5xl">Student Has Not Applied Yet
                        </div>
                     </Card>
                  </>
                  :
                  <>
                     <div className="grid sm:grid-cols-3 gap-7">
                        <div className="min-h-[200px] sm:col-span-1">
                           <Card className="">
                              <div className="relative w-auto h-72">
                                 {data?.application.passport &&
                                    <Image src={`${data?.application.passport}`} fill style={{ objectFit: "cover" }} alt={"Alt Image"} />
                                 }
                              </div>
                              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                 {data?.first_name + " " + data?.last_name}
                              </h5>
                           </Card>
                        </div>

                        <div className="min-h-[200px] sm:col-span-2">
                           <Card className="h-full" >
                              <div className="flow-root">
                                 <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Gender</span>
                                                {data?.application.gender}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Date Of Birth</span>
                                                {data?.application.dob}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Home Town</span>
                                                {data?.application.hometown}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Local Gov. Area</span>
                                                {data?.application.lga}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Home Address</span>
                                                {data?.application.hometown_address}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Contact Address</span>
                                                {data?.application.contact_address}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li className="py-1 sm:py-1">
                                       <div className="flex items-center space-x-4">
                                          <div className="shrink-0">
                                             <ArrowLongRightIcon width={20} color='green' />
                                          </div>
                                          <div className="min-w-0 flex-1">
                                             <div className="flex justify-between">
                                                <span className='inline-block mr-5 font-bold'>Disability</span>
                                                {data?.application.disability}
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </Card>
                        </div>
                     </div>

                     <div className="grid sm:grid-cols-2 row-auto gap-7">
                        <Card className="">
                           <div className="mb-4 flex items-center justify-between">
                              <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">Sponsor</h5>
                           </div>
                           <div className="flow-root">
                              <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Sponsor Name</span>
                                             {data?.application.sponsor_name}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Relationship</span>
                                             {data?.application.sponsor_relationship}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Sponsors Phone Number</span>
                                             {data?.application.sponsor_phone_number}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Sponsors Email</span>
                                             {data?.application.sponsor_email}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Sponsors Contact Address</span>
                                             {data?.application.sponsor_contact_address}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              </ul>
                           </div>
                        </Card>
                        <Card className="">
                           <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              ADMISSION PROCESS STATUS
                           </h5>
                           <div className="flow-root">
                              <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Admission</span>
                                             {(data?.is_applied === 1) ? "Applied" : "Not Applied"}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Application Fee</span>
                                             {(data?.application_payment_status === 1) ? "Paid" : "Not Paid"}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Acceptance Fee</span>
                                             {(data?.accpetance_fee_payment_status === 1) ? "Paid" : "Not Paid"}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                                 <li className="py-1 sm:py-1">
                                    <div className="flex items-center space-x-4">
                                       <div className="shrink-0">
                                          <ArrowLongRightIcon width={20} color='green' />
                                       </div>
                                       <div className="min-w-0 flex-1">
                                          <div className="flex justify-between">
                                             <span className='inline-block mr-5 font-bold'>Tuition Fee</span>
                                             {(data?.tuition_payment_status === 1) ? "Paid" : "Not Paid"}
                                          </div>
                                       </div>
                                    </div>
                                 </li>
                              </ul>
                           </div>
                        </Card>
                     </div>

                     {Boolean(data.application.awaiting_result) ?
                        <div className="grid sm:grid-cols-1  gap-7">
                           <Card className="">
                              <div className="p-20 flex items-center justify-center font-semibold text-2xl text-red-800">
                                 Awaiting Result!!!
                              </div>
                           </Card>
                        </div>
                        :
                        <div className="grid sm:grid-cols-2 gap-7">
                           <Card className="">
                              <div className="h-full space-y-4">
                                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    EXAM FIRST SITTING DETAILS
                                 </h5>
                                 <div className="font-normal text-gray-700 dark:text-gray-400 mb-5">
                                    <div className="grid grid-cols-1 space-y-7 justify-center">
                                       <ListGroup className="w-full">
                                          <ListGroup.Item>{firstSitting?.type}</ListGroup.Item>
                                          <ListGroup.Item>{firstSitting?.exam_number}</ListGroup.Item>
                                          <ListGroup.Item>{firstSitting?.year}</ListGroup.Item>
                                       </ListGroup>
                                       <div className="overflow-x-auto">
                                          <Table>
                                             <Table.Head>
                                                <Table.HeadCell>Grade</Table.HeadCell>
                                                <Table.HeadCell>Subject</Table.HeadCell>
                                             </Table.Head>
                                             <Table.Body className="divide-y">
                                                {firstSitting?.first_sitting_grade && firstSitting?.first_sitting_grade.map((sit: any, i: any) => (
                                                   <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                         {sit.subject}
                                                      </Table.Cell>
                                                      <Table.Cell>{sit.Grade}</Table.Cell>
                                                   </Table.Row>
                                                ))}
                                             </Table.Body>
                                          </Table>
                                       </div>
                                    </div>
                                 </div>
                                 <hr />
                                 <ImageModal img_url={firstSitting?.first_sitting_result} >
                                    <div className="group relative w-auto min-h-[530px] mt-10 cursor-pointer">
                                       {firstSitting?.first_sitting_result &&
                                          <Image
                                             src={`${firstSitting?.first_sitting_result}`}
                                             fill
                                             style={{ objectFit: "contain" }}
                                             className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                             alt={"Alt Image"} />
                                       }
                                    </div>
                                 </ImageModal>
                              </div>
                           </Card>
                           <Card className="">
                              <div className="h-full space-y-4">
                                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    EXAM SECOND SITTING DETAILS
                                 </h5>
                                 <div className="font-normal text-gray-700 dark:text-gray-400 mb-5">
                                    <div className="grid grid-cols-1 space-y-7 justify-center">
                                       <ListGroup className="w-full">
                                          <ListGroup.Item>{secondSitting?.type}</ListGroup.Item>
                                          <ListGroup.Item>{secondSitting?.exam_number}</ListGroup.Item>
                                          <ListGroup.Item>{secondSitting?.year}</ListGroup.Item>
                                       </ListGroup>
                                       <div className="overflow-x-auto">
                                          <Table>
                                             <Table.Head>
                                                <Table.HeadCell>Grade</Table.HeadCell>
                                                <Table.HeadCell>Subject</Table.HeadCell>
                                             </Table.Head>
                                             <Table.Body className="divide-y">
                                                {secondSitting?.second_sitting_grade
                                                   && secondSitting?.second_sitting_grade
                                                      .map((sit: any, i: any) => (
                                                         <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                               {sit.subject}
                                                            </Table.Cell>
                                                            <Table.Cell>{sit.Grade}</Table.Cell>
                                                         </Table.Row>
                                                      ))}
                                             </Table.Body>
                                          </Table>
                                       </div>
                                    </div>
                                 </div>
                                 <hr />
                                 <ImageModal img_url={secondSitting?.second_sitting_result} >
                                    <div className="group relative w-auto min-h-[530px] mt-10 cursor-pointer">
                                       {secondSitting?.second_sitting_result &&
                                          <Image
                                             src={`${secondSitting?.second_sitting_result}`}
                                             fill
                                             style={{ objectFit: "contain" }}
                                             className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                                             alt={"Alt Image"} />
                                       }
                                    </div>
                                 </ImageModal>
                              </div>
                           </Card>
                        </div>
                     }

                     {(data.admission_status === "pending") ?
                        <div className="grid sm:grid-cols-3 gap-7">
                           <div className="min-h-[200px] col-span-3">
                              <Card className="">
                                 <div className="flex items-center justify-between">
                                    <RejectStudentAdmissionModal id={params.id} modalSize={'2xl'} />
                                    <GrantStudentAdmissionModal id={params.id} faculty_id={data.faculty_id} department_id={data.department_id} />
                                 </div>
                              </Card>
                           </div>
                        </div>
                        : data.admission_status === "not admitted" ?
                           <div className="grid sm:grid-cols-3 gap-7">
                              <div className="min-h-[200px] col-span-3">
                                 <Card className="">
                                    <div className="flex items-center justify-around">
                                       <div className=" text-3xl font-semibold text-gray-700">ADMISSION DENAIED</div>
                                       <HiOutlineXCircle className="h-14 w-14 text-red-400 dark:text-red-200" />
                                    </div>
                                 </Card>
                              </div>
                           </div>
                           :
                           <div className="grid sm:grid-cols-3 gap-7">
                              <div className="min-h-[200px] col-span-3">
                                 <Card className="">
                                    <div className="flex items-center justify-around">
                                       <div className=" text-3xl font-semibold text-gray-700">ADMISSION GRANTED</div>
                                       <HiOutlineCheckCircle className="h-14 w-14 text-green-400 dark:text-green-200" />
                                    </div>
                                 </Card>
                              </div>
                           </div>
                     }
                  </>
               }
            </>
         }
      </div>
   )
}

export default StudentApplicationDetails











// import StudentApplicationDetails from '@/components/ui/student/StudentApplicationDetails'
// import React from 'react'

// const StudentApplicationDetail = ({ params }: { params: { id: string } }) => {
//    return (
//       <div>
//          <StudentApplicationDetails params={params} />
//       </div>
//    )
// }

// export default StudentApplicationDetail