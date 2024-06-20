import axios from "axios";
import { toast } from "sonner";
const logout = async ()=>{
    try {
        const response = await axios("/api/users/logout");
        console.log("Logout Response ====>", response);
        
        if (response.data.success ===  true) {
           window.location.href = "/login";
          toast.success("Logout SuccessFully")
        }else{
          toast.error("Failed to logout");
        }
          

      } catch (error) {
        console.log("Logout Error===> " , error);
        toast.error("Error in logout")

      }
}
export default logout;