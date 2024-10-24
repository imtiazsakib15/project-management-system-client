import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetAllFoldersByProjectIdQuery } from "@/redux/features/folder/folderApi";
import { Folder } from "@/types";
import DeleteFolderBtn from "./DeleteFolderBtn";

interface FoldersTableProps {
  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;
  selectedProjectId: string;
}

const FoldersTable = ({
  selectedFolderId,
  setSelectedFolderId,
  selectedProjectId,
}: FoldersTableProps) => {
  const { data } = useGetAllFoldersByProjectIdQuery(selectedProjectId);
  const folders: Folder[] = data?.data;

  const handleSelectFolder = (id: string) => {
    if (selectedFolderId === id) setSelectedFolderId("");
    else setSelectedFolderId(id);
  };

  return (
    <>
      {folders?.length > 0 && (
        <Table className="rounded-sm mt-6">
          <TableHeader className="bg-white">
            <TableRow className="px-5">
              <TableHead className="w-1/3 px-6 py-4">Folder name</TableHead>
              <TableHead className="w-2/3 px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-blue-100">
            {folders.map((folder) => (
              <TableRow key={folder._id} className="border-gray-300">
                <TableCell className="font-medium w-1/3 px-6">
                  {folder.name}
                </TableCell>
                <TableCell className="space-x-3 w-2/3 px-6">
                  <Button
                    className={`sm:px-5 ${
                      selectedFolderId === folder._id
                        ? "bg-orange-600 hover:bg-orange-500"
                        : ""
                    }`}
                    size={"sm"}
                    onClick={() => handleSelectFolder(folder._id)}
                  >
                    {selectedFolderId === folder._id ? "SELECTED" : "SELECT"}
                  </Button>

                  <DeleteFolderBtn id={folder._id} />

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

export default FoldersTable;
