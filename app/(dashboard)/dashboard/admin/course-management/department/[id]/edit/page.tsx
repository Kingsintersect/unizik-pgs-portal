import { GetListOfFaculties, GetSingleDepartment } from '@/app/actions/server.admin';
import UpdateDeparment from '@/components/ui/admin/department/UpdateDeparment';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();
   const [faculty, department]: any = await Promise.all([
      GetListOfFaculties(),
      GetSingleDepartment(id, session.token),
   ]);

   if (!department) {
      notFound();
   }
   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Department',
                  href: `/dashboard/admin/course-management/department`,
               },
               {
                  label: 'Update Department',
                  href: `/dashboard/admin/course-management/department/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateDeparment faculty={faculty.success.data} department={department.success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page