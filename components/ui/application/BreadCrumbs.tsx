
import clsx from "clsx";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import Link from "next/link";
import { HiHome } from "react-icons/hi";

interface Breadcrumb {
   label: string;
   href: string;
   active?: boolean;
}

export function Breadcrumbs({
   breadcrumbs,
}: {
   breadcrumbs: Breadcrumb[];
}) {
   return (
      <Breadcrumb aria-label="Solid background breadcrumb example" className="bg-gray-50 px-5 py-3 dark:bg-gray-800">
         <BreadcrumbItem icon={HiHome}></BreadcrumbItem>
         {breadcrumbs.map((breadcrumb: any, i: any) => (
            <BreadcrumbItem
               key={i}
               href={breadcrumb.href}
               aria-current={breadcrumb.active}
               className={clsx(
                  breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
               )}
            >
               {breadcrumb.label}
            </BreadcrumbItem>
         ))}
      </Breadcrumb>
   );
}
