import React from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "../app-provider";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { SampleDatePicker } from "./DatePicker";

interface PersonalDetailFormProps {
  setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Please provide your name"
  }).max(50),
  dateOfBirth: z.string().min(1, {
    message: "Please select a date"
  }),
  email: z.string().email(),
  phone: z.string().min(9, {
    message: "Invalid phone number"
  })
});

const PersonalDetailForm = ({ setEnableNext }: PersonalDetailFormProps) => {
  const { personalDetails, setPersonalDetails} = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: personalDetails.name,
      dateOfBirth: personalDetails.dateOfBirth,
      email: personalDetails.email,
      phone: personalDetails.phone
    },
  });



  




  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPersonalDetails({
      ...personalDetails,
      ...values,
    });
    setEnableNext(true); 
  };

  return (
    <div className="w-full md:w-[500px] md:mx-auto my-8">
      <CardTitle>Personal Information</CardTitle>
      <CardDescription>Enter your personal information</CardDescription>
      <Form {...form}>
        <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Name</FormLabel>
                <Input className="w-full"  placeholder="Your name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Email</FormLabel>
                <Input placeholder="Your email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Your phone number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>Date of Birth</FormLabel>
                <SampleDatePicker {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default PersonalDetailForm;
