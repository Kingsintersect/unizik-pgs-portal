import { GetListOfFaculties, GetSingleDepartment } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import UpdateDeparment from '../../components/UpdateDeparment';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);
   const [faculty, department]: any = await Promise.all([
      GetListOfFaculties(),
      GetSingleDepartment(id, session.token),
   ]);

   if (!department) {
      notFound();
   }

   const breadcrumbItems = [
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
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateDeparment faculties={faculty.success.data} department={department.success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page