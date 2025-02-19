import { GetSingleFaculty } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import UpdateFaculty from '../../components/UpdateFaculty';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';


const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleFaculty(session.token, id)));

   if (!success.data) {
      notFound();
   }

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Faculty',
         href: `/dashboard/admin/course-management/faculty`,
      },
      {
         label: 'Update Faculty',
         href: `/dashboard/admin/course-management/faculty/${id}/edit`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} /> */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateFaculty faculty={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page