"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z, ZodType } from 'zod';
import { notify } from '@/contexts/ToastProvider';
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { CreateNewCourseAssignment, GetCoursesAssignedToACategory } from '@/app/actions/server.admin';
import { Button } from '@/components/ui/button';
import { SelectFormField } from '@/components/ui/inputs/FormFields';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Row {
   course: string;
   course_id: number;
   credit_load: number;
}

interface Course {
   id: string;
   course_code: string;
   course_title: string;
   credit_load: number;
}

interface CourseCategory {
   id: string;
   shortCode: string;
}

interface CreateCourseAssignmentProps {
   basePath: string;
   token: string;
   courses: Course[];
   courseCategory: CourseCategory[];
}

const CreateCourseAssignment = ({
   basePath,
   token,
   courses,
   courseCategory,
}: CreateCourseAssignmentProps) => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<CourseAssignmentFormData>({ resolver: zodResolver(CreateCourseAssignmentSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const [selectedCourse, setSelectedCourse] = useState('');
   const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
   const [credit_load, setCreditLoad] = useState<string>('');
   const [rows, setRows] = useState<Row[]>([]);
   const [availableCourses, setAvailableCourses] = useState<Course[]>(courses || []);
   const [assignmentErrors, setAssignmentErrors] = useState<{ course: string; credit_load: string }>({ course: '', credit_load: '' });
   const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);


   // COURSE ASSIGNMENT
   const handleCategoryCourseChange = async (courseCategoryId: string) => {
      if (!courseCategoryId) return;

      try {
         const { error, success }: any = await GetCoursesAssignedToACategory(courseCategoryId, token);
         if (error) {
            console.error("Error fetching courses:", error);
            return;
         }

         const fetchedCourses = success.data.map((course: any) => ({
            id: course.id,
            course_code: course.course_code,
            course_title: course.course_title,
            credit_load: course.credit_load,
         }));
         resetRowsAndAvailableCourses(fetchedCourses)
      } catch (error) {
         console.error("An unexpected error occurred:", error);
      }
   };

   const resetRowsAndAvailableCourses = (newData: any[]) => {
      setRows([]);

      setAvailableCourses(newData);
      setRows((prevRows) => [
         ...prevRows,
         ...newData.map((course: any) => ({
            course: course.course_code,
            course_id: course.id,
            credit_load: course.credit_load,
         })),
      ]);
      setSelectedCourse("");
      setSelectedCourseId(null);
      setCreditLoad("");
   }

   const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = e.target.selectedOptions[0];
      const courseId = selectedOption?.dataset.id;
      setSelectedCourse(e.target.value);
      setSelectedCourseId(Number(courseId));
      setAssignmentErrors((prev) => ({ ...prev, course: '' }));
   };

   const handleCreditLoadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreditLoad(e.target.value);
      setAssignmentErrors((prev) => ({ ...prev, credit_load: '' }));
   };

   const handleAddRow = () => {
      if (!IsCourseAndCreditLoadValid()) return

      const newRow: Row = { course: selectedCourse, course_id: selectedCourseId!, credit_load: Number(credit_load) };
      const updatedRows = [...rows, newRow];
      setRows(updatedRows);

      const updatedAvailableCourses = availableCourses.filter(course => course.course_code !== selectedCourse);
      setAvailableCourses(updatedAvailableCourses);

      setSelectedCourse('');
      setSelectedCourseId(null);
      setCreditLoad('');
   };

   const handleEditRow = (index: number) => {
      const rowToEdit = rows[index];
      setSelectedCourse(rowToEdit.course);
      setSelectedCourseId(rowToEdit.course_id);
      setCreditLoad(rowToEdit.credit_load.toString());
      setEditingRowIndex(index);

      setAvailableCourses((prevCourses) => [
         ...prevCourses,
         {
            id: `temp-${rowToEdit.course}`,
            course_code: rowToEdit.course,
            course_title: courses.find((course) => course.course_code === rowToEdit.course)?.course_title || "",
            credit_load: rowToEdit.credit_load,
         },
      ]);
   };

   const handleSaveRow = () => {
      if (!IsCourseAndCreditLoadValid()) return
      if (editingRowIndex === null) return;

      const updatedRows = [...rows];
      updatedRows[editingRowIndex] = { course: selectedCourse, course_id: selectedCourseId!, credit_load: Number(credit_load) };
      setRows(updatedRows);

      const updatedAvailableCourses = [
         ...availableCourses.filter(course => course.course_code !== selectedCourse),
      ];
      setAvailableCourses(updatedAvailableCourses);

      setEditingRowIndex(null);
      setSelectedCourse('');
      setSelectedCourseId(null);
      setCreditLoad('');
   };

   const handleDeleteRow = (index: number) => {
      const deletedRow = rows[index];
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);

      const updatedAvailableCourses = [
         ...availableCourses,
         courses.find(course => course.course_code === deletedRow.course)!
      ];
      setAvailableCourses(updatedAvailableCourses);

      if (selectedCourse === deletedRow.course) {
         setSelectedCourse('');
         setSelectedCourseId(null);
         setCreditLoad('');
      }

      setEditingRowIndex(null);
      setSelectedCourse('');
      setSelectedCourseId(null);
      setCreditLoad('');
   };

   const IsCourseAndCreditLoadValid = () => {
      let status = true;
      if (!selectedCourse) {
         setAssignmentErrors((prev) => ({ ...prev, course: 'Please select a course' }));
         status = false;
      }
      if (!credit_load || isNaN(Number(credit_load)) || Number(credit_load) === 0) {
         setAssignmentErrors((prev) => ({ ...prev, credit_load: 'Enter a valid credit load number' }));
         status = false;
      }
      return status
   }

   const filterAvailableCourses = useCallback(() => {
      let availableCourseCodes = rows.map(row => row.course);
      setAvailableCourses(courses.filter(course => !availableCourseCodes.includes(course.course_code)));
   }, [rows, courses]); 

   useEffect(() => {
      filterAvailableCourses();
   }, [filterAvailableCourses]);

   const onSubmit: SubmitHandler<CourseAssignmentFormData> = async (data) => {
      if (rows.length === 0) {
         console.error("No rows to submit");
         return;
      }

      const payload = rows.map(row => ({
         course_code: row.course,
         course_id: row.course_id,
         credit_load: row.credit_load,
      }));

      data['assignments'] = payload;
      setIsLoading(true);
      const { error, success }: any = await CreateNewCourseAssignment(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Course assignment could not be completed! Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Courses has been assigned Successful.', variant: "success", timeout: 5000 })
         router.push(`${basePath}`)
            router.refresh();
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)} className='block space-y-10'>
            <SelectFormField<CourseAssignmentFormData>
               name="course_category_id"
               placeholder={"Select the Course category"}
               control={control}
               options={courseCategory.map((cat: any) => ({ value: String(cat.id), label: cat.short_code }))}
               error={errors.course_category_id}
               onValueSelect={handleCategoryCourseChange}
            />

            <div className="w-full overflow-x-auto">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>COURSE CODE</TableHead>
                        <TableHead>CREDIT UNIT</TableHead>
                        <TableHead>ACTIONS</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {Array.isArray(rows) && rows.map((row, index) => (
                        <TableRow key={index}>
                           <TableCell>{row.course}</TableCell>
                           <TableCell>{row.credit_load}</TableCell>
                           <TableCell className='flex flex-1 gap-5 text-lg'>
                              <Button type="button" onClick={() => handleEditRow(index)} className='font-semibold' variant={'primary'}>Edit</Button>
                              <span className="font-bold">|</span>
                              <Button type="button" onClick={() => handleDeleteRow(index)} className='font-semibold ' variant={'destructive'}>Delete</Button>
                           </TableCell>
                        </TableRow>
                     ))}
                     <TableRow>
                        <TableCell>
                           <select value={selectedCourse} onChange={handleCourseChange}>
                              <option value="">Select Course</option>
                              {availableCourses && availableCourses.map((course) => (
                                 <option key={course.id} data-id={course.id} value={course.course_code}>{course.course_code}</option>
                              ))}
                           </select>
                           {assignmentErrors.course && <div className="text-red-500">{assignmentErrors.course}</div>}
                        </TableCell>
                        <TableCell>
                           <input
                              type="text"
                              value={credit_load}
                              onChange={handleCreditLoadChange}
                              placeholder="Enter Credit Load"
                           />
                           {assignmentErrors.credit_load && <div className="text-red-500">{assignmentErrors.credit_load}</div>}
                        </TableCell>
                        <TableCell className='flex flex-1 gap-5 text-lg'>
                           {editingRowIndex !== null ? (
                              <button type="button" onClick={handleSaveRow} className='rounded-lg border-2 border-orange-400 px-5 py-1 bg-orange-50 font-semibold'>Save</button>
                           ) : (
                              <button type="button" onClick={handleAddRow} className='rounded-lg border-2 border-green-400 px-5 py-1 bg-green-50 font-semibold'>Add</button>
                           )}
                        </TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </div>
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Course Assignment
                  {
                     (isLoading)
                     ? (<Loader2 className="animate-spin" />)
                     : (<ArrowRightIcon className="ml-2 h-5 w-5" />)                     
                  }
               </Button>
            </div>
         </form>
      </div>
   );
};

export default CreateCourseAssignment;


type CourseAssignmentFormData = {
   course_category_id: string,
   assignments?: Array<{ course_code: string, course_id: number, credit_load: number }>
};
export const CreateCourseAssignmentSchema: ZodType<CourseAssignmentFormData> = z
   .object({
      course_category_id: z.string().min(1, "Faculty is required"),
      assignments: z
         .array(
            z.object({
               course_id: z.number({ required_error: "Credit Load is required" }),
               course_code: z.string({ required_error: "Course is required" }),
               credit_load: z.number({ required_error: "Credit Load is required" }),
            })
         )
         .optional(),
   });
