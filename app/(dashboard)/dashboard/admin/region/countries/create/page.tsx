
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import CreateCountry from '../components/CreateCountry';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);

   const breadcrumbItems = [
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
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateCountry token={session.token} />
         </div>
      </main>
   )
}

export default page