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
import { useCreateProjectMutation } from "@/redux/features/project/projectApi";

const projectSchema = z.object({
  name: z.string().nonempty({ message: "Project name is required" }),
});

const CreateProject = () => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "" },
  });
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    try {
      const result = await createProject(data).unwrap();
      if (result.success)
        toast.success(result.message || "Project created successfully");
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
                  <Input placeholder="New Project" {...field} />
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
              Create Project
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateProject;
