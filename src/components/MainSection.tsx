import Container from "./Container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCreateProjectMutation } from "@/redux/features/project/projectApi";

const loginFormSchema = z.object({
  name: z.string().nonempty({ message: "Project name is required" }),
});

const MainSection = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { name: "" },
  });
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
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
    <main>
      <Container>
        <div className="grid sm:grid-cols-2 py-4 sm:py-6 lg:py-8">
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

          <div></div>
        </div>
      </Container>
    </main>
  );
};

export default MainSection;
