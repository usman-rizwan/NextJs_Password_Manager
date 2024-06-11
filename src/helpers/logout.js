import axios from "axios";
import { toast } from "sonner";
const logoout = ()=>{
    try {
        const response = axios("/api/users/logout");
        console.log("Logout Response ====>", response);
        window.location = '/login'
        toast.success("Logout SuccessFully")
      } catch (error) {
        console.log("Logout Error===> " , error);
        toast.error("Error in logout")

      }
}
export default logoout;