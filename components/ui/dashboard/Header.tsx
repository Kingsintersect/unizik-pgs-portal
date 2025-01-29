"use client";
import useScroll from '@/hook/useScroll'
import cn from '@/lib/cn'
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react'
import AppLogo from '../application/AppLogo';
import { BellAlertIcon, UsersIcon } from '@heroicons/react/24/outline';
import { AppDropdown } from '../application/AppDropdown';
import LogoutButton from '../auth/Logout';
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
                  <AppLogo image_url={'/logo/logo3.jpeg'} url={'/'} logo_text='PORTAL' />
               </div>
            </div>

            <div className="hidden md:block">
               <ul className='flex items-center justify-end gap-5 z-40'>
                  <li className='cursor-pointer'>
                     <BellAlertIcon width={25} color='blue' />
                  </li>
                  <li className='cursor-pointer text-lg flex ems-center gap-2'>
                     <UsersIcon width={25} />
                     <AppDropdown classList='z-50' size={"lg"} label='' links={[
                        { menuText: "Settings", menuUrl: "/dashboard/settings" },
                        { menuText: "Profile", menuUrl: "/dashboard/profile" },
                        { menuText: "Sign Out", menuUrl: "/signout" },
                     ]} />
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