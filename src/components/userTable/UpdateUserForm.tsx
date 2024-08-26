import { z } from "zod";
import { ICompleteDetails, useAppContext } from "../app-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SampleDatePicker } from "../multi-step-form/DatePicker";
import SelectCountries from "../multi-step-form/SelectCountries";
import SelectStates from "../multi-step-form/SelectStates";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Please provide your name",
    })
    .max(50),
  dateOfBirth: z.string().min(1, {
    message: "Please select a date",
  }),
  email: z.string().email(),
  phone: z.string().min(9, {
    message: "Invalid phone number",
  }),
  country: z
    .string()
    .min(2, {
      message: "Please provide your country name",
    })
    .max(50),
  state: z
    .string()
    .min(2, {
      message: "Please provide your country name",
    })
    .max(50),
  district: z
    .string()
    .min(2, {
      message: "Please provide your country name",
    })
    .max(50),
  city: z
    .string()
    .min(2, {
      message: "Please provide your country name",
    })
    .max(50),
  img: z.string().min(2, {
    message: "Image is required",
  }),
});


const UpdateUserForm = ({ id, closeModal }: { id: string, closeModal: () => void }) => {
  const { detailsList,updateDetails } = useAppContext();
  const userData = detailsList.find(
    (data) => (data.id === id)
  ) as ICompleteDetails;


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.personalDetails.name,
      dateOfBirth: userData.personalDetails.dateOfBirth,
      email: userData.personalDetails.email,
      phone: userData.personalDetails.phone,
      country: userData.addressDetails.country,
      state: userData.addressDetails.state,
      district: userData.addressDetails.district,
      city: userData.addressDetails.city,
      img: userData.profileDetails.img
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem("profileImage", base64String);
    //   setImage(base64String);
      form.setValue("img", base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, city, dateOfBirth, phone, country, district, email, img, state } = values;
    const personalDetails = {name, email, dateOfBirth, phone};
    const addressDetails = {country, district, state, city};
    const profileDetails = {img};

    const updatedDetails = {
        personalDetails,
        addressDetails,
        profileDetails
    }

    updateDetails(id, updatedDetails);
    closeModal();

    toast.success("Data updated successfully");
  };

  return (
    <ScrollArea className="h-[60vh] px-4">
    <Form {...form}>
      <form
        className="mt-4 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>Name</FormLabel>
              <Input className="w-full" placeholder="Your name" {...field} />
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
                <SelectStates country={userData.addressDetails.country} {...field} />
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
              <Input
                className="w-full"
                placeholder="Your district name"
                {...field}
              />
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
              <Input
                className="w-full"
                placeholder="Your city name"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="img"
          render={() => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel>Upload</FormLabel>
              <div>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Label
                  htmlFor="profileImage"
                  className="cursor-pointer inline-flex items-center"
                >
                  <Upload className="size-12 cursor-pointer" />
                </Label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

    {userData.profileDetails.img && (
            <div className="mt-4">
              <img src={userData.profileDetails.img} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )}

        <Button>Update</Button>
      </form>
    </Form>
    </ScrollArea>

  );
};
export default UpdateUserForm;
