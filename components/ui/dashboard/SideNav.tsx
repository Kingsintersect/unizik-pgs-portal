"use client";
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import AppLogo from '../application/AppLogo';

import { ComponentType } from "react";

type IconComponent = ComponentType<React.SVGProps<SVGSVGElement>>;

const loadIcon = (iconName: string): Promise<{ default: IconComponent }> => {
   return import(`@heroicons/react/24/outline`).then((module) => ({
      default: module[iconName as keyof typeof module] as IconComponent,
   }));
};

const SideNav = ({ MenuData }: { MenuData: any }) => {
   return (
      <div className='md:w-64 bg-white h-screen flex-1 fixed overflow-y-auto border-r border-zinc-200 hidden md:flex'>
         <div className="flex flex-col space-y-6 w-full">
            <div className="h-24 p-3">
               <AppLogo image_url={'/logo/logo3.jpeg'} url={'/'} logo_text='PORTAL' Img_container_style={"w-20 h-20"} />
            </div>

            <div className="flex flex-col space-y-2 md:px-3">
               {MenuData.map((item: SideNavItem, idx: React.Key | null | undefined) => {
                  const IconComponent = React.lazy(() => loadIcon(item.icon ?? "HomeIcon"));// Use lazy loading for dynamic imports
                  return <MenuItem key={idx} item={item} IconComponent={IconComponent} />
               })}
            </div>
         </div>
      </div>
   )
}

export default SideNav

const MenuItem = ({ item, IconComponent }: { item: SideNavItem, IconComponent: any }) => {
   const pathname = usePathname();
   const [subMenuOpen, setSubMenuOpen] = useState(false);
   const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
   };

   return (
      <div className="">
         {item.submenu ? (
            <>
               <button
                  onClick={toggleSubMenu}
                  className={`flex flex-row items-center p-2 rounded-lg hover:bg-orange-100 hover:text-orange-700 w-full justify-between ${pathname.includes(item.path) ? "font-bold bg-orange-100 text-orange-700" : ""
                     }`}
               >
                  <div className="group flex flex-row space-x-4 items-center text-left">
                     <Suspense fallback={<div className="h-6 w-6 bg-gray-300" />}>
                        <IconComponent className="h-6 w-6 text-gray-500 group-hover:text-orange-800" />
                     </Suspense>
                     <span className="font-semibold text-left text-base flex ">{item.title}</span>
                  </div>

                  <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                     <ChevronDownIcon width={20} height={20} className='font-bold' fontSize={100} fontWeight={"bold"} />
                  </div>
               </button>

               {subMenuOpen && (
                  <div className="my-2 ml-12 flex flex-col space-y-1">
                     {item.submenuItems?.map((subItem, subIdx) => {
                        return (
                           <Link
                              key={subIdx}
                              href={subItem.path}
                              className={`hover:bg-orange-100 hover:text-orange-700 px-3 py-1 rounded-sm ${subItem.path === pathname ? "font-bold bg-orange-100 text-orange-700" : ""
                                 }`}
                           >
                              <span className="">{subItem.title}</span>
                           </Link>
                        );
                     })}
                  </div>
               )}
            </>
         ) : (
            <Link
               href={item.path}
               className={`group flex text-left flex-row space-x-4 items-center p-2 rounded-lg hover:bg-orange-100 hover:text-orange-700 ${item.path === pathname ? "bg-orange-100 text-orange-700" : ""
                  }`}
            >
               <Suspense fallback={<div className="h-6 w-6 bg-gray-300" />}>
                  <IconComponent className="h-6 w-6 text-gray-500 group-hover:text-orange-800" />
               </Suspense>
               <span className="font-semibold text-left text-base flex">{item.title}</span>
            </Link>
         )}
      </div>
   )
}