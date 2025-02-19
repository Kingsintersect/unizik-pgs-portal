import { GetSingleCourse } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import UpdateCourse from '../../components/UpdateCourse';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession(loginSessionKey);
   const [course]: any = await Promise.all([
      GetSingleCourse(id, session.token),
   ]);

   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List Courses',
         href: `/dashboard/admin/course-management/courses`,
      },
      {
         label: 'Edit Course',
         href: `/dashboard/admin/course-management/courses/${id}/edit`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCourse course={course.success.data} token={session.token} />
         </div>
      </main>
   )
}

export default page