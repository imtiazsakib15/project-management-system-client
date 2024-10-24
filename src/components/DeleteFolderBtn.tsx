import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteFolderMutation } from "@/redux/features/folder/folderApi";
import { toast } from "sonner";

const DeleteFolderBtn = ({ id }: { id: string }) => {
  const [deleteFolder] = useDeleteFolderMutation();

  const handleDeleteFolder = async (id: string) => {
    try {
      const result = await deleteFolder(id).unwrap();
      if (result.success)
        toast.success(result.message || "Folder deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occured");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="sm:px-5" size={"sm"}>
          DELETE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete folder</DialogTitle>
          <DialogDescription>
            Make sure you want to delete your folder.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={() => handleDeleteFolder(id)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFolderBtn;
