'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";


const PasswordTable = ({formData})=>{
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return(
        <div className="container mx-auto mt-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-2 border">No.</th>
                <th className="px-4 py-2 border">Website Name</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Password</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.length > 0 ? (
                formData.map((item , index) => (
                  <tr key={item._id}>
                    <td className="px-2 py-2 border text-center"> {index + 1}&#41; </td>
                    <td className="px-4 py-2 border">{item.website_name}</td>
                    <td className="px-4 py-2 border">
                    <div className="relative">
                        <Input
                          value={item.website_password}
                          placeholder="Enter your password"
                          type={isVisible ? "text" : "password"}
                          className="pr-10 border-0 outline-none text-center "
                          disabled={true}
                        />
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                        >
                          {isVisible ? (
                            <FaEye  className="text-2xl text-gray-500" />
                          ) : (
                            <FaEyeSlash  ocked className="text-2xl text-gray-500" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-2 border">
                    {item.website_password}
                    </td>
                    <td className="px-2 py-2 border text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-500 text-white  px-6 py-4 hover:bg-green-600 hover:text-white"
                        // onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 bg-red-500 text-white hover:bg-red-600 hover:text-white  px-6 py-4"
                        // onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 border text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
}
export default PasswordTable;