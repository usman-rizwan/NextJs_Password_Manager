import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { useEffect ,useState } from "react";
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
import { Label } from "@/components/ui/label";
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

const formSchema = z.object({
  website: z.string().trim().min(3, {
    message: "At least 3 characters.",
  }).max(12,{
    message: "Maximum 12 characters.",
  }),
  username: z.string().trim().min(3, {
    message: "Username is not valid.",
  }).max(9,{
    message: "Username should be less than 10 alphabets.",
  }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters.",
  }).max(15 ,{
    message: "Password should be less than 16 characters.",
  }),
});

export function Modal({
  id,
  website_name,
  website_username,
  website_password,
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
            className="bg-green-500 font-bold text-white px-6 py-2 hover:bg-green-600 hover:text-white"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <UpdationForm
            id={id}
            website_name={website_name}
            website_username={website_username}
            website_password={website_password}
            onClose={handleClose}
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
          className="bg-green-500 font-bold text-white px-6 py-2 hover:bg-green-600 hover:text-white"
        >
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <UpdationForm
          id={id}
          website_name={website_name}
          website_username={website_username}
          website_password={website_password}
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
  onClose
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

  useEffect(() => {
    form.setValue("website", website_name || "");
    form.setValue("username", website_username || "");
    form.setValue("password", website_password || "");
  }, [website_name, website_username, website_password]);

  const onSubmit = async (values) => {
    try {
      console.log(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4")}>
        <div className="grid gap-2">
          <Label htmlFor="website">Website Name</Label>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website name or URL</FormLabel>
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
          <Label htmlFor="username">Username</Label>
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
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              className={`pr-10`}
              {...form.register("password")}
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
        </div>
        <Button type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
