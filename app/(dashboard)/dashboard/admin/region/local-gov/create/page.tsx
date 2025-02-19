import { GetListOfStates } from '@/app/actions/server.admin';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import CreateLocalGov from '../components/CreateLocalGov';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id;
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfStates(session.token)));

   if (!success) {
      notFound();
   }

      const breadcrumbItems = [
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
      ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateLocalGov state={success.data} token={session.token} />
         </div>
      </main>
   )
}

export default page