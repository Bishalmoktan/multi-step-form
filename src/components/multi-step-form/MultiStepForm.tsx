import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import ProgressBar from "./ProgressBar"
import PersonalDetailForm from "./PersonalDetailForm"
import { Button } from "../ui/button"
import Address from "./Address"
import ProfilePicture from "./ProfilePicture"
import Review from "./Review"

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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [enableNext, setEnableNext] = useState(false);

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
        {currentStep == 0 && <PersonalDetailForm key={currentStep} setEnableNext={setEnableNext} />}
        {currentStep == 1 && <Address key={currentStep} setEnableNext={setEnableNext} />}
        {currentStep == 2 && <ProfilePicture key={currentStep} setEnableNext={setEnableNext} />}
        {currentStep == 3 && <Review key={currentStep} setCurrentStep={setCurrentStep} />}
      {currentStep !== 3 && <div className="text-sm mt-2 text-center">Note: Make sure you click save before you move on</div>}
        
      </CardContent>
      <CardFooter className="flex justify-between">
       <Button onClick={handlePrev} disabled={currentStep <= 0}>Prev</Button>
     { currentStep !== 3 && <Button onClick={handleNext} disabled={!enableNext || (currentStep >= steps.length - 1)}>Next </Button>}
      </CardFooter>
    </Card>
  )
}
export default MultiStepForm