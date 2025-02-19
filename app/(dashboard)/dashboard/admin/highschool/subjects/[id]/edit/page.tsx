import { GetSingleClassSubjects } from '@/app/actions/server.admin';
import { verifySession } from '@/lib/server.utils';
import React from 'react'
import UpdateClassSubject from '../../components/UpdateClassSubject';
import { BreadcrumbResponsive } from '@/components/Breadcrumb';
import { loginSessionKey } from '@/lib/definitions';

export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string }}) => {
   const id = params.id
   const session = await verifySession(loginSessionKey);
   const { error, success }: any = await new Promise((resolve) => resolve(GetSingleClassSubjects(id)));

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
            <BreadcrumbResponsive items={breadcrumbItems} itemsToDisplay={3} />
         </div>
         <div className="w-full bg-white shadow-lg rounded-md px-7 py-20">
            <UpdateClassSubject classSubject={success.classSubjects} token={session.token} />
         </div>
      </main>
   )
}

export default page