import { CardDescription, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import SelectCountries from "./SelectCountries"
import SelectStates from "./SelectStates"


const Address = () => {

  return (
    <div className="w-[500px] mx-auto my-8">
    <CardTitle>Address</CardTitle>
    <CardDescription>Enter your address information</CardDescription>

    <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <SelectCountries />
          <SelectStates />
        </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="district">District</Label>
            <Input id="district" placeholder="Your district" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Your city" />
          </div>
         
         
        </div>

  </div>
  )
}
export default Address