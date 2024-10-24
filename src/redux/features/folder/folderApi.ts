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
      query: (projectId: string) => ({
        url: `/folders/${projectId}`,
        method: "GET",
      }),
      providesTags: ["Folder"],
    }),
    deleteFolder: builder.mutation({
      query: (id: string) => ({
        url: `/folders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Folder"],
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetAllFoldersByProjectIdQuery,
  useDeleteFolderMutation,
} = folderApi;
