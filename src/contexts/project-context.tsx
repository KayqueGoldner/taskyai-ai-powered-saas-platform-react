/**
 * node modules
 */
import { createContext, useContext } from "react";

/**
 * types
 */
import type { Models } from "appwrite";
interface ProjectProviderProps {
  children: React.ReactNode;
  projects: Models.DocumentList<Models.Document> | null;
}

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
  projects,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
