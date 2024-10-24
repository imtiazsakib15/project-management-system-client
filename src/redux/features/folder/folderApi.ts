import { baseApi } from "@/redux/api/baseApi";
import { CreateFolderRequest, CreateFolderResponse } from "@/types";

const folderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation<CreateFolderResponse, CreateFolderRequest>({
      query: (folderInfo) => ({
        url: "/folders",
        method: "POST",
        body: folderInfo,
      }),
      invalidatesTags: ["Folder"],
    }),
    getAllFoldersByProjectId: builder.query({
      query: (projectId) => ({
        url: `/folders/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),
  }),
});

export const { useCreateFolderMutation, useGetAllFoldersByProjectIdQuery } =
  folderApi;
