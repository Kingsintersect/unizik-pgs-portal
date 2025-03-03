"use client";
import PhotoCard from '@/components/ui/cards/PhotoCard';
import StudentBanner from './components/StudentBanner';
import { SkeletonCard } from '@/components/ui/application/suspence/CardSkeleton';
import { useUser } from '@/contexts/UserContext';

const StudentDashboard = () => {
   const { user, isLoading } = useUser();
   const student = user;
   const lmsLink = `https://unizik-pg-lms.qverselearning.org/ssotester/index.php?sso_loggers=1&u=${student?.username}&password=1`;

   return (
      <>
         {(isLoading) ?
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

export default StudentDashboard