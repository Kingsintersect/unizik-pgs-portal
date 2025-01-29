"use client";
import { useAppContext } from "@/contexts/AppContext";
import { AdmissionStatus, StatusCheckCaard, } from "./Status";
import StudentBanner from "./StudentBanner";
import { SkeletonCard } from "../application/suspence/CardSkeleton";

type statusType = 1 | 0;
const StudentHome = () => {
   const { state } = useAppContext();
   const student = state.student;


   return (
      <>
         {(!student) ?
            <>
               <div className="flex items-center justify-center w-full h-[500px]">
                  <SkeletonCard />
               </div>
            </>
            :
            <>
               <div className=" text-gray-600">
                  <StudentBanner student={student} />
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                     <StatusCheckCaard admission={student.admission_status} url="/admission/application/payment" dataStatus={student.application_payment_status as statusType} title={"Application Fee"} />
                     <AdmissionStatus admissionStatus={student.admission_status} />
                     <StatusCheckCaard admission={student.admission_status} url="/dashboard/student/acceptance" dataStatus={student.accpetance_fee_payment_status as statusType} title={"Acceptance Fee"} />
                     <StatusCheckCaard admission={student.admission_status} url="/dashboard/student/tuition" dataStatus={student.tuition_payment_status as statusType} title={"Tuition Fee"} />
                  </div>
               </div>
            </>
         }
      </>

   );
}

export default StudentHome
