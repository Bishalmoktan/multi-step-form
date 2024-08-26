import { z } from "zod"
import { CardDescription, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import SelectCountries from "./SelectCountries"
import SelectStates from "./SelectStates"
import { useAppContext } from "../app-provider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { useEffect } from "react"

interface AddressDetailFormProps {
  setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  country: z.string().min(2, {
    message: "Please provide your country name"
  }).max(50),
  state: z.string().min(2, {
    message: "Please provide your country name"
  }).max(50),
  district: z.string().min(2, {
    message: "Please provide your country name"
  }).max(50),
  city: z.string().min(2, {
    message: "Please provide your country name"
  }).max(50),
  
});

const Address = ({
  setEnableNext
} : AddressDetailFormProps) => {
  const { addressDetails, setAddressDetails } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: addressDetails.country,
      state: addressDetails.state,
      district: addressDetails.district,
      city: addressDetails.city
    },
  });

  useEffect(() => {
    form.reset();
    setEnableNext(false);
  }, [])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setAddressDetails({
      ...addressDetails,
      ...values,
    });
    setEnableNext(true); 
  };
  return (
    <div className="w-full md:w-[500px]  mx-auto my-8">
    <CardTitle>Address</CardTitle>
    <CardDescription>Enter your address information</CardDescription>

    <Form {...form}>

    <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      
        <div className="flex gap-2 flex-col md:flex-col justify-between">
        <FormField 
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <SelectCountries {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
         
        <FormField 
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <SelectStates {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
         
        </div>
        <FormField 
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>District</FormLabel>
                <Input className="w-full"  placeholder="Your district name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField 
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel>City</FormLabel>
                <Input className="w-full"  placeholder="Your city name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
         
         <Button type="submit">Save</Button>
        </form>
    </Form>


  </div>
  )
}
export default Address