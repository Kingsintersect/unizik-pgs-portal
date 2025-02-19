"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckboxColumn, DataTableColumnHeader } from "@/components/ui/datatable/DataTableColumnHeader";
import { ActionMenu } from "@/components/ui/datatable/ActionMenu";
import { StatusCell } from "@/components/StatusToggle";
import { UpdateSingleDepartment } from "@/app/actions/server.admin";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DepartmentTableColum = {
    id: string
    name: string
    status: 1 | 0
}

export const department_columns: ColumnDef<Department>[] = [
    DataTableCheckboxColumn<Department>(),
    {
        accessorKey: "name",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
        ),
        // cell: (props) => <StatusCell {...props} method={UpdateSingleDepartment} />,
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionMenu row={row.original} onCopy={(id) => navigator.clipboard.writeText(id)} />,
    },
]
