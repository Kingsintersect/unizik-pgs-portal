
import { LinkMetadata } from "@/config";
import cn from "@/lib/cn";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";

export const AppDropdown: React.FC<{ links: Array<LinkMetadata>, label: string, size?: string, classList?: string }> = ({ links, label, size, classList }) => {
   return (
      <Dropdown label={label} inline size={size} className={cn(``, classList)}>
         {links && links.map((link: any, index: any) => (
            <Link key={index} href={link.menuUrl}>
               <DropdownItem>
                  {(link.menuText === "Edit")
                     ? <PencilIcon className="w-5" />
                     : link.menuText === "Delete"
                        ? <TrashIcon className="w-5" /> : ""
                  }
                  {link.menuText}
               </DropdownItem>
            </Link>
         ))}
      </Dropdown>
   );
}
