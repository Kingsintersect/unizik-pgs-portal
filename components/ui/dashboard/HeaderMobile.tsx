"use client";
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

const sidebar = {
   open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
      transition: {
         type: "spring",
         stiffness: 20,
         restDelta: 2,
      },
   }),
   closed: {
      clipPath: "circle(0px at 100% 0",
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 40,
      }
   }
};

const variants = {
   open: {
      transition: { staggerChildren: 0.02, delayChildren: 0.15 },
   },
   closed: {
      transition: { staggerChildren: 0.01, staggerDirectin: -1 },
   },
};


const HeaderMobile = ({ MenuData }: { MenuData: SideNavItem[] }) => {
   const pathname = usePathname();
   const containerRef = useRef(null);
   const { height } = useDimensions(containerRef);
   const [isOpen, toggleOpen] = useCycle(false, true);

   return (
      <motion.nav
         initial={false}
         animate={isOpen ? "open" : "closed"}
         custom={height}
         className={`fixed inset-0 z-50 w-full md:hidden ${isOpen ? "" : "pointer-events-none"
            }`}
         ref={containerRef}
      >
         <motion.div
            className="absolute inset-0 right-0 w-full bg-white"
            variants={sidebar}
         />
         <motion.ul
            className="absolute grid w-full gap-1 px-10 py-16"
            variants={variants}
         >
            {MenuData.map((item, idx) => {
               const isLastItem = idx === MenuData.length - 1; //check if its the last item

               return (
                  <div className="" key={idx}>
                     {item.submenu ? (
                        <MenuItemWithSubmenu item={item} toggleOpen={toggleOpen} />
                     ) : (
                        <MenuItem>
                           <Link
                              href={item.path}
                              onClick={() => toggleOpen()}
                              className={`flex w-full text-base sm:text-lg text-left hover:bg-orange-100 hover:text-orange-800 p-2 ${item.path === pathname ? "font-bold bg-orange-100 text-orange-800" : ""
                                 }`}
                           >
                              {item.title}
                           </Link>
                        </MenuItem>
                     )}

                     {!isLastItem && (
                        <MenuItem className={`my-0 h-px w-full bg-gray-300`} />
                     )}
                  </div>
               )
            })}
         </motion.ul>
         <MenuToggle toggle={toggleOpen} />
      </motion.nav>
   )
}

export default HeaderMobile

const MenuToggle = ({ toggle }: { toggle: any }) => (
   <button
      onClick={toggle}
      className="pointer-events-auto absolute right-4 top-[14px] z-30"
   >
      <svg width={23} height={23} viewBox="0 0 23 23">
         <Path
            variants={{
               closed: { d: "M 2 2.5 L 20 2.5" },
               open: { d: "M 3 16.5 L 17 2.5" },
            }}
         />
         <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
               closed: { opacity: 1 },
               open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
         />
         <Path
            variants={{
               closed: { d: "M 2 16.346 L 20 16.346" },
               open: { d: "M 3 2.5 L 17 16.346" },
            }}
         />
      </svg>
   </button>
);
const Path = (props: any) => (
   <motion.path
      fill={"transparent"}
      strokeWidth={"2"}
      stroke={"hsl(0 0% 18%"}
      strokeLinecap={"round"}
      {...props}
   />
)

const MenuItemVariants = {
   open: {
      y: 0,
      opacity: 1,
      transition: {
         y: { stiffness: 1000, velocity: -100, }
      },
   },
   closed: {
      y: 50,
      opacity: 0,
      transition: {
         y: { stiffness: 1000, duration: 0.02, }
      },
   },
};
const MenuItem = ({
   className,
   children,
}: {
   className?: string,
   children?: ReactNode,
}) => {
   return (
      <motion.div variants={MenuItemVariants} className={className}>
         {children}
      </motion.div>
   );
};

const MenuItemWithSubmenu: React.FC<MenuItemWithSubmenuProps> = ({
   item,
   toggleOpen,
}) => {
   const pathname = usePathname();
   const [subMenuOpen, setSubMenuOpen] = useState(false);

   return (
      <>
         <MenuItem>
            <button
               className="flex w-full text-base sm:text-lg text-left hover:bg-orange-100 hover:text-orange-800 p-2"
               onClick={() => setSubMenuOpen(!subMenuOpen)}
            >
               <div className="flex flex-row justify-between w-full items-center">
                  <span className={`${pathname.includes(item.path) ? "font-bold" : ""}`}>
                     {item.title}
                  </span>
                  <div className={`${subMenuOpen && "rotate-180"}`}>
                     <ChevronDownIcon width={20} height={20} />
                  </div>
               </div>
            </button>
         </MenuItem>
         <div className="mt-2 ml-7 flex flex-col space-y-1">
            {subMenuOpen && (
               <>
                  {item.submenuItems?.map((subItem, subIdx) => {
                     return (
                        <MenuItem key={subIdx} className="my-1 py-1">
                           <Link
                              href={subItem.path}
                              onClick={() => toggleOpen()}
                              className={`hover:bg-orange-100 hover:text-orange-800 py-2 px-7 ${subItem.path === pathname ? "font-bold bg-orange-100 text-orange-800 p-2" : ""
                                 }`}
                           >
                              {subItem.title}
                           </Link>
                        </MenuItem>
                     );
                  })}
               </>
            )}
         </div>
      </>
   )
}

const useDimensions = (ref: any) => {
   const dimensions = useRef({ width: 0, height: 0 });

   useEffect(() => {
      if (ref.current) {
         dimensions.current.width = ref.current.offsetWidth;
         dimensions.current.height = ref.current.offsetHeight;
      }
   }, [ref]);

   return dimensions.current;
}