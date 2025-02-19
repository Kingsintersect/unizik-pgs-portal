"use client";

import SwitchToggle from "@/components/ui/inputs/SwitchToggle";
import React, { useState } from "react";
import useToken from "@/hook/useToken";
import { useSession } from "@/hook/useSession";
import { notify } from "@/contexts/ToastProvider";

interface StatusToggleProps {
    id: string;
    status: 1 | 0;
    method: (id: string, token:string, status:{ status: 1 | 0}) => Promise<{ success: boolean, error?: string }>;
}

// ✅ Separate FacultyStatusToggle component
export const StatusToggle: React.FC<StatusToggleProps> = ({ id, status, method }) => {
    const [isChecked, setIsChecked] = useState(status === 1);
    const {token} = useToken();

    const toggleStatus = async () => {
        const newStatus = isChecked ? 0 : 1; // Toggle status
        setIsChecked(!isChecked);

        if (token) {
            try {
                const response = await method(id, token, { status: newStatus }); // Update in DB
                const { error, success } = response;
                if (success) {
                    notify({ message: 'Status Updated!', variant: "success", timeout: 5000 })
                }
                if (error) {
                    notify({ message: 'Status Updated Faild!', variant: "error", timeout: 5000 })
                }
            } catch (error) {
                console.error("Error updating status:", error);
                setIsChecked(isChecked); // Revert on failure
            }
        }
        
    };

    return (
        <SwitchToggle
            classList="mx-auto"
            checked={isChecked}
            onChange={toggleStatus}
            label=""
            name="status"
        />
    );
};


// Extract session fetching logic into a separate React component
export const StatusCell: React.FC<{ row: { original: { id: string; status: 1 | 0 } }, method:any }> = ({ row, method }) => {
    const { session, loading } = useSession(); // Use the reusable hook

    if (loading) return <span>Loading...</span>;
    if (!session) return <span>Error fetching session</span>;

    return (
        <StatusToggle
            id={row.original.id}
            status={row.original.status}
            method={method}
        />
    );
};