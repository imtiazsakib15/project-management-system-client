import { baseApi } from "@/redux/api/baseApi";
import { CreateProjectRequest, CreateProjectResponse } from "@/types";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<
      CreateProjectResponse,
      CreateProjectRequest
    >({
      query: (projectInfo) => ({
        url: "/projects",
        method: "POST",
        body: projectInfo,
      }),
    }),
  }),
});
export const { useCreateProjectMutation } = projectApi;
