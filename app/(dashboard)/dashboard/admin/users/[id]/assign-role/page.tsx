"use client";


import { Button } from "@/components/ui/button"
import CustomCard from '@/components/CustomCard';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useToken from '@/hook/useToken';
import { MoveRightIcon } from 'lucide-react';
import { notify } from '@/contexts/ToastProvider';
import { SkeletonCard } from '@/components/ui/application/suspence/CardSkeleton';
import { FetchSigleUser, UpdateUserRole } from '@/app/actions/unizikpgs';
import { SelectFormField } from '@/components/ui/inputs/FormFields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserRoleFormData, UpdateUserRoleSchema, UserRoles } from '../../users.types';
import Spinner from "@/components/ui/application/Spinner";
import { extractErrorMessages } from "@/lib/utils/errorsHandler";

const AssignRole = ({ params }: { params: { id: string } }) => {
   const router = useRouter();
   const [user, setUser] = useState<StudentApplicationType>();
   const [role, setRole] = useState('');
   const { token } = useToken();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
      setError,
      control,
   } = useForm<UpdateUserRoleFormData>({ resolver: zodResolver(UpdateUserRoleSchema), });

   useEffect(() => {
      const fetchStudentData = async (tokenValue: string) => {
         const { error, success } = await FetchSigleUser(tokenValue, params.id);
         if (success) {
            console.log('success.data', success.data);
            setUser(success.data);
            return;
         }
         if (error) {
            const errorMessages = extractErrorMessages(error);
            errorMessages.forEach((msg) => {
               notify({ message: msg, variant: "error", timeout: 10000 });
            });
            return;
         }
      }

      if (token) {
         fetchStudentData(token);
      }
   }, [router, params.id, token, user?.role]);

   useEffect(() => {
        const loadData = async () => {
           {user?.role && setRole(user?.role)};
        };

        loadData();
    }, [setValue, user?.id, user?.role, user?.email]);

   const onSubmit: SubmitHandler<UpdateUserRoleFormData> = async (data) => {
      console.log('user', data)
      setIsLoading(true);
      try {
         const { error, success }: any = await UpdateUserRole(token ?? "",params.id, data);
         if (error) {
            const errorMessages = extractErrorMessages(error);
            errorMessages.forEach((msg) => {
               notify({ message: msg, variant: "error", timeout: 10000 });
            });
            return;
         }
         if (success) {
            notify({ message: 'State Update Data Successful.', variant: "success", timeout: 5000 })
            setRole(data.role);
         }
      } catch (error) {
         console.error("An unexpected error occurred:", error);
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className=' space-y-7'>
         {(!user) ?
            <>
               <div className="flex items-center justify-center w-full h-[500px]">
                  <SkeletonCard />
               </div>
            </>
            :
            <>
               <div className="grid sm:grid-cols-3 gap-7">
                  <div className="min-h-[200px] sm:col-span-1">
                     <CustomCard
                        className='mt-7'
                     >
                        <div className="relative w-auto h-72">
                           {user?.pictureRef &&
                              <Image src={`${user?.pictureRef}`} fill style={{ objectFit: "cover" }} alt={"Alt Image"} />
                           }
                        </div>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                           {user?.first_name + " " + user?.last_name}
                        </h5>
                     </CustomCard>
                  </div>

                  <div className="min-h-[200px] sm:col-span-2">
                     <CustomCard
                        className='mt-7'
                        title="Assign Role To User"
                        titleClassName='mb-4 flex items-center justify-between text-2xl font-bold leading-none text-[#23628d]'
                     >
                        <div className="flow-root space-y-10">
                           <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                              <li className="py-1 sm:py-1">
                                 <div className="flex items-center space-x-4">
                                    <div className="shrink-0">
                                       <MoveRightIcon width={20} color='#23628d' />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                       <div className="flex justify-between">
                                          <span className='inline-block mr-5 font-bold text-xl'>Current Role: </span>
                                          <span className="text-[#c04012]">{role}</span>    
                                       </div>
                                    </div>
                                 </div>
                              </li>
                           </ul>
                           <hr className='border-t-red-400 mb-5' />
                           <form onSubmit={handleSubmit(onSubmit)} className={'space-y-10'}>
                              <SelectFormField<UpdateUserRoleFormData>
                                 name="role"
                                 label={"User Roles"}
                                 placeholder={"Choose a Role"}
                                 control={control}
                                 options={UserRoles.map((role: any) => ({ value: String(role.value), label: role.label }))}
                                 error={errors.role}
                              />
                              <Button
                                 type="submit"
                                 className="
                                    bg-[#c04012] text-white font-light py-2 rounded-sm
                                    transition-all duration-500 ease-in-out
                                    hover:bg-[#d35401]
                                    active:bg-[#a8320a]
                                    mx-auto
                                 "
                                 disabled={isLoading}
                              >
                                 {isLoading? (
                                    <div className="flex items-center gap-5">
                                       <span>Processing...</span>
                                       <Spinner />
                                    </div>
                                 ) : (
                                    <span className='text-2xl'>Assign role</span>
                                 )}
                              </Button>
                           </form>
                        </div>
                     </CustomCard>
                  </div>
               </div>

               <div className="grid sm:grid-cols-2 row-auto gap-7">
                  <CustomCard
                     className='h-full'
                  >
                     <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Gender</span>
                                       {user?.gender}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Date Of Birth</span>
                                       {user?.dob}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Home Town</span>
                                       {user?.hometown}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Local Gov. Area</span>
                                       {user?.lga}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Home Address</span>
                                       {user?.hometown_address}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Contact Address</span>
                                       {user?.contact_address}
                                    </div>
                                 </div>
                              </div>
                           </li>
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Disability</span>
                                       {user?.disability}
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </CustomCard>

                  <CustomCard
                     className=''
                     title="ADMISSION PROCESS STATUS"
                     titleClassName="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                     <div className="flow-root">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600">
                           <li className="py-1 sm:py-1">
                              <div className="flex items-center space-x-4">
                                 <div className="shrink-0">
                                    <MoveRightIcon width={20} color='green' />
                                 </div>
                                 <div className="min-w-0 flex-1">
                                    <div className="flex justify-between">
                                       <span className='inline-block mr-5 font-bold'>Admission</span>
                                       {(user?.is_applied === 1) ? "Applied" : "Not Applied"}
                                    </div>
                                 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </CustomCard>
               </div>
            </>
         }
      </div>
   )
}

export default AssignRole