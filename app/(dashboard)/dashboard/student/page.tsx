"use client";
import PhotoCard from '@/components/ui/cards/PhotoCard';
import StudentBanner from './components/StudentBanner';
import { SkeletonCard } from '@/components/ui/application/suspence/CardSkeleton';
import { useUser } from '@/contexts/UserContext';
import EnrolledCourseList from './components/EnrolledCourseList';

const StudentDashboard = () => {
   const { user, isLoading } = useUser();

   if (isLoading || !user) {
      return (
         <div className="flex items-center justify-center w-full h-[500px]">
            <SkeletonCard />
         </div>
      );
   }

   const lmsLink = user.username
      ? `https://unizik-pg-lms.qverselearning.org/ssotester/index.php?sso_loggers=1&u=${user.username}&password=1`
      : "#";

   return (
      <div className="text-gray-600">
         <StudentBanner student={user} />
         <EnrolledCourseList
            url={lmsLink}
            userStudyLevel={user.level ?? ''}
         />
      </div>
   );
};

export default StudentDashboard;
