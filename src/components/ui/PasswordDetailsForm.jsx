"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import {FaEye, FaEyeSlash } from "react-icons/fa";

const formSchema = z.object({
  website: z.string().trim().min(3, {
    message: "Atleast 3 characters.",
  }),
  username: z.string().trim().min(3, {
    message: "Username name is not valid.",
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const PasswordDetailsForm = ({onSubmitForm}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

const onSubmit = async (values)=>{
  try {
    console.log(values);
    if (onSubmitForm) {
      onSubmitForm(values);
    }
  } catch (error) {
    setLoading(false);
    console.error("There was a problem:", error);
  }
}

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 mt-5">
        <h1 className="text-2xl mb-6 font-extrabold">Password Manager</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website name or URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the website name or URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type={isVisible ? "text" : "password"}
                          className="pr-10"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "Loading..." : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordDetailsForm;
