export interface Project {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: Project;
}
