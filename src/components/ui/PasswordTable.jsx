'use client'
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { useTheme } from "next-themes";

const PasswordTable = ({ formData }) => {
  const [visiblePassword, setvisiblePassword] = useState({});
  const toggleVisibility = (id) => {
    console.log("id=====> " , id);
    setvisiblePassword((prev)=>{
      console.log("Previous state ====>"  ,prev);
      const updateState = {
        ...prev,
        [id]: !prev[id],
      }
      console.log("Updated state ====>"  ,updateState);
      return updateState;
    })
  };
  const { theme } = useTheme();

  return (
    <div className={`container mx-auto mt-8 `}>
      <div className="overflow-x-auto">
        <table className={`min-w-full ${theme === 'dark' ? 'bg-neutral-800 border-white' : 'bg-white border-gray-200'}`}>
          <thead>
            <tr>
              <th className={`px-2 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>No.</th>
              <th className={`px-4 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>Website Name</th>
              <th className={`px-4 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>Username</th>
              <th className={`px-4 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>Password</th>
              <th className={`px-4 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.length > 0 ? (
              formData.map((item, index) => (
                <tr key={item._id}>
                  <td className={`px-2 py-2 border text-center capitalize ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>{index + 1}.</td>
                  <td className={`px-4 py-2 border text-center ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>
                    <div>{item.website_name}</div>
                  </td>
                  <td className={`px-4 py-2 border text-center ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>
                    {item.website_username}
                  </td>
                  <td className={`px-2 py-2 border ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>
                    <div className="relative">
                      <Input
                        value={item.website_password}
                        placeholder="Enter your password"
                        type={visiblePassword[item._id] ? "text" : "password"}
                        className={`pr-10 border-0 outline-none text-center ${theme === 'dark' ? 'bg-neutral-700 text-white' : 'bg-white text-black'}`}
                      />
                      <button
                        type="button"
                        onClick={()=>{
                          toggleVisibility(item._id)
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                      >
                        {visiblePassword[item._id] ? (
                          <PiEyeBold className="text-2xl text-gray-500" />
                        ) : (
                          <PiEyeClosedBold className="text-2xl text-gray-500" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className={`px-2 py-2 border text-center ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-500 text-white px-6 py-2 hover:bg-green-600 hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 bg-red-500 text-white hover:bg-red-600 hover:text-white px-6 py-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={`px-4 py-2 border text-center ${theme === 'dark' ? 'border-white' : 'border-gray-200'}`}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PasswordTable;
