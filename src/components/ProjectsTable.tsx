import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";
import { Project } from "@/types";
import DeleteProjectBtn from "./DeleteProjectBtn";

interface ProjectsTableProps {
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
}

const ProjectsTable = ({
  selectedProjectId,
  setSelectedProjectId,
}: ProjectsTableProps) => {
  const { data } = useGetAllProjectsQuery(undefined);
  const projects: Project[] = data?.data;

  const handleSelectProject = (id: string) => {
    if (selectedProjectId === id) setSelectedProjectId("");
    else setSelectedProjectId(id);
  };

  return (
    <>
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
                  <Button
                    className={`sm:px-5 ${
                      selectedProjectId === project._id
                        ? "bg-orange-600 hover:bg-orange-500"
                        : ""
                    }`}
                    size={"sm"}
                    onClick={() => handleSelectProject(project._id)}
                  >
                    {selectedProjectId === project._id ? "SELECTED" : "SELECT"}
                  </Button>

                  <DeleteProjectBtn id={project._id} />

                  <Button className="sm:px-5" size={"sm"}>
                    RENAME
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ProjectsTable;
