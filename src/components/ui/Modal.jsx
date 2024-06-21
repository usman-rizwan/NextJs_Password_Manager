import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  website: z
    .string()
    .trim()
    .min(3, {
      message: "At least 3 characters.",
    })
    .max(12, {
      message: "Maximum 12 characters.",
    }),
  username: z
    .string()
    .trim()
    .min(3, {
      message: "Username is not valid.",
    })
    .max(12, {
      message: "Username should be less than 12 alphabets.",
    }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(15, {
      message: "Password should be less than 16 characters.",
    }),
});

export function Modal({
  id,
  website_name,
  website_username,
  website_password,
  retrieveDataFromDB
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClose = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-500 font-semibold text-white px-6 py-2 hover:bg-green-600 hover:text-white"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit data</DialogTitle>
            <DialogDescription>
              Make changes to your document here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <UpdationForm
            id={id}
            website_name={website_name}
            website_username={website_username}
            website_password={website_password}
            onClose={handleClose}
            retrieveDataFromDB={retrieveDataFromDB}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-500 font-semibold text-white px-6 py-2 hover:bg-green-600 hover:text-white"
        >
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit data</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <UpdationForm
          id={id}
          website_name={website_name}
          website_username={website_username}
          website_password={website_password}
          retrieveDataFromDB={retrieveDataFromDB}
          onClose={handleClose}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UpdationForm({
  id,
  website_name,
  website_username,
  website_password,
  onClose,
  retrieveDataFromDB
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: website_name || "",
      username: website_username || "",
      password: website_password || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      // console.log(values);
  
      let valuesChanged =
        values.website !== website_name ||
        values.username !== website_username ||
        values.password !== website_password;
  
      if (!valuesChanged) {
        toast.info("No changes detected");
        return;
      }
  
      const response = await axios.patch("/api/data/updateData", {
        data: { ...values, id },
      });
  
      if (response.data.status === 200) {
        toast.success("Document Updated Successfully");
        onClose();
        await retrieveDataFromDB()
      } else if (response.data.status === 404) {
        toast.error("Failed to Update Document");
      } else {
        toast.error("Something went wrong");
      }
  
      // console.log(response);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while updating the document");
    }
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4")}
      >
        <div className="grid gap-2">
          <span className="text-sm text-gray-500 font-medium mb-2 select-none">
           Document ID: {id}
          </span>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website name</FormLabel>
                <Input
                  placeholder="Enter the website name or URL"
                  id="website"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter your username"
                  id="username"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={isVisible ? "text" : "password"}
                    className="pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  >
                    {isVisible ? (
                      <FaEye className="text-2xl text-gray-500" />
                    ) : (
                      <FaEyeSlash className="text-2xl text-gray-500" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
