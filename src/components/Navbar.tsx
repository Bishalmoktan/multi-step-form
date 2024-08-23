import { Flower } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  return (
    <nav className="flex justify-between">
        <div className="flex gap-2 items-center">
            <Flower className="size-8" />
            <div className="text-3xl font-extrabold t">Form</div>
        </div>
        <ModeToggle />
    </nav>
  )
}
export default Navbar