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
  }),
});

export const { useCreateFolderMutation } = folderApi;
