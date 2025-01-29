import { remoteApiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";

export const applicationPurchase = async (studentData: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/purchase`,
      method: 'POST',
      data: { ...studentData },
   }) as any;
   return response;
}

export const verifyApplicationPurchase = async (transRef: string) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/verify-purchase?transRef=${transRef}`,
      method: 'GET',
   }) as any;
   return response;
}

export const accessAdmissionFormRequest = async (data: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/login`,
      method: 'POST',
      data: { ...data }
   }) as any;
   return response;
}

export const UploadPassport = async (formData: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/upload-passport`,
      method: 'POST',
      data: { ...formData },
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   }) as any;
   return response;
}

export const UploadQualification = async (formData: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/upload-qualification`,
      method: 'POST',
      data: { ...formData },
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   }) as any;
   return response;
}

export const UploadFirstSittingResult = async (formData: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/upload-first-sitting-result`,
      method: 'POST',
      data: { ...formData },
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   }) as any;
   return response;
}

export const UploadSecondSittingResult = async (formData: any) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/upload-second-sitting-result`,
      method: 'POST',
      data: { ...formData },
      headers: {
         'Content-Type': 'multipart/form-data',
      }
   }) as any;
   return response;
}

export async function PayAcceptanceFee(token: string, data: any) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/acceptance-fee-payment`,
      method: 'POST',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function VerifyAcceptanceFeePayment(token: string, ref: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/verify-acceptance?transRef=${ref}`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function PayTuitionFee(token: string, data: any) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/tuition-fee-payment`,
      method: 'POST',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export async function VerifyTuitionFeePayment(token: string, ref: string) {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/verify-tuition?transRef=${ref}`,
      method: 'GET',
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export const ApplyForAdmission = async (data: any, token: string) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/application/application-form`,
      method: 'POST',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export const CreateAccount = async (data: any, token: string) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/account/create-student`,
      method: 'POST',
      data: { ...data },
      headers: {
         Authorization: `Bearer ${token}`
      }
   }) as any;
   return response;
}

export const GetStudentStudyAccount = async (reg_number: string) => {
   const response = await apiCallerBeta({
      url: `${remoteApiUrl}/account/single-student?reg_number=${reg_number}`,
      method: 'GET',
   }) as any;
   return response;
}