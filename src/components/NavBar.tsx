import Container from "./Container";

const NavBar = () => {
  return (
    <div className="shadow-lg py-4">
      <Container>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          <span className="text-slate-800">Project</span> Management System
        </h3>
      </Container>
    </div>
  );
};

export default NavBar;
