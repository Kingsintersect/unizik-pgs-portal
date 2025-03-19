import { GetStudentCourses } from '@/app/actions/server.admin';
import PhotoCard from '@/components/ui/cards/PhotoCard'
import { useUser } from '@/contexts/UserContext';
import useToken from '@/hook/useToken';
import React, { useEffect, useState } from 'react'

interface EnrolledCourseListProps {
    userId: string | number;
    userStudyLevel: string;
    url?: string;
}
const EnrolledCourseList: React.FC<EnrolledCourseListProps> = ({ userId, userStudyLevel, url }) => {
    const [EnrolledCourseList, setEnrolledCourseList] = useState<any[]>([]);
    const { token } = useToken();
    const {user} = useUser();
    const shortCode = userStudyLevel;
    
    useEffect(() => {
        if (!token || !shortCode) return;
        const controller = new AbortController();

        const fetchPrograms = async () => {
            try {
                console.log({ signal: controller.signal })
                const res = await GetStudentCourses(token, userId, shortCode);
                console.log("res.success.data", res.success.data);
                if (res?.success && res.success.data) {
                    setEnrolledCourseList(res.success.data);
                }
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error("Error fetching programs:", error);
                }
            }
        };

        fetchPrograms();

        return () => controller.abort();
    }, [token,userId, shortCode]);
    
    return (
        <>
            {EnrolledCourseList.length > 0
                ? <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center my-10">
                    {EnrolledCourseList.map((course, index) => (
                    <PhotoCard
                        key={index}
                        url={url}
                        image_url={course.image_url ?? "/course/opreating-systems.png"}
                        title={course.course_title}
                        code={course.course_code}
                        user={{
                            image_url: "/users/user3.jpg",
                            name: "Dr. John Doe",
                            email: "lecturer@emailcontact.com",
                            phone: "234 8123 456 789"
                        }}
                    />
                    ))}
                </div>
                : <div className='w-full grid-cols-1 justify-center items-center'>No courses enrolled</div>
            }
        </>
    )
}

export default EnrolledCourseList
