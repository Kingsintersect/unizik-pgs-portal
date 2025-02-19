"use client";
import useScroll from '@/hook/useScroll'
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react'
import AppLogo from '../application/AppLogo';
import { LucideBellDot, UsersIcon } from 'lucide-react';
import LogoutButton from '../auth/Logout';
import DropDownMenu from '@/components/DropDownMenu';
import { cn } from '@/lib/utils';

const Header = () => {
   const scrolled = useScroll(5);
   const selectedLayout = useSelectedLayoutSegment();
   return (
      <div className={cn(
         `sticky z-50 inset-x-0 top-0 w-full transition-all border-b border-gray-200`,
         {
            "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
            "border-b border-gray-200 bg-white": selectedLayout,
         }
      )}>
         <div className="flex h-[47px] items-center justify-between px-4">
            <div className="flex items-center spax-4
            ">
               <div className="md:hidden">
                  <AppLogo image_url={'/logo/logo.png'} url={'/'} logo_text='PORTAL' />
               </div>
            </div>

            <div className="hidden md:block">
               <ul className='flex items-center justify-end gap-5 z-40'>
                  <li className='cursor-pointer'>
                     <LucideBellDot width={25} color='blue' />
                  </li>
                  <li className='cursor-pointer text-lg flex ems-center gap-2'>
                     <UsersIcon width={25} />
                     <DropDownMenu
                        menu={[
                           { title: "Settings", url: "/dashboard/settings", condition: 'ACTIVE' as 'ACTIVE', },
                           { title: "Profile", url: "/dashboard/profile", condition: 'ACTIVE' as 'ACTIVE', },
                           { title: "Sign Out", url: "/signout", condition: 'ACTIVE' as 'ACTIVE', },
                        ]}
                        variant="CHECKBOX"
                        title={''}
                        menuLabel={''}
                     />
                     {/* <AppDropdown classList='z-50' size={"lg"} label='' links={[
                        { menuText: "Settings", menuUrl: "/dashboard/settings" },
                        { menuText: "Profile", menuUrl: "/dashboard/profile" },
                        { menuText: "Sign Out", menuUrl: "/signout" },
                     ]} /> */}
                  </li>
                  <li className='cursor-pointer'>
                     <LogoutButton width={25} color='red' />
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Header