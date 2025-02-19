"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DataTableCheckboxColumn, DataTableColumnHeader } from "@/components/ui/datatable/DataTableColumnHeader";
import { ActionMenu } from "@/components/ui/datatable/ActionMenu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Grade = {
    id: string
    name: string
    status: "pending" | "processing" | "success" | "failed"
}

export const grade_columns: ColumnDef<Grade>[] = [
    DataTableCheckboxColumn<Grade>(),
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
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionMenu row={row.original} onCopy={(id) => navigator.clipboard.writeText(id)} />,
    },
]
