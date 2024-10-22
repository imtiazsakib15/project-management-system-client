import Container from "./Container";
import ProjectSection from "./ProjectSection";

const MainSection = () => {
  return (
    <main>
      <Container>
        <div className="grid lg:grid-cols-2 py-4 sm:py-6 lg:py-8">
          <ProjectSection />
          <div></div>
        </div>
      </Container>
    </main>
  );
};

export default MainSection;
