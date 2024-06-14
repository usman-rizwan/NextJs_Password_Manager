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
  email: z.string().email({
    message: "Email is not valid.",
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      console.log("response===>", response.data);
      form.reset({ email: "" }, { password: "" });
    if (response.data.status === 200) {
      const token = response.data.token;
      setLoading(false);
      toast.success("User logged in successfully");
      router.push(`/dashboard?id=${token}`);
    } else {
      setLoading(false);
      toast.error("Incorrect Credentials");
      console.log("error===>", response.data);
    }
    } catch (error) {
      setLoading(false);
      toast.error("Incorrect Credentials");
      console.log("error===>", error);
    }
    // console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 ">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl mb-6 font-extrabold">Login Form</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display email address.
                  </FormDescription>
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
            <div>
              <span>
                Don't have an account?
                <Link
                  href="/signup"
                  className="text-blue-500 font-bold text-lg"
                >
                  Signup
                </Link>
              </span>
            </div>
            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
