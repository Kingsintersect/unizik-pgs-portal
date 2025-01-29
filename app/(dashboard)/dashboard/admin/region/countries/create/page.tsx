import CreateCountry from '@/components/ui/admin/country/CreateCountry';
import { Breadcrumbs } from '@/components/ui/application/BreadCrumbs'
import { verifySession } from '@/lib/dal';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession();

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
                  label: 'Create New country',
                  href: `/dashboard/admin/region/countries/create`,
                  active: true,
               },
            ]}
         />
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCountry token={session.token} />
         </div>
      </main>
   )
}

export default page