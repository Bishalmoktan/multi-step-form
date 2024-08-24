import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import ProgressBar from "./ProgressBar"
import PersonalDetailForm from "./PersonalDetailForm"
import { Button } from "../ui/button"
import Address from "./Address"
import ProfilePicture from "./ProfilePicture"

const steps = [
  {
    id: "Step 1",
    name: "Personal Information"
  },
  {
    id: "Step 2",
    name: "Address"
  },
  {
    id: "Step 3",
    name: "Profile Picture"
  },
  {
    id: "Step 4",
    name: "Review"
  }

]

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if(currentStep <= steps.length - 1){
      setCurrentStep(prev => prev + 1);
    }
  }

  const handlePrev = () => {
    if(currentStep >= 0){
      setCurrentStep(prev => prev - 1);
    }
  }
  return (
    <Card className="min-h-[80vh] flex flex-col">
      <CardHeader>
        <ProgressBar currentStep={currentStep} steps={steps} />
      </CardHeader>
      <CardContent className="flex-grow">
        {currentStep == 0 && <PersonalDetailForm />}
        {currentStep == 1 && <Address />}
        {currentStep == 2 && <ProfilePicture />}
      </CardContent>
      <CardFooter className="flex justify-between">
       <Button onClick={handlePrev} disabled={currentStep <= 0}>Prev</Button>
       <Button onClick={handleNext} disabled={currentStep >= steps.length - 1}>Next </Button>
      </CardFooter>
    </Card>
  )
}
export default MultiStepForm