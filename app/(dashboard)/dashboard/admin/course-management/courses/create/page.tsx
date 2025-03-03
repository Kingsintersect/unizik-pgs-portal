import CreateCourse from '@/app/(dashboard)/dashboard/admin/course-management/courses/components/CreateCourse'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async () => {
   const session = await verifySession(loginSessionKey);

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Courses',
         href: `/dashboard/admin/course-management/courses`,
      },
      {
         label: 'Create New Course',
         href: `/dashboard/admin/course-management/courses/create`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCourse token={session.token} />
         </div>
      </main>
   )
}

export default page