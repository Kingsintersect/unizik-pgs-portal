import { GetSingleFaculty } from '@/app/actions/server.admin';
import UpdateFaculty from '@/components/ui/admin/faculty/UpdateFaculty';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs';
import { verifySession } from '@/lib/dal';
import { getSession } from '@/lib/session';
import { notFound } from 'next/navigation';
import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleFaculty(session.token, id)));

   if (!success.data) {
      notFound();
   }
   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
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
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateFaculty faculty={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default Page