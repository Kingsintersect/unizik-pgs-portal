"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import { Loader2, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notify } from "@/contexts/ToastProvider";
import useToken from "@/hook/useToken";
import { baseUrl } from "@/config";
import { EnrollTutorToCourse, fetchCourses,fetchDepartments, fetchFaculties, fetchPrograms } from "@/app/actions/tutorEnrollment.api";

// Styled Components
const TabsContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 800px;
    margin: auto;
`;

const TabList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    padding: 10px;
    border-right: 2px solid #ddd;
`;

const Tab = styled.button<{ $active: boolean; $disabled: boolean }>`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    border: none;
    border-radius: 7px;
    background: ${({ $active }) => ($active ? "#007bff" : "transparent")};
    color: ${({ $active }) => ($active ? "#fff" : "#333")};
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
    text-align: left;
    width: 100%;
    transition: all 0.3s ease-in-out;
    font-size: 1.2rem;

    &:hover {
        background: ${({ $disabled }) => ($disabled ? "transparent" : "#0056b3")};
        color: ${({ $disabled }) => ($disabled ? "#333" : "#fff")};
    }
`;

const TabBullet = styled.div<{ $active: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? "#fff" : "#007bff")};
    transition: all 0.3s ease-in-out;
`;

const TabContent = styled.div`
    position: relative;
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button<{ disabled?: boolean }>`
    background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: ${({ disabled }) => (disabled ? "#ccc" : "#0056b3")};
    }
`;
const FlatButton = styled.button`
    color: #6c757d;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 10px;
    text-transform: uppercase;

    &:hover {
        border-bottom: 1px solid blue;
        color: #000;
        font-weight: bold;
    }
`;

const schema = z.object({
    program: z.string().min(1, "Program is required"),
    faculty: z.string().min(1, "Faculty is required"),
    department: z.string().min(1, "Department is required"),
    course: z.string().min(1, "Course is required"),
    review: z.union([z.string(), z.null()]),
});

type ProgramOption = { label: string; value: string };
type FormField = keyof typeof schema.shape; // "program" | "faculty" | "department" | "course"


const LOCAL_STORAGE_KEY = "tutorEnrollmentForm";
const STEP_STORAGE_KEY = "tutorEnrollmentStep";

interface TutorEnrollmentProps{
    userId: string;
}

const TutorEnrollment: React.FC<TutorEnrollmentProps> = ({ userId }) => {
    const basePath = `${baseUrl}/dashboard/admin/users/tutors-enrollment/${userId}/enrollment`;
    const router = useRouter();
    const { token } = useToken();
    const { control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            program: "",
            faculty: "",
            department: "",
            course: "",
            review: "",
        },
    });

    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== "undefined") {
            const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
            return savedStep !== null ? parseInt(savedStep, 10) : 0;
        }
        return 0;
    });
    const [reviewData, setReviewData] = useState({});
    const [programs, setPrograms] = useState<ProgramOption[]>([]);
    const [faculties, setFaculties] = useState<ProgramOption[]>([]);
    const [departments, setDepartments] = useState<ProgramOption[]>([]);
    const [courses, setCourses] = useState<ProgramOption[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            const savedStep = localStorage.getItem(STEP_STORAGE_KEY);

            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    Object.keys(parsedData).forEach((key) => {
                        setValue(key as FormField, parsedData[key]); 
                    });
                } catch (error) {
                    console.error("Failed to parse saved form data:", error);
                }
            }

            if (savedStep !== null) {
                const parsedStep = parseInt(savedStep, 10);
                if (!isNaN(parsedStep)) {
                    setActiveTab(parsedStep);
                }
            }

            setIsDataLoaded(true);
        }
    }, [setValue]);

    useEffect(() => {
        const subscription = watch((data) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        localStorage.setItem(STEP_STORAGE_KEY, activeTab.toString());
    }, [activeTab]);


    useEffect(() => {
        fetchPrograms().then((data) => {
            setPrograms(data);
        });
    }, []);

    const selectedProgram = watch("program");
    const selectedFaculty = watch("faculty");
    const selectedDepartment = watch("department");
    const selectedCourse = watch("course");

    useEffect(() => {
        if (selectedProgram) {
            fetchFaculties(selectedProgram).then((data) => {
                const options = data.map((item: any) => ({ value: String(item.id), label: item.faculty_name }));
                setFaculties(options)
            });
        }
    }, [selectedProgram]);

    useEffect(() => {
        if (selectedFaculty) {
            fetchDepartments(selectedFaculty).then((data) => {
                const options = data.map((item: any) => ({ value: String(item.id), label: item.department_name }));
                setDepartments(options)
            });
        }
    }, [selectedFaculty]);

    useEffect(() => {
        if (selectedDepartment) {
            fetchCourses(selectedProgram, selectedDepartment).then((data) => {
                const options = data.map((item: any) => ({ value: String(item.id), label: item.course_title }));
                setCourses(options)
            });
        }
    }, [selectedDepartment, selectedProgram]);

    const tabs: { title: string; field?: FormField; options?: ProgramOption[] }[] = [
        { title: "Program", field: "program", options: programs },
        { title: "Faculty", field: "faculty", options: faculties },
        { title: "Department", field: "department", options: departments },
        { title: "Course", field: "course", options: courses },
        { title: "Review & Submit", field: "review"},
    ];

    // const handleNext = async () => {
    //     const currentField = tabs[activeTab].field as FormField | undefined;
    //     console.log("currentField", currentField);
        
    //     if (currentField) {
    //         const isValid = await trigger(currentField); // Validate current step
    //         console.log("isValid", isValid);
    //         if (!isValid) return; // Prevent proceeding if invalid
    //     }

    //     if (activeTab === tabs.length - 2) {
    //         // If moving to "Review & Submit" step, store form data
    //         setReviewData(watch());
    //     }

    //     setActiveTab((prev) => prev + 1);
    // };
    const handleNext = () => {
        if (activeTab < tabs.length - 1) {
            setActiveTab(activeTab + 1);
        }
    };

    const handlePrev = () => {
        if (activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    const onSubmit = async (data: any) => {
        if (!userId) {
            notify({ message: 'Tutor Not Known!', variant: "error", timeout: 5000 });
            return;
        }
        const assignment = { ...data, tutor_id: userId };
        if (token){
            const { error, success }: any = await EnrollTutorToCourse(token, assignment);
            if (error) {
                notify({ message: 'Tutor Could Not Be Enrolled', variant: "error", timeout: 5000 });
                console.log('error', error)
                return;
            }
            if (success) {
                notify({ message: 'Tutor Successfully Enrolled', variant: "success", timeout: 5000 })
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                localStorage.removeItem(STEP_STORAGE_KEY);
                router.push(`${basePath}`)
                router.refresh();
            }
        } else {
            notify({ message: 'Token not found', variant: "error", timeout: 5000 });            
        }
    };

    if (!isDataLoaded) return <p><Loader2 className="animate-spin" /></p>;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}        
        >
            <TabsContainer>
                <TabList>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            $active={activeTab === index}
                            $disabled={index > activeTab}
                            onClick={() => index <= activeTab && setActiveTab(index)}
                        >
                            <TabBullet $active={activeTab === index}/>
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>

                <TabContent>
                    {activeTab === tabs.length - 1 ? (
                        <Table className="w-full text-sm">
                            <TableHeader>
                                <TableRow>
                                <TableHead className="font-medium p-1">Field</TableHead>
                                <TableHead className="p-1">Selection</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                <TableCell className="font-medium p-1">Program</TableCell>
                                <TableCell className="p-1">{selectedProgram || "Not selected"}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell className="font-medium p-1">Faculty</TableCell>
                                <TableCell className="p-1">{selectedFaculty || "Not selected"}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell className="font-medium p-1">Department</TableCell>
                                <TableCell className="p-1">{selectedDepartment || "Not selected"}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell className="font-medium p-1">Course</TableCell>
                                <TableCell className="p-1">{selectedCourse || "Not selected"}</TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                    ) : (
                        <Controller
                            name={tabs[activeTab].field as FormField}
                            control={control}
                            render={({ field }) => (
                            <FormGroup>
                                <Label>{tabs[activeTab].title}</Label>
                                <Select {...field}>
                                    <option value="">Select {tabs[activeTab].title}</option>
                                    {tabs[activeTab]?.options?.map(({ value, label }) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}

                                </Select>
                            </FormGroup>
                        )} />
                    )}

                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around">
                        {activeTab > 0 && (
                            <FlatButton type="button" onClick={handlePrev}>
                                Previous
                            </FlatButton>
                        )}
                        {activeTab < tabs.length - 1 ? (
                            <Button 
                                type="button" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    handleNext(); 
                                }}
                                disabled={!watch(tabs[activeTab].field as FormField)}
                            >
                                Next
                            </Button>

                        ) : (
                            <Button type="submit">Submit</Button>
                        )}
                    </div>
                </TabContent>
            </TabsContainer>
        </form>
    );
};

export default TutorEnrollment;
