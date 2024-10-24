import { useState } from "react";
import Container from "./Container";
import CreateProject from "./CreateProject";
import ProjectsTable from "./ProjectsTable";
import CreateFolder from "./CreateFolder";
import FoldersTable from "./FoldersTable";

const MainSection = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");

  return (
    <main>
      <Container>
        <div className="grid lg:grid-cols-2 gap-6 py-4 sm:py-6 lg:py-8">
          <div>
            <CreateProject />
            <ProjectsTable
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
          </div>
          <div>
            {selectedProjectId && (
              <>
                <CreateFolder selectedProjectId={selectedProjectId} />
                <FoldersTable
                  selectedFolderId={selectedFolderId}
                  setSelectedFolderId={setSelectedFolderId}
                  selectedProjectId={selectedProjectId}
                />
              </>
            )}

            {/* Render project details or other project-specific components here */}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default MainSection;
