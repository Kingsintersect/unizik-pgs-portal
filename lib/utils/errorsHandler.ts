import { status } from "nprogress";

export function handleHttpError(error: any, message = "", requestType = ""): object {
   const msg = (typeof error.response?.data === 'object'
      ? error.response.data
      : { message: error.message });

   if (error.response) {
      console.error(`${requestType} failed: Server responded with status ${error.response.status}`);
      return { success: false, message: msg || `${message}`, status: "failed" };
   } else if (error.request) {
      // The request was made, but no response received
      console.error(`${requestType} failed: No response from server. Please check your connection.`);
      return { success: false, message: 'No response from server. Please check your connection.' };
   } else {
      // Something happened in setting up the request
      console.error(`${requestType} failed: Something went wrong while sending the request.`);
      return { success: false, message: 'Something went wrong while sending the request.' };
   }
}

export function displayErrors(errorObject: any) {
   let errorMsg: string[] = [];
   for (const field in errorObject) {
      if (errorObject.hasOwnProperty(field)) {
         const errorMessages = errorObject[field];
         errorMessages.forEach((error: any) => {
            if (error !== "") errorMsg.push(`${field}: ${error}`)
         });
      }
   }
   return errorMsg;
}