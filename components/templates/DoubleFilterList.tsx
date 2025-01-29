'use client';
import { useEffect, useRef, useState } from 'react';

type Item = {
   value: string | number;
   label: string;
};
type SubItem = {
   // level: string,
   value: string | number,
}
type CourseAndGrade = {
   course: string,
   grade: string,
}

type FilterListProps = {
   name: string,
   label?: string
   mainItems: Item[];
   subItems: SubItem[];
};

export const DoubleFilterList = ({ mainItems, subItems, name, label }: FilterListProps) => {
   const mainList = useRef<HTMLUListElement>(null);
   const subList = useRef<HTMLUListElement>(null);
   const [query, setQuery] = useState('');
   const [visibility, setVisibility] = useState(false);
   const [subItemsVisibility, setSubItemsVisibility] = useState(false);
   const [filteredItems, setFilteredItems] = useState<Item[]>(mainItems);
   const [subItemsList, setSubitemsList] = useState<SubItem[]>(subItems);
   const [selectedValue, setSelectedValue] = useState('');


   useEffect(() => {
      const userCourseGrades = localStorage.getItem("uuid001");

      return () => {

      }
   }, [])




   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const userInput = e.target.value;
      setQuery(userInput);

      // Filter the items based on the user input
      const filtered = mainItems.filter(item =>
         item.label.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredItems(filtered);
   };

   const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setVisibility(!visibility);
   }
   const handleSelect = (e: any) => {
      const value = e.target.value;
      setSelectedValue(value);
      setSubItemsVisibility(!subItemsVisibility);
   }

   return (
      <div className="relative">
         {label && <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-400">{label}</label>}
         <input
            type="text"
            name={name}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
         />
         <ul ref={mainList} className={`${!visibility && ''} absolute z-10 w-full mb-20 border border-gray-300 bg-white rounded-md mt-1 max-h-60 overflow-y-auto`}>
            {filteredItems.length > 0 ? (
               filteredItems.map(item => (
                  <li onClick={handleSelect} key={item.value} className="px-4 py-2 hover:bg-gray-200 cursor-pointer relative">
                     {item.label}
                  </li>
               ))
            ) : (
               <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
         </ul>
         {/* sublist */}
         <ul ref={subList} className={`${!subItemsVisibility && 'hidden'} absolute left-[425px] top-[65px] z-50 w-[40%] border border-gray-300 bg-white rounded-md mt-1 max-h-60 overflow-y-auto`}>
            {subItemsList.length > 0 ? (
               subItemsList.map(item => (
                  <li key={item.value} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                     {item.value}
                  </li>
               ))
            ) : (
               <li className="px-4 py-2 text-gray-500">No results found</li>
            )}
         </ul>
      </div>
   );
};
