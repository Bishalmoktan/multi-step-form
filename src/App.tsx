import Footer from "./components/Footer";
import MultiStepForm from "./components/multi-step-form/MultiStepForm";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";

const  App = () => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
      <Navbar />
      <MultiStepForm />
      </main>
      <div className="max-w-7xl mx-auto">
      <Separator />
      <Footer />
      </div>
    </ThemeProvider>

  )
}

export default App
