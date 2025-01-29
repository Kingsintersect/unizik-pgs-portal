import { GetSingleClassSubjects } from '@/app/actions/server.admin';
import UpdateClassSubject from '@/components/ui/admin/highschool/UpdateClassSubject';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import React from 'react'

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string } }) => {
   const id = params.id
   const session = await verifySession();
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleClassSubjects(id)));

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Countries',
                  href: `/dashboard/admin/region/countries`,
               },
               {
                  label: 'Update country',
                  href: `/dashboard/admin/region/countries/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateClassSubject classSubject={success.classSubjects} token={session.token} />
         </div>
      </main>
   )
}

export default page