import { useState, useEffect } from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import { useAppContext } from "../app-provider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";

interface ProfilePictureProps {
  setEnableNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  img: z.string().min(2, {
    message: "Image is required",
  }),
});

const ProfilePicture = ({ setEnableNext }: ProfilePictureProps) => {
  const { profileDetails, setProfileDetails } = useAppContext();
  const [image, setImage] = useState<string | null>(profileDetails.img || null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: profileDetails.img || "",
    },
  });

  useEffect(() => {
    form.reset();
    setEnableNext(false);

  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem("profileImage", base64String);
      setImage(base64String);
      form.setValue("img", base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
      setProfileDetails({
        ...profileDetails,
        img: values.img,
      });
      setEnableNext(true);
    
  };

  return (
    <div className="w-full md:w-[500px] mx-auto my-8">
      <CardTitle>Profile Picture</CardTitle>
      <CardDescription>Upload your profile picture</CardDescription>

      <div className="mt-4 space-y-4">
        <Form {...form}>
          <form className="flex flex-col space-y-1.5" onSubmit={form.handleSubmit(onSubmit)}>
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
                      accept="image/png"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Label htmlFor="profileImage" className="cursor-pointer inline-flex items-center">
                      <Upload className="size-12 cursor-pointer" />
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save</Button>
          </form>

          {image && (
            <div className="mt-4">
              <img src={image} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ProfilePicture;
