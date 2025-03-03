"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { FilePlus, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BulkUserUpload } from "@/app/actions/auth";
import { notify } from "@/contexts/ToastProvider";
import { baseUrl } from "@/config";
import { useRouter } from "next/navigation";
import useToken from "@/hook/useToken";

// Define expected structure of user data
type UserData = Record<string, string>;

// Form validation schema
const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "A valid file is required" })
    .refine((file) => ["text/csv", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].includes(file.type), {
      message: "Only CSV or Excel files are allowed",
    }),
});

export default function BulkUpload() {
  const basePath = `${baseUrl}/dashboard/admin/users`;
  const router = useRouter();
  const { token } = useToken();
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [fileData, setFileData] = useState<UserData[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<{ file: File }>({
    resolver: zodResolver(fileSchema),
  });

  // Handle file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue("file", file); // Update form state
    trigger("file"); // Trigger validation

    const fileType = file.type;

    if (fileType === "text/csv") {
      // Parse CSV file
      Papa.parse<UserData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => setFileData(results.data),
      });
    } else {
      // Read Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheetData: UserData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          setFileData(sheetData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle form submission
  const onSubmit = async (data: { file: File }) => {
    if (!token) {
      notify({ message: "No Access Token Found!", variant: "error", timeout: 5000 });
      return;
    }

    const formData = new FormData();
    formData.append("file", data.file);

    try {
      setUploadStatus("Uploading...");
      const { error, success }: any = await BulkUserUpload(token, formData);
      if (error) {
        console.error("Upload error:", error);
        setUploadStatus("Error occurred during upload.");
        notify({ message: "Failed to upload user document!", variant: "error", timeout: 5000 });
        return;
      }
      if (success) {
        setUploadStatus("Upload successful!");
        notify({ message: "Users uploaded successfully.", variant: "success", timeout: 5000 });
        router.push(basePath);
        router.refresh();
      }
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      notify({ message: "An unexpected error occurred.", variant: "error", timeout: 5000 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Bulk Upload Users</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Input */}
          <div className="border-dashed border-2 border-gray-300 p-6 mt-6 text-center bg-gray-100 rounded-lg">
            <input
              type="file"
              accept=".csv, .xlsx"
              {...register("file")}
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="text-gray-700 flex flex-col items-center cursor-pointer">
              <FilePlus size={40} className="text-gray-500" />
              <p className="text-gray-500 mt-2">Drag & drop or click to upload a CSV/Excel file</p>
            </label>
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          {/* Preview Uploaded Data */}
          {fileData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
              <div className="overflow-auto h-64 border border-gray-200 rounded-lg mt-2">
                <table className="w-full text-sm text-gray-600">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      {Object.keys(fileData[0] || {}).map((key) => (
                        <th key={key} className="px-4 py-2 border">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fileData.slice(0, 5).map((row, index) => (
                      <tr key={index} className="border-t">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-4 py-2 border">{String(value)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full rounded-sm flex items-center justify-center p-10 text-2xl"
            disabled={!isValid || isSubmitting}
          >
                <span>{"Upload Users"}</span>                
                {
                    (isSubmitting)
                    ? (<Loader2 fontSize={20} size={40} className="animate-spin text-lg" />)
                    : (<Upload fontSize={40} size={40} className="ml-3" />)                     
                }
            </Button>
        </form>
      </div>
    </div>
  );
}
