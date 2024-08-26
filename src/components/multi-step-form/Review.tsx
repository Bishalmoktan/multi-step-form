import { toast } from "sonner";
import { useAppContext } from "../app-provider"
import { Button } from "../ui/button";

interface ReviewProps {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  }

const Review = ({setCurrentStep} : ReviewProps) => {
    const {profileDetails, addressDetails, personalDetails, addDetails} = useAppContext();
    const onClick = () => {
        addDetails({profileDetails, addressDetails, personalDetails});
        toast.success("Record has been added");
        setCurrentStep(0);
    }
  return (
    <div className="my-8 space-y-4">
        <div>
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <p>Name: {personalDetails.name}</p>
            <p>Email: {personalDetails.email}</p>
            <p>phone: {personalDetails.phone}</p>
            <p>Date of Birth: {personalDetails.dateOfBirth}</p>
        </div>
        <div>
        <h2 className="text-2xl font-bold">Address Information</h2>
            <p>Country: {addressDetails.country}</p>
            <p>state: {addressDetails.state}</p>
            <p>district: {addressDetails.district}</p>
            <p>City {addressDetails.city}</p>
        </div>
        <div>
        <h2 className="text-2xl font-bold">Profile picture</h2>
            <img src={profileDetails.img} className="size-32 object-cover rounded-full" />
        </div>

        <p className="text-sm">Note: Make sure your details are correct</p>

        <Button onClick={onClick}>Add Record</Button>
    </div>
  )
}
export default Review