"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { useTheme } from "next-themes";
import { Modal } from "@/components/ui/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const PasswordTable = ({ formData, onDelete ,retrieveDataFromDB }) => {
  const [visiblePassword, setVisiblePassword] = useState({});
  const { theme } = useTheme();

  // Toggle Password
  const toggleVisibility = (id) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={`container mx-auto my-8 p-6 rounded-lg  ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-300">
          <TableHeader className={`${theme === "dark" ? "bg-gray-800 " : `bg-black`}`}>
            <TableRow>
              <TableHead className={`px-6 py-3 text-md text-center font-bold ${theme === 'dark' ? 'text-white' :'text-gray-100'} uppercase tracking-wider `}>No.</TableHead>
              <TableHead className={`px-6 py-3 text-md text-center font-bold ${theme === 'dark' ? 'text-white' :'text-gray-100'} uppercase tracking-wider `}>Website Name</TableHead>
              <TableHead className={`px-6 py-3 text-md text-center font-bold ${theme === 'dark' ? 'text-white' :'text-gray-100'} uppercase tracking-wider `}>Username</TableHead>
              <TableHead className={`px-6 py-3 text-md text-center font-bold ${theme === 'dark' ? 'text-white' :'text-gray-100'} uppercase tracking-wider `}>Password</TableHead>
              <TableHead className={`px-6 py-3 text-md text-center font-bold ${theme === 'dark' ? 'text-white' :'text-gray-100'} uppercase tracking-wider `}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} divide-y divide-gray-300`}>
            {formData.length > 0 ? (
              formData.map((item, index) => (
                <TableRow key={item._id} className={`${index % 2 === 0 ? (theme === "dark" ? "bg-gray-700" : "bg-gray-50") : ""}`}>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-center cursor-pointer">{index + 1}.</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-center cursor-pointer" >{item.website_name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-center cursor-pointer">{item.website_username}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-center cursor-pointer">
                    <div className="relative">
                      <Input
                        value={item.website_password}
                        placeholder="Enter your password"
                        type={visiblePassword[item._id] ? "text" : "password"}
                        className={`pr-5 text-sm border text-center cursor-pointer border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50 ${
                          theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-black"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => toggleVisibility(item._id)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                      >
                        {visiblePassword[item._id] ? (
                          <PiEyeBold className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`} />
                        ) : (
                          <PiEyeClosedBold className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`} />
                        )}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <Modal
                        id={item._id}
                        website_name={item.website_name}
                        website_username={item.website_username}
                        website_password={item.website_password}
                        retrieveDataFromDB={retrieveDataFromDB}
                      />
                      <Button
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                        onClick={() => onDelete(item._id)}
                      >
                        Delete
                      </Button>
                      <span className="flex justify-center items-center select-none ">
                        {item.isEdited ? "(Edited)" : ""}{" "}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="px-6 py-4 text-center text-lg font-bold">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default PasswordTable;
