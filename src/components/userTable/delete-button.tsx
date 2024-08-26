import { Trash } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { useAppContext } from "../app-provider"

const DeleteButton = ({id}: {id: string}) => {
    const {deleteDetails} = useAppContext();
  return (
    <Dialog>
  <DialogTrigger className="p-2 rounded-md flex gap-2 items-center cursor-pointer bg-destructive hover:bg-destructive/70"> <Trash /> <span>Delete</span></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete this data.
      </DialogDescription>
    </DialogHeader>
  <DialogFooter className="flex flex-row justify-between  ">
    <DialogClose>
    <Button>Cancel</Button>
    </DialogClose>
    <Button
    className="w-max"
    onClick={() => deleteDetails(id)}
    variant={'destructive'}>Delete</Button>
  
  </DialogFooter>
  </DialogContent>
</Dialog>

  )
}
export default DeleteButton