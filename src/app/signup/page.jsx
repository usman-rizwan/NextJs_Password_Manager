"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link  from "next/link";
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
import axios from 'axios'
import  { useState}  from "react";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email : z.string().email({
    message: "Email is not valid.",
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters.",
  } ),
});


const SignupForm = () => {
 
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", values);
      console.log(  "response===>" , response);
      toast.success("User created successfully");
      setLoading(false);
      router.push("/home");
    } catch (error) {
      setLoading(false);
      toast.error("Error creating user");
      console.log("error===>" , error.message);
    }
    // connectToDB();
    console.log(values);

  form.reset({ email: "" } ,  { username: "" } , { password: "" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 ">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl  mb-6 font-extrabold">Signup Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <span>Already have an account?  <Link href="/login" className="text-blue-500 font-bold text-lg">Login </Link> </span>
            </div>
            <Button type="submit" className="mt-4" disabled={loading} > {loading ? "Loading..." : "Signup "} </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
