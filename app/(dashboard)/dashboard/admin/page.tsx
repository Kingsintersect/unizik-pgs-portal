import { FetchAllManagers, FetchAllStudents, FetchAllTeachers, FetchAllUsers } from '@/app/actions/unizikpgs';
import { verifySession } from '@/lib/server.utils';
import Image from 'next/image';
import { LucideUsersRound } from 'lucide-react';
import CustomCard from '@/components/CustomCard';
import { loginSessionKey } from '@/lib/definitions';

const AdminDashboard = async () => {
   const session = await verifySession(loginSessionKey);
   const [users, teachers, students, managers] = await Promise.all([
      FetchAllUsers(session.token).catch(error => console.error("FetchAllUsers failed:", error)),
      FetchAllTeachers(session.token).catch(error => console.error("FetchAllTeachers failed:", error)),
      FetchAllStudents(session.token).catch(error => console.error("FetchAllStudents failed:", error)),
      FetchAllManagers(session.token).catch(error => console.error("FetchAllManagers failed:", error)),
   ]);
   const usersCount = users.success.data.length
   const teachersCount = teachers.success.data.length
   const studentCount = students.success.data.length
   const managersCount = managers.success.data.length

   return (
      <section className='w-full text-gray-800 space-y-16'>
         <div className="w-full bg-white rounded-lg shadow-lg p-10">
            <div className="flex flex-col md:flex-row justify-between gap-5">
               <div className="text-3xl font-semibold text-orange-800">Administrator</div>
               <div className="relative h-[100px] w-[200px]">
                  <Image src={'/random/rand1.jpg'} alt={'banner'} fill style={{ objectFit: "cover" }} />
               </div>
            </div>
         </div>

         <div className="w-full px-10 space-y-10">
            <h1 className='text-3xl text-orange-900 font-bold capitalize'>Student statistics</h1>
            <hr className='border-white' />
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
               <CustomCard className='py-7 px-4'>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <LucideUsersRound className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-5">
                           <h3 className='text-lg sm:text-xl capitalize text-right font-bold'>Users</h3>
                           <h1 className="text-lg sm:text-4xl font-bold text-right text-orange-800">{usersCount}</h1>
                        </div>
                     </div>
                  </div>
               </CustomCard>
               <CustomCard className='py-7 px-4'>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <LucideUsersRound className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-5">
                           <h3 className='text-xl capitalize text-right font-bold'>Students</h3>
                           <h1 className="text-4xl font-bold text-right text-orange-800">{studentCount}</h1>
                        </div>
                     </div>
                  </div>
               </CustomCard>
               <CustomCard className='py-7 px-4'>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <LucideUsersRound className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-5">
                           <h3 className='text-xl capitalize text-right font-bold'>Teachers</h3>
                           <h1 className="text-4xl font-bold text-right text-orange-800">{teachersCount}</h1>
                        </div>
                     </div>
                  </div>
               </CustomCard>
            </div>
         </div>
      </section>
   )
}

export default AdminDashboard