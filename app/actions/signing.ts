import { apiUrl } from "@/config";
import { apiCallerBeta } from "@/lib/utils/apiCaller";
import axios from "axios"



export const singleSignOn = async (data: any) => {
   const response = await apiCallerBeta({
      url: `${apiUrl}/admin/admin-login`,
      method: 'POST',
      data: { ...data },
      headers: {
         // 'Content-Type': 'application/x-www-form-urlencoded',
         'Content-Type': 'application/json',
      }
   }) as any;
   if (response.success) {
      // console.log(response.data.redirect_to)
      const red = await axios.get(response.success.data.redirect_to);
      // console.log(red); return false;
      // return response.data
   }
   return { error: null, success: null }
}

