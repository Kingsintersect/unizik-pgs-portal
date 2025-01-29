"use client";

import { ApproveStudentAdmission } from "@/app/actions/admin";
import { GetSingleDepartment, GetSingleFaculty } from "@/app/actions/server.admin";
import { baseUrl } from "@/config";
import { notify } from "@/contexts/ToastProvider";
import useToken from "@/hook/useToken";
import { Button, List, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";

const GrantStudentAdmissionModal = ({ id, faculty_id, department_id }: { confirmHandler?: () => void, id: any, faculty_id: string | null, department_id: string | null }) => {
   const [openModal, setOpenModal] = useState(false);
   const [facultyData, setFacultyData] = useState<Faculty | null>(null)
   const [departmentData, setDepartmentData] = useState<Department | null>(null)
   const { token } = useToken();
   const router = useRouter();

   const handleApproval = async () => {
      setOpenModal(false)
      if (token) {
         const { error, success } = await ApproveStudentAdmission(token, { application_id: id, faculty_id: faculty_id, department_id: department_id, semester: "1SM" });
         if (error) {
            console.log('result.errors', error);
            notify({ message: "Their was an erorr trying to approve admission!", variant: "error", timeout: 5000 });
            return;
         }
         if (success) {
            notify({ message: "Student admission is confirmed", variant: "success", timeout: 5000 });
            router.push(`${baseUrl}/dashboard/admin/student-applications`);
            router.refresh();
            return;
         }
      } else {
         router.push(`${baseUrl}/auth/student`);
            router.refresh();
      }
   }

   const handleOpenModal = (state: boolean) => {
      setOpenModal(state)
   }

   useEffect(() => {
      const fetchData = async () => {
         if (token && department_id && faculty_id) {
            try {
               const [faculty, department] = await Promise.all([
                  GetSingleFaculty(token, faculty_id),
                  GetSingleDepartment(department_id, token),
               ]);
               setFacultyData(faculty.success.data);
               setDepartmentData(department.success.data);
            } catch (error) {
               console.error('Error fetching data:', error);
            }
         }
      };

      fetchData();
   }, [token, department_id, faculty_id]);



   return (
      <>
         <Button color={"success"} onClick={() => handleOpenModal(true)}>Approve Admission</Button>
         <Modal show={openModal} size="lg" onClose={() => handleOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
                  <h3 className="mb-5 text-lg font-normal text-green-500 dark:text-green-400">
                     Confirm Admission Approval
                  </h3>
                  <div className="w-full space-y-5 my-10 text-left">
                     <div className="flex flex-row gap-5">
                        <div className="w-32 font-bold text-lg text-orange-950">FACULTY: </div>
                        <div className="grow text-gray-700">{facultyData && facultyData.faculty_name}</div>
                     </div>
                     <div className="flex flex-row gap-5">
                        <div className="w-32 font-bold text-lg text-orange-950">DEPARTMENT: </div>
                        <div className="grow text-gray-700">{departmentData && departmentData.department_name}</div>
                     </div>
                     <div className="flex flex-row gap-5">
                        <div className="w-32 font-bold text-lg text-orange-950">SEMESTER: </div>
                        <div className="grow text-gray-700">{"1st Semester"}</div>
                     </div>
                  </div>
                  <hr />
                  <div className="flex justify-center gap-4 my-4">
                     <Button color="gray" onClick={() => handleOpenModal(false)}>
                        No, cancel
                     </Button>
                     <Button color="success" onClick={() => handleApproval()}>
                        {"Yes, I'm sure"}
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default GrantStudentAdmissionModal

