"use client";
import { useAppContext } from "@/contexts/AppContext";
import StudentBanner from "./StudentBanner";
import { SkeletonCard } from "../application/suspence/CardSkeleton";
import PhotoCard from "../cards/PhotoCard";

type statusType = 1 | 0;
const StudentHome = () => {
   const { state } = useAppContext();
   const student = state.user;
   const lmsLink = "https://unizik-pg-lms.qverselearning.org/login/index.php";

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
               </div>
               <div className="w-full grid grid-cols-3 gap-4 items-center justify-center my-10">
                  <PhotoCard url={lmsLink} image_url={"/course/opreating-systems.png"} title={"Noteworthy technology acquisitions 2021"} code={"GST 101"} user={{
                     image_url: "/users/user3.jpg",
                     name: "Dr. John Doe",
                     email: "lecturer@emailcontact.com",
                     phone: "234 8123 456 789"
                  }}/>
                  <PhotoCard url={lmsLink} image_url={"/logo/logo.svg"} title={"Noteworthy technology acquisitions 2021"} code={"GST 101"} user={{
                     image_url: "/users/user3.jpg",
                     name: "Dr. John Doe",
                     email: "lecturer@emailcontact.com",
                     phone: "234 8123 456 789"
                  }}/>
                  <PhotoCard url={lmsLink} image_url={"/course/probability.png"} title={"Noteworthy technology acquisitions 2021"} code={"GST 101"} user={{
                     image_url: "/users/user3.jpg",
                     name: "Dr. John Doe",
                     email: "lecturer@emailcontact.com",
                     phone: "234 8123 456 789"
                  }}/>
               </div>
            </>
         }
      </>

   );
}

export default StudentHome
