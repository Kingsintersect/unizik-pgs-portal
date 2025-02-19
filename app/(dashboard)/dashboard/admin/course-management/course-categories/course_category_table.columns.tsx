"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckboxColumn, DataTableColumnHeader } from "@/components/ui/datatable/DataTableColumnHeader";
import { ActionMenu } from "@/components/ui/datatable/ActionMenu";
import { UpdateSingleCourseCategory } from "@/app/actions/server.admin";
import { StatusCell } from "@/components/StatusToggle";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CourseCategoryTableColum = {
    id: string
    name: string
    status: 1 | 0
}

export const course_category_columns: ColumnDef<CourseCategoryTableColum>[] = [
    DataTableCheckboxColumn<CourseCategoryTableColum>(),
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
        cell: (props) => <StatusCell {...props} method={UpdateSingleCourseCategory} />,
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionMenu row={row.original} onCopy={(id) => navigator.clipboard.writeText(id)} />,
    },
]

