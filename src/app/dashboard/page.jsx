"use client";
import Navbar from "@/components/ui/Navbar";
import PasswordDetailsForm from "@/components/ui/PasswordDetailsForm";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const DashboardPage = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  


  const handleFormSubmit = async (data) => {
    try {
      setFormData(data);
      setLoading(true);
      console.log("Form data received:", data);
      const response = await axios.post("/api/users/userData", data);
      console.log("User Data response == => ", response);
      if (response.data.status === 200) {
        toast.success("Credentials Saved In DB Successfully");
        setLoading(false);
      }
      else if(response.data.status === 400){
        toast.error("Website name already exist");
        setLoading(false);
      }
      else {
        toast.error("Error Saving Credentials");
        console.log("error===>", response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error Saving Credentials");
      console.log("error===>", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <PasswordDetailsForm onSubmitForm={handleFormSubmit} loading={loading} setLoading={setLoading} />
      {formData && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-bold">Form Data</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
