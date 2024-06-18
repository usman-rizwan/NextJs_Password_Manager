import axios from "axios";
import { toast } from "sonner";
const logout = ()=>{
    try {
        const response = axios("/api/users/logout");
        console.log("Logout Response ====>", response);
        window.location.href = '/login';
        toast.success("Logout SuccessFully")
        localStorage.clear()
      } catch (error) {
        console.log("Logout Error===> " , error);
        toast.error("Error in logout")

      }
}
export default logout;