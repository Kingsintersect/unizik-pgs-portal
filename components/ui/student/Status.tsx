"use client";
import CustomCard from '@/components/CustomCard';
import { CheckCircle, CircleHelp, XCircle } from "lucide-react";

type AdmissionStatusType = 'admitted' | 'pending' | 'not admitted';

export function AdmissionStatus({ admissionStatus }: { admissionStatus: AdmissionStatusType }) {
   const status = admissionStatusConfig[admissionStatus];
   return (
      <CustomCard>
         <div className="grid grid-cols-1">
            <div className="text-lg MB-5">ADMISSION</div>
            {status && (
               <>
                  <div className="flex justify-center">
                     <status.icon className={`h-14 w-14 ${status.iconColor}`} />
                  </div>
                  <span className={`${status.textColor} text-2xl`}>{status.message}</span>
               </>
            )}
         </div>
      </CustomCard>
   )
}

type statusType = 1 | 0;
export function StatusCheckCaard({ dataStatus, admission, title, url = "#" }: { dataStatus: statusType, admission: AdmissionStatusType, title: string, url?: string }) {
   const status = statusConfig[dataStatus];
   return (
      <CustomCard>
         <a href={`${(admission === "admitted" && dataStatus == 0) ? url : "#"}`}>
            <div className="grid grid-cols-1">
               <div className="text-lg MB-5">{title}</div>
               {status && (
                  <>
                     <div className="flex justify-center">
                        <status.icon className={`h-14 w-14 ${status.iconColor}`} />
                     </div>
                     <span className={`${status.textColor} text-2xl`}>{status.message}</span>
                  </>
               )}
            </div>
         </a>
      </CustomCard>
   )
}


const statusConfig = {
   1: {
      iconColor: "text-green-400 dark:text-green-200",
      textColor: "text-green-500",
      message: "Paid",
      icon: CheckCircle,
   },
   0: {
      iconColor: "text-red-400 dark:text-red-200",
      textColor: "text-red-500",
      message: "Not Paid",
      icon: XCircle
   }
}

const admissionStatusConfig = {
   admitted: {
      iconColor: "text-green-400 dark:text-green-200",
      textColor: "text-green-500",
      message: "Admission Granted",
      icon: CheckCircle,
   },
   pending: {
      iconColor: "text-cyan-400 dark:text-cyan-200",
      textColor: "text-gray-500",
      message: "Admission Pending",
      icon: CircleHelp
   },
   "not admitted": {
      iconColor: "text-red-400 dark:text-red-200",
      textColor: "text-red-500",
      message: "Admission Pending",
      icon: XCircle
   }
};