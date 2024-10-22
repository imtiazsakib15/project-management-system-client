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
      invalidatesTags: ["Project"],
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
  }),
});

export const { useCreateProjectMutation, useGetAllProjectsQuery } = projectApi;
