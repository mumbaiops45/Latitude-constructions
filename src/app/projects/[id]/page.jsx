import { projects } from "../projectData";
import ProjectDetailsPage from "./ProjectDetailsPage";

// Pre-renders one HTML file per project. Required by `output: 'export'`,
// and it prerenders the detail pages in a server build too.
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} - ${project.location}`,
    description: project.description,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  return <ProjectDetailsPage id={id} />;
}
