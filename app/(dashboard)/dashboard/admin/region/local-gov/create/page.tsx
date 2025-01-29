import { GetListOfStates } from '@/app/actions/server.admin';
import CreateLocalGov from '@/components/ui/admin/localgov/CreateLocalGov';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfStates(session.token)));

   if (!success) {
      notFound();
   }

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List Local Gov',
                  href: `/dashboard/admin/region/local-gov`,
               },
               {
                  label: 'Create New State',
                  href: `/dashboard/admin/region/local-gov/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateLocalGov state={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default page