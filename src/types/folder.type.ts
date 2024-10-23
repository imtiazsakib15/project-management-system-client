export interface Folder {
  _id: string;
  name: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFolderRequest {
  name: string;
  projectId: string;
}

export interface CreateFolderResponse {
  success: boolean;
  message: string;
  data: Folder;
}
