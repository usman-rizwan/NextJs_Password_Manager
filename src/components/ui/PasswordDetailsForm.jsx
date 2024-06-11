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
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
    website: z.string().trim().min(3,{
    message: "Website name is not valid.",
  }),
  username: z.string().trim().min(3, {
    message: "Username name is not valid.",
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const PasswordDetailsForm = () => {
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

  async function onSubmit(values) {
    try {
        console.log(values);
      //   setLoading(true);
      //   const response = await axios.post("/api/users/login", values);
      //   console.log("response===>", response.data);
      //   form.reset({ email: "" }, { password: "" });
      //   setLoading(false);
      //   toast.success("User logged in successfully");
      //   router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("Incorrect Credentials");
      console.log("error===>", error);
    }
    // console.log(values);
  }

  return (
    <div className="flex  items-center justify-center  p-4 ">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 mt-7">
        <h1 className="text-2xl mb-6 font-extrabold">Password Manager</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the website URL" {...field} />
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
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                      />
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
