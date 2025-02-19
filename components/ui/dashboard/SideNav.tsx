"use client";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import AppLogo from "../application/AppLogo";

// Import all icons as named exports
import * as Icons from "lucide-react";

// Define IconComponent type
import { ComponentType } from "react";
type IconComponent = ComponentType<React.SVGProps<SVGSVGElement>>;

const SideNav = ({ MenuData }: { MenuData: any }) => {
   return (
      <div className="md:w-64 bg-white text-[#23628d] h-screen flex-1 fixed overflow-y-auto border-r border-zinc-200 hidden md:flex">
         <div className="flex flex-col space-y-6 w-full">
            <div className="h-24 p-3">
               <AppLogo
                  image_url={"/logo/logo.png"}
                  url={"/"}
                  logo_text="PORTAL"
                  Img_container_style={"w-20 h-20"}
               />
            </div>

            <div className="flex flex-col space-y-2 md:px-3">
               {MenuData.map((item: SideNavItem, idx: React.Key) => (
                  <MenuItem key={idx} item={item} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
   const pathname = usePathname();
   const [subMenuOpen, setSubMenuOpen] = useState(false);
   const [IconComponent, setIconComponent] = useState<IconComponent | null>(null);

   // Load icon dynamically based on item.icon
   useEffect(() => {
      const iconName = item.icon ?? "Home";
      const LucideIcon = Icons[iconName as keyof typeof Icons] as IconComponent | undefined;

      if (LucideIcon) {
         setIconComponent(() => LucideIcon); // Ensure correct function component assignment
      } else {
         console.warn(`Icon "${iconName}" not found in lucide-react.`);
         setIconComponent(() => Icons.Home); // Default to Home icon
      }
   }, [item.icon]);


   const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
   };

   return (
      <div>
         {item.submenu ? (
            <>
               <button
                  onClick={toggleSubMenu}
                  className={`flex flex-row items-center p-2 rounded-lg hover:bg-orange-100 hover:text-orange-700 w-full justify-between ${
                     pathname.includes(item.path) ? "font-bold bg-orange-100 text-[#23628d]" : ""
                  }`}
               >
                  <div className="group flex flex-row space-x-4 items-center text-left">
                     {IconComponent && <IconComponent className="h-6 w-6 text-gray-500 group-hover:text-orange-800" />}
                     <span className="font-semibold text-left text-base flex">{item.title}</span>
                  </div>

                  <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                     <ChevronDownIcon width={20} height={20} className="font-bold" />
                  </div>
               </button>

               {subMenuOpen && (
                  <div className="my-2 ml-12 flex flex-col space-y-1">
                     {item.submenuItems?.map((subItem, subIdx) => (
                        <Link
                           key={subIdx}
                           href={subItem.path}
                           className={`hover:bg-orange-100 hover:text-orange-700 px-3 py-1 rounded-sm ${
                              subItem.path === pathname ? "font-bold bg-orange-100 text-[#23628d]" : ""
                           }`}
                        >
                           {subItem.title}
                        </Link>
                     ))}
                  </div>
               )}
            </>
         ) : (
            <Link
               href={item.path}
               className={`group flex text-left flex-row space-x-4 items-center p-2 rounded-lg hover:bg-orange-100 hover:text-orange-700 ${
                  item.path === pathname ? "bg-orange-100 text-orange-700" : ""
               }`}
            >
               {IconComponent && <IconComponent className="h-6 w-6 text-[#23628d] group-hover:text-orange-800" />}
               <span className="font-semibold text-left text-base flex">{item.title}</span>
            </Link>
         )}
      </div>
   );
};
