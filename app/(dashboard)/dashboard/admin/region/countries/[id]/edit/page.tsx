import { GetSingleCountry } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import UpdateCountry from '../../components/UpdateCountry';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';


const page = async ({ params }: { params: { id: string } }) => {
   const id = params.id
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleCountry(id)));

   const breadcrumbItems = [
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
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            {/* {breadcrumbItems && <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />} */}
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateCountry country={success.country} token={session.token} />
         </div>
      </main>
   )
}

export default page