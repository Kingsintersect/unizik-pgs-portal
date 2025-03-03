import { GetListOfCountries } from '@/app/actions/server.admin';
import CreateState from '@/app/(dashboard)/dashboard/admin/region/states/components/CreateState';
import { verifySession } from '@/lib/server.utils';
import { notFound } from 'next/navigation';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const breadcrumbItems = [
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
];

const page = async () => {
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetListOfCountries()));

   if (!success) {
      notFound();
   }

   return (
      <main className='space-y-10'>
         <div className="p-6">
           {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <CreateState country={success} token={session.token} />
         </div>
      </main>
   )
}

export default page