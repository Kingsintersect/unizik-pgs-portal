'use client';
import React from 'react';
import { exportToExcel } from '@/lib/utils/exportUtils';
import DropDownMenu from './DropDownMenu';
import { Roles } from '@/app/(dashboard)/dashboard/admin/users/users.types';

interface ExportDropdownProps {
   data: any[];
   columns?: string[]; // Accepts custom column fields
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({ data, columns }) => {
   const handleExport = (type: 'all' | 'students' | 'teachers' | 'managers' ) => {
      switch (type) {
         case 'all':
            exportToExcel(
               data,
               'all_users',
               columns,
            );
            break;
         case 'students':
            exportToExcel(
               data.filter((users: any) => users.role === Roles.STUDENT),
               'students',
               columns,
            );
            break;
         case 'teachers':
            exportToExcel(
               data.filter((users: any) => users.role === Roles.TEACHER),
               'teachers',
               columns,
            );
            break;
         case 'managers':
            exportToExcel(
               data.filter((users: any) => users.role === Roles.MANAGER),
               'managers',
               columns,
            );
            break;
         default:
            break;
      }
   };

   const menuItems = [
      { title: 'Export All Users', condition: 'ACTIVE' as 'ACTIVE', checked: false, onClick: () => handleExport('all') },
      { title: 'Export All Students', condition: 'ACTIVE' as 'ACTIVE', checked: false, onClick: () => handleExport('students') },
      { title: 'Export All Teachers', condition: 'ACTIVE' as 'ACTIVE', checked: false, onClick: () => handleExport('teachers') },
      { title: 'Export All Managers', condition: 'ACTIVE' as 'ACTIVE', checked: false, onClick: () => handleExport('managers') },
   ]

   return (
      <>
         <DropDownMenu
            menu={menuItems}
            variant="RADIO"
            title={'Exoprt User Data'}
            menuLabel={''}
         />
      </>
   );
};

export default ExportDropdown;
