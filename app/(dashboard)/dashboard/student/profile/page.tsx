"use client";

import React, { useState } from "react";
import UploadAvatar from "../components/UploadAvatar";
import EditInfoForm from "../components/EditInfo";
import ChangePasswordForm from "../components/ChangePassword";
import { useUser } from "@/contexts/UserContext";

const StudentProfile = () => {
   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
   const {user, isLoading} = useUser();

   const student = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+123456789",
      avatar: "/avatar-placeholder.png",
   };

   return (
      <React.Fragment>
         {user &&
            <div className="max-w-5xl p-6 flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-1/3 bg-white shadow-md p-6 rounded-xl text-center space-y-4">
               <UploadAvatar imageUrl={student.avatar} />
               <h2 className="text-xl font-semibold">{user.first_name! + user.last_name}</h2>
               <button
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => setIsPasswordModalOpen(true)}
               >
                  Change Password
               </button>
            </aside>

            {/* Main Content */}
            <main className="lg:w-2/3 bg-white shadow-md p-6 rounded-xl">
               <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                  <EditInfoForm student={{ first_name: user.first_name as string, email:user.email as string, phone_number:user.phone_number as string}} />
            </main>

            {/* Password Change Modal */}
            <ChangePasswordForm
               isOpen={isPasswordModalOpen}
               onClose={() => setIsPasswordModalOpen(false)}
            />
            </div>
         }
         {isLoading && 
            <div className="max-w-5xl mx-auto p-6 flex flex-col lg:flex-row gap-6">
               Loading user details...
            </div>
         }
      </React.Fragment>
   );
};

export default StudentProfile;
// #FF0F76