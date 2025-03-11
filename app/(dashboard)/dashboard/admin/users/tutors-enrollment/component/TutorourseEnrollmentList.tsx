"use client";

import { use, useEffect, useState } from "react";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Loader2, Table, Trash } from 'lucide-react';
import { FetchAllCourseEnrolledByTutor } from "@/app/actions/tutorEnrollment.api";
import useToken from "@/hook/useToken";
import { notify } from "@/contexts/ToastProvider";


const TutorourseEnrollmentList = ({ tutorId }: { tutorId: string }) => {
    const { token } = useToken();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        async function fetchData(token: string) {
            try {
                const { success, error } = await FetchAllCourseEnrolledByTutor(token);
                console.log("success.data", success.data);
                if (success.data) setCourses(success.data);
                if (error) {
                    console.error("Error fetching courses:", error);
                    notify({ message: 'Found No Course For THe Tutor!', variant: "warning", timeout: 5000 });
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        }
        if(token) fetchData(token);
    }, [tutorId, token]);



    useEffect(() => {
        const coursesForTutor = courses.filter((item: any) => item.tutor_id === tutorId);
        setFilteredCourses(coursesForTutor);
    }, [courses, tutorId]);

    if (loading) return <p className="flex items-center justify-center"><Loader2 className="animate-spin" /></p>;

    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-bold">Courses Enrolled</h2>
            {filteredCourses.length > 0 ?
                (<Table className="w-full text-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium p-1">Course Code</TableHead>
                            <TableHead className="p-1">Course Title</TableHead>
                            <TableHead className="p-1">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCourses.map((course: any) => (
                            <TableRow key={course.course_id}>
                                <TableCell className="font-medium p-1">{course.course_code}</TableCell>
                                <TableCell className="p-1">{course.course_title}</TableCell>
                                <TableCell className="p-1"><Trash className="mr-2 h-4 w-4" /> Delete</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)
                :
                (<p className="text-red-300 text-center text-lg">No Course Enrolled</p>)
            }
        </div>
    );
}

export default TutorourseEnrollmentList
