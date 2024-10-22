import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} from "@/redux/features/project/projectApi";
import { Project } from "@/types";

const projectSchema = z.object({
  name: z.string().nonempty({ message: "Project name is required" }),
});

const ProjectSection = () => {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "" },
  });
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { data, error } = useGetAllProjectsQuery(undefined);

  const projects: Project[] = data?.data;

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

      {projects?.length > 0 && (
        <Table className="rounded-sm mt-6">
          <TableHeader className="bg-white">
            <TableRow className="px-5">
              <TableHead className="w-1/3 px-6 py-4">Project name</TableHead>
              <TableHead className="w-2/3 px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-blue-100">
            {projects.map((project) => (
              <TableRow key={project._id} className="border-gray-300">
                <TableCell className="font-medium w-1/3 px-6">
                  {project.name}
                </TableCell>
                <TableCell className="space-x-3 w-2/3 px-6">
                  <Button className="sm:px-5" size={"sm"}>
                    SELECT
                  </Button>
                  <Button className="sm:px-5" size={"sm"}>
                    DELETE
                  </Button>
                  <Button className="sm:px-5" size={"sm"}>
                    RENAME
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProjectSection;
