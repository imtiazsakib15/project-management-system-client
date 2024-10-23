import { useState } from "react";
import Container from "./Container";
import CreateProject from "./CreateProject";
import ProjectsTable from "./ProjectsTable";

const MainSection = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  return (
    <main>
      <Container>
        <div className="grid lg:grid-cols-2 py-4 sm:py-6 lg:py-8">
          <div>
            <CreateProject />
            <ProjectsTable
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
          </div>
          <div></div>
        </div>
      </Container>
    </main>
  );
};

export default MainSection;
