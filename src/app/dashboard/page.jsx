'use client'
import Navbar from "@/components/ui/Navbar";
import PasswordDetailsForm from "@/components/ui/PasswordDetailsForm";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import PasswordTable from "@/components/ui/PasswordTable";

const DashboardPageContent  = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParamsId = searchParams.get("id");

  const retrieveDataFromDB = async () => {
    try {
      const response = await axios.get("/api/data/getData", {
        params: { id: searchParamsId },
      });
      // console.log("response===>", response);
      if (response.status === 200 && response.data.data.length > 0) {
        setFormData(response.data.data);
      } else if (response.data.data.status === 404) {
        toast.error("No data found");
        setLoading(false);
      } else {
        console.error("Error fetching data", response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  };

  useEffect(() => {
    if (searchParamsId) {
      retrieveDataFromDB();
    }
  }, [searchParamsId]);

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      // console.log("Form data received:", data);
      const response = await axios.post("/api/data/addData", data);
      // console.log("User Data response == => ", response);
      if (response.data.status === 200) {
        toast.success("Credentials Saved In DB Successfully");
        setFormData([...formData, response.data.response]);
        setLoading(false);
      } else if (response.data.status === 400) {
        toast.error("Website name already exists");
        setLoading(false);
      } else {
        toast.error("Error Saving Credentials");
        // console.log("error===>", response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Saving Credentials");
      // console.log("error===>", error.message);
    }
  };

  // Delete Field
  const deleteItem = async (id) => {
    // console.log("Delete Item ====>", id);
    try {
      const response = await axios.delete("/api/data/deleteData", {
        data: { id },
      });
      // console.log("Response ====>", response.data);
      if (response.data.status === 200) {
        setFormData((prevData) => prevData.filter((item) => item._id !== id));
        toast.success("Credentials Deleted Successfully");
      }else{
        toast.error("Error deleting data");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      
    }
  };

  return (
    <div>
      <Navbar />
      <PasswordDetailsForm
        onSubmitForm={handleFormSubmit}
        loading={loading}
        setLoading={setLoading}
      />
      <PasswordTable formData={formData} onDelete={deleteItem} retrieveDataFromDB={retrieveDataFromDB} />
    </div>
  );
};
const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
};

export default DashboardPage;
