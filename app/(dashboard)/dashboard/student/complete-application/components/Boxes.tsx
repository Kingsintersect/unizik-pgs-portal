import { FC, useState } from "react";
import cn from "@/lib/cn";
import { useAppContext } from "@/contexts/AppContext";
import { notify } from "@/contexts/ToastProvider";
import { CompleteApplicationFormData, CompleteApplicationProps } from "@/app/(dashboard)/dashboard/student/complete-application/studentApplication.types";
import { FileInputFormField } from "@/components/ui/inputs/FormFields";

interface UploadFileBoxProps extends CompleteApplicationProps {
   fileKey: string,
   uploadMethod: (val: any) => any,
   label?: string,
   classList?: string,
}

export const UploadFileBox: FC<UploadFileBoxProps> = ({
   register,
   errors,
   fileKey,
   uploadMethod,
   label = "Upload file | document",
   classList,
}) => {
   const { setPassportUrl, setFirstSittingResultUrl, setSecondSittingResultUrl } = useAppContext()
   const [isLoading, setIsLoading] = useState(false);
   const [error, seterror] = useState('');
   const [pic, setPic] = useState('')

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         handleUpload(event.target.files[0]);
      }
   };

   const handleUpload = async (fileData: any) => {
      console.log('errors[fileKey]', errors[fileKey as keyof CompleteApplicationFormData])
      setIsLoading(true);
      const { success, error } = await uploadMethod({ [fileKey]: fileData });
      if (success) {
         setIsLoading(false);
         notify({ message: success.message, variant: "success", timeout: 5000 })
         if (fileKey === "passport") setPassportUrl(success.image_url);
         if (fileKey === "first_sitting_result") setFirstSittingResultUrl(success.image_url);
         if (fileKey === "second_sitting_result") setSecondSittingResultUrl(success.image_url);
         setPic(success.image_url);
      }
      if (error) {
         setIsLoading(false);
         notify({ message: 'Document Upload Faild. Try Again', variant: "error", timeout: 5000 });
         console.error('Error uploading file:', error);
      }
   };

   return (
      <div className={cn(`bg-gray-100`, classList)}>
         <FileInputFormField
            name={fileKey as keyof CompleteApplicationFormData}
            id={fileKey}
            register={register}
            error={errors[fileKey as keyof CompleteApplicationFormData]}
            onChange={handleFileChange}
            isLoading={isLoading}
            pictureRef={pic}
            title=""
            label={label}
         />
      </div>
   )
}
