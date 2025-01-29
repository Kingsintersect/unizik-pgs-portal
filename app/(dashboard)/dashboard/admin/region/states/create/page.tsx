import { GetListOfCountries } from '@/app/actions/server.admin';
import CreateState from '@/components/ui/admin/state/CreateState';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCountries()));

   if (!success) {
      notFound();
   }

   return (
      <main className='space-y-10'>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'dashboard', href: '/dashboard/admin' },
               {
                  label: 'List States',
                  href: `/dashboard/admin/region/states`,
               },
               {
                  label: 'Create New State',
                  href: `/dashboard/admin/region/states/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateState country={success} token={session.token} />
         </div>
      </main>
   )
}

export default page