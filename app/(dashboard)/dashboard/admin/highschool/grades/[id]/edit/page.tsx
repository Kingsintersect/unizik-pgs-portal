import { GetSingleSubjectGrade } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import UpdateSubjectGrade from '../../components/UpdateSubjectGrade';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleSubjectGrade(id)));

   const breadcrumbItems = [
      { href: "'/dashboard/admin'", label: "Dashboard" },
      { href: "/dashboard/admin/course-management/course-assignment", label: "Course Assignments" },
      { href: `/dashboard/admin/course-management/course-assignment/${id}/edit`, label: "Edit Course Assignment" },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateSubjectGrade subjectGrade={success.grade} token={session.token} />
         </div>
      </main>
   )
}

export default page