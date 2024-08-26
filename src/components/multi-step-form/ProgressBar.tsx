import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: {
    id: string;
    name: string;
  }[];
  currentStep: number;
}

const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      
      {steps.map((step, index) => (
        <>
        <div className="relative">
          <div
            className={`flex-shrink-0 rounded-full border-2 size-10  flex justify-center items-center ${
                index <= currentStep
                ? "bg-green-500 text-white"
                : "bg-white text-gray-500"
            }`}
            >
            {index + 1}
          </div>
          <div className={cn("hidden md:absolute top-10 w-60  font-medium left-0", index <= currentStep && "text-green-500")}>{step.name}</div>
              </div>
          {index !== steps.length - 1 && <div className={cn("bg-gray-500 w-full h-1", index < currentStep && "bg-green-500")}></div>}
        </>
      ))}
     
    </div>
  );
};
export default ProgressBar;
