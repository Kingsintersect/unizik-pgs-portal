
"use client";

import cn from "@/lib/cn";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Label, TextInput } from "flowbite-react";

interface SearchProps {
   name: string;
   placeholder ?: string;
   classList?: string;
   className?: string;
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ name, placeholder, classList,className, value, onChange }: SearchProps) => {
   return (
      <div className={cn(`max-w-md`, classList)}>
         <TextInput
            id={name}
            type="text"
            rightIcon={MagnifyingGlassIcon}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
         />
      </div>
   );
}

export default Search