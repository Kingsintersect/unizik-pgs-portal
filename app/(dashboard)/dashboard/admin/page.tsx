import { GetAmissionApprovedStudentList, GetAmissionRejectedStudentList, GetAppliedStudentList, GetUnappliedStudentList } from '@/app/actions/admin';
import { verifySession } from '@/lib/dal';
import { Card } from 'flowbite-react'
import Image from 'next/image'
import { HiOutlineUserGroup } from 'react-icons/hi'

const AdminDashboard = async () => {
   const session = await verifySession();
   const [approvedAdmission, rejectedAdmission, appliedStudents, unappliedStudents]: any = await Promise.all([
      GetAmissionApprovedStudentList(session.token),
      GetAmissionRejectedStudentList(session.token),
      GetAppliedStudentList(session.token),
      GetUnappliedStudentList(session.token),
   ]);
   const totalAdmitted = approvedAdmission.success.data.length
   const totalRejected = rejectedAdmission.success.data.length
   const totalApplied = appliedStudents.success.data.length
   const totalUnapplied = unappliedStudents.success.data.length
   const totalStudents = totalAdmitted + totalRejected + totalApplied + totalUnapplied

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
               <Card className=''>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <HiOutlineUserGroup className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-8">
                           <h3 className='text-lg sm:text-xl capitalize text-right font-bold'>Total Student</h3>
                           <h1 className="text-lg sm:text-4xl font-bold text-right text-orange-800">{totalStudents}</h1>
                        </div>
                     </div>
                  </div>
               </Card>
               <Card className=''>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <HiOutlineUserGroup className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-8">
                           <h3 className='text-xl capitalize text-right font-bold'>Admitted Student</h3>
                           <h1 className="text-4xl font-bold text-right text-orange-800">{totalAdmitted}</h1>
                        </div>
                     </div>
                  </div>
               </Card>
               <Card className=''>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <HiOutlineUserGroup className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-8">
                           <h3 className='text-xl capitalize text-right font-bold'>Pending Admission</h3>
                           <h1 className="text-4xl font-bold text-right text-orange-800">{totalApplied}</h1>
                        </div>
                     </div>
                  </div>
               </Card>
               {/* <Card className=''>
                  <div className="flex flex-row w-full justify-between items-center">
                     <div className="basis-1/3">
                        <HiOutlineUserGroup className='h-16 w-16 text-cyan-700' />
                     </div>
                     <div className="basis-2/3">
                        <div className="flex flex-col gap-8">
                           <h3 className='text-xl capitalize text-right font-bold'>Rejected Admission</h3>
                           <h1 className="text-4xl font-bold text-right text-orange-800">150</h1>
                        </div>
                     </div>
                  </div>
               </Card> */}
            </div>
         </div>
      </section>
   )
}

export default AdminDashboard