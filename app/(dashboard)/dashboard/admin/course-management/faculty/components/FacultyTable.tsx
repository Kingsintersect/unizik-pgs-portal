"use client";

import { useEffect, useState } from "react";
import { GetListOfFaculties } from '@/app/actions/server.admin';
import { DataTable } from '@/components/ui/datatable/DataTable';
import { faculty_columns } from '../faculty_table.columns';
import Spinner from "@/components/ui/application/Spinner";

const FacultyTable = () => {
   const [faculties, setFaculties] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Function to fetch faculties
   const fetchFaculties = async () => {
      setLoading(true);
      setError(null); // Reset error state

      try {
         const { success, error } = await GetListOfFaculties();
         if (success) {
            const sortedData = success.data.sort((a: any, b: any) => b.id - a.id);
            setFaculties(sortedData);
         } else if (error) {
            setError(error.message || "Failed to fetch faculties");
         }
      } catch (err) {
         setError("An unexpected error occurred.");
      } finally {
         setLoading(false);
      }
   };

   // Fetch faculties on mount
   useEffect(() => {
      let isMounted = true;
         fetchFaculties().catch(console.error);
         return () => { isMounted = false; }; // Cleanup on unmount
      }, []);

      if (loading) return <div className="text-center flex items-center justify-center gap-5"><Spinner/>  <span>Loading faculties...</span></div>;
      if (error) return <p className="text-red-500 text-center">{error}</p>;

      return <DataTable columns={faculty_columns} data={faculties} />;
   };

export default FacultyTable;
