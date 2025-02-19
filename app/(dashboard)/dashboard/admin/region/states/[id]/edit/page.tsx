import { GetListOfCountries, GetSingleState } from '@/app/actions/server.admin';
import UpdateState from '../../components/UpdateState';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async ({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string  } }) => {
   const id = params.id;
   const { parent } = searchParams;
   const session = await verifySession(loginSessionKey);
   const [country, state]: any = await Promise.all([
      GetListOfCountries(),
      GetSingleState(id, session.token),
   ]);
   
   const breadcrumbItems = [
      { label: 'dashboard', href: '/dashboard/admin' },
      {
         label: 'List States',
         href: `/dashboard/admin/region/states`,
      },
      {
         label: 'Update country',
         href: `/dashboard/admin/region/states/${id}/edit`,
         active: true,
      },
   ];

   return (
      <main className='space-y-10'>
         <div className="p-6">
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateState parent={parent} country={country.success} token={session.token} state={state.success.data} />
         </div>
      </main>
   )
}

export default page