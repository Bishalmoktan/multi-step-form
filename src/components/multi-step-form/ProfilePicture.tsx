import { useState, useEffect } from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";

const ProfilePicture = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem("profileImage", base64String);
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[500px] mx-auto my-8">
      <CardTitle>Profile Picture</CardTitle>
      <CardDescription>Upload your profile picture</CardDescription>

      <div className="mt-4 space-y-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="profileImage">Upload</Label>
          <div>
            <Input id="profileImage" type="file" accept="image/png" className="hidden" onChange={handleImageUpload} />
            <Label htmlFor="profileImage" className="cursor-pointer inline-flex items-center">
              <Upload className="size-12 cursor-pointer" />
            </Label>
          </div>
        </div>
        
        {image && (
          <div className="mt-4">
            <img src={image} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
