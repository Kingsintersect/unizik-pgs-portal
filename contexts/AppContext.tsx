"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppState = {
   user: StudentType;
   isAuthenticated: boolean;
   isPageLoading: boolean;
   passportUrl: string | null;
   firstSittingResultUrl: string | null;
   secondSittingResultUrl: string | null;
   firstSittingGrade: SittingCourse[];
   secondSittingGrade: SittingCourse[];
   examSittingState: boolean;
};

type AppContextType = {
   state: AppState;
   setUser: (newStudentData: Partial<StudentType>) => void;
   getUser: () => string;
   removeUser: () => void;
   setAuthentication: (status: boolean) => void;
   setIsPageLoading: (status: boolean) => void;
   setExamSittingState: (status: boolean) => void;
   setPassportUrl: (passportUrl: string) => void;
   setFirstSittingResultUrl: (firstSittingResultUrl: string) => void;
   setSecondSittingResultUrl: (secondSittingResultUrl: string) => void;
   setFirstSittingGrade: (grades: SittingCourse) => void;
   setSecondSittingGrade: (grades: SittingCourse) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
   children: ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
   const [state, setState] = useState<AppState>({
      user: {
         id: null,
         pictureRef: null,
         last_name: null,
         first_name: null,
         other_name: null,
         faculty_id: null,
         department_id: null,
         nationality: null,
         state: null,
         phone_number: null,
         email: null,
         password: null,
         reference: null,
         amount: null,
         reg_number: null,
         is_applied: 0,
         created_at: null,
         updated_at: null,
         deleted_at: null,
         role: "STUDENT",
         level: null,
         tuition_amount_paid: 0,
      },
      isPageLoading: false,
      isAuthenticated: false,
      passportUrl: null,
      firstSittingResultUrl: null,
      secondSittingResultUrl: null,
      firstSittingGrade: [],
      secondSittingGrade: [],
      examSittingState: false,
   });

   // Function to update user
   const setUser = (newStudentData: Partial<StudentType>) => {
      localStorage.setItem("user", JSON.stringify(newStudentData));
      setState((prevState) => ({
         ...prevState,
         user: { ...prevState.user, ...newStudentData },
      }));
   };
   const getUser = () => {
      const user = localStorage.getItem("user") || "";
      return JSON.parse(user);
   };
   const removeUser = () => {
      localStorage.removeItem("user");
   };

   // Function to update authentication status
   const setAuthentication = (status: boolean) => {
      setState((prev) => ({ ...prev, isAuthenticated: status }));
   };

   const setIsPageLoading = (status: boolean) => {
      setState((prev) => ({ ...prev, isAuthenticated: status }));
   };

   const setExamSittingState = (status: boolean) => {
      setState((prev) => ({ ...prev, examSittingState: status }));
   };

   const setPassportUrl = (passportUrl: string) => {
      setState((prev) => ({ ...prev, passportUrl }));
   }

   const setFirstSittingResultUrl = (firstSittingResultUrl: string) => {
      setState((prev) => ({ ...prev, firstSittingResultUrl }))
   }

   const setSecondSittingResultUrl = (secondSittingResultUrl: string) => {
      setState((prev) => ({ ...prev, secondSittingResultUrl }))
   }

   const setFirstSittingGrade = (course: SittingCourse) => {
      setState((prevState) => ({
         ...prevState,
         firstSittingGrade: [...prevState.firstSittingGrade, course],
      }));
   }

   const setSecondSittingGrade = (course: SittingCourse) => {
      setState((prevState) => ({
         ...prevState,
         secondSittingGrade: [...prevState.secondSittingGrade, course],
      }));
   }

   return (
      <AppContext.Provider value={{
         state,
         setUser,
         getUser,
         removeUser,
         setAuthentication,
         setIsPageLoading,
         setExamSittingState,
         setFirstSittingGrade,
         setSecondSittingGrade,
         setPassportUrl,
         setFirstSittingResultUrl,
         setSecondSittingResultUrl,
      }}>
         {children}
      </AppContext.Provider>
   );
};

// Hook to use the AppContext
export const useAppContext = () => {
   const context = useContext(AppContext);
   if (!context) {
      throw new Error('useAppContext must be used within AppProvider');
   }
   return context;
};
