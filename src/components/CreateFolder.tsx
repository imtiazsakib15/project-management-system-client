import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateFolderMutation } from "@/redux/features/folder/folderApi";

const folderSchema = z.object({
  name: z.string().nonempty({ message: "Folder name is required" }),
});

const CreateFolder = ({ selectedProjectId }: { selectedProjectId: string }) => {
  const form = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: { name: "" },
  });
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const onSubmit = async (data: z.infer<typeof folderSchema>) => {
    const folderInfo = { ...data, projectId: selectedProjectId };
    try {
      const result = await createFolder(folderInfo).unwrap();
      console.log(result);
      if (result.success)
        toast.success(result.message || "Folder created successfully");
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occured");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-5 ms-2 sm:ms-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="New Folder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button className="uppercase" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="uppercase" type="submit">
              Create Folder
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateFolder;
