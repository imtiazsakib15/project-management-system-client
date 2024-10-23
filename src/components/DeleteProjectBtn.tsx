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
import { useDeleteProjectMutation } from "@/redux/features/project/projectApi";
import { toast } from "sonner";

const DeleteProjectBtn = ({ id }: { id: string }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = async (id: string) => {
    try {
      const result = await deleteProject(id).unwrap();
      if (result.success)
        toast.success(result.message || "Project deleted successfully");
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
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            Make sure you want to delete your project.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={() => handleDeleteProject(id)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectBtn;
