import { Edit } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import UpdateUserForm from "./UpdateUserForm";
import React from "react";

const UpdateUser = ({ id }: { id: string }) => {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    }
  return (
    <Dialog open={open} onOpenChange={(setOpen)}>
      <DialogTrigger className="p-2 cursor-pointer hover:bg-accent w-max rounded-md">
        <div className="flex gap-2 items-center w-max">
          <Edit /> <span>Update </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently update this
            data.
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm closeModal={handleClose} id={id} />
        <DialogFooter className="flex flex-row justify-between">
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateUser;
