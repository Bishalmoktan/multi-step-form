import { CardDescription, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { SampleDatePicker } from "./DatePicker"

const PersonalDetailForm = () => {
  return (
    <div className="w-[500px] mx-auto my-8">
      <CardTitle>Personal Information</CardTitle>
      <CardDescription>Enter your personal information</CardDescription>

      <div className="mt-4 space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Your phone number" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Date of birth</Label>
              <SampleDatePicker />
            </div>
           
          </div>

    </div>
  )
}
export default PersonalDetailForm