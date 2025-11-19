// redux/store/api/aiCreatorApi.js
import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const extractPayload = (response = {}) => {
  // If response has a data property, use it, otherwise use response directly
  if (response?.data) return response.data;
  return response;
};

const normalizeGeneration = (item = {}) => {
  const taskType = (item?.task_type || item?.type || "video").toLowerCase();
  return {
    id:
      item?.id ??
      `${taskType}-${item?.created_at ?? Date.now()}-${Math.random()}`,
    task_type: taskType,
    prompt: item?.input_data ?? item?.prompt ?? "",
    analysis_text: item?.analysis_text ?? item?.summary ?? "",
    output_url:
      item?.output_url ?? item?.url ?? item?.result_url ?? item?.file_url ?? "",
    download_url:
      item?.download_url ??
      item?.output_url ??
      item?.file_url ??
      item?.url ??
      "",
    thumbnail:
      item?.thumbnail ??
      item?.preview ??
      item?.cover_image ??
      item?.poster ??
      item?.output_url ??
      "",
    status: item?.status ?? "completed",
    created_at: item?.created_at ?? new Date().toISOString(),
    file_name: item?.file_name ?? null,
    metadata: {
      status: item?.status,
      raw: item,
    },
  };
};

const normalizeUsage = (response = {}) => {
  const payload = extractPayload(response) || {};

  const freeUsed = Number(
    payload?.free_used ?? payload?.free?.used ?? payload?.freeUsed ?? 0
  );
  const freeRemaining = Number(
    payload?.free_remaining ??
      payload?.free?.remaining ??
      payload?.freeRemaining ??
      0
  );
  const freeLimit = Number(
    payload?.free_limit ??
      payload?.free?.limit ??
      payload?.freeLimit ??
      freeUsed + freeRemaining
  );

  const subscriptionUsed = Number(
    payload?.subscription_used ??
      payload?.subscription?.used ??
      payload?.subscriptionUsed ??
      0
  );
  const subscriptionRemaining = Number(
    payload?.subscription_remaining ??
      payload?.subscription?.remaining ??
      payload?.subscriptionRemaining ??
      0
  );
  const subscriptionLimit = Number(
    payload?.subscription_limit ??
      payload?.subscription?.limit ??
      payload?.subscriptionLimit ??
      subscriptionUsed + subscriptionRemaining
  );

  const recentSource =
    payload?.recent_generation ??
    payload?.recentGeneration ??
    payload?.recent ??
    payload?.generations ??
    [];

  const recent = Array.isArray(recentSource)
    ? recentSource.map(normalizeGeneration)
    : [];

  return {
    free: {
      used: freeUsed,
      remaining: freeRemaining,
      limit: freeLimit,
    },
    subscription: {
      plan_name:
        payload?.plan_name ??
        payload?.subscription_plan ??
        payload?.planName ??
        "",
      status: payload?.subscription_status ?? payload?.status ?? "",
      used: subscriptionUsed,
      remaining: subscriptionRemaining,
      limit: subscriptionLimit,
    },
    recent,
  };
};

export const aiCreatorApi = createApi({
  reducerPath: "aiCreatorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/aicreatorlab`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AiUsage", "AiGenerations"],
  endpoints: (builder) => ({
    getAiUsage: builder.query({
      query: ({ taskType } = {}) => {
        const params = new URLSearchParams();
        if (taskType) params.append("task_type", taskType);
        const queryString = params.toString();

        return {
          url: `/ai-generation${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        console.log("Raw API response (getAiUsage):", response);
        const normalized = normalizeUsage(response);
        console.log("Normalized usage data:", normalized);
        return normalized;
      },
      providesTags: ["AiUsage"],
    }),
    getRecentGenerations: builder.query({
      query: ({ taskType } = {}) => {
        const params = new URLSearchParams();
        if (taskType) params.append("task_type", taskType);

        const queryString = params.toString();

        return {
          url: `/ai-generation${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        console.log("Raw API response (getRecentGenerations):", response);
        const normalized = normalizeUsage(response).recent;
        console.log("Normalized recent generations:", normalized);
        return normalized;
      },
      providesTags: (result, error, arg) => [
        {
          type: "AiGenerations",
          id: arg?.taskType ?? "all",
        },
      ],
    }),
    generateAiContent: builder.mutation({
      query: ({ taskType, inputData = "", file = null }) => {
        if (!taskType) {
          throw new Error("taskType is required");
        }

        if (taskType === "script" && file) {
          const formData = new FormData();
          formData.append("task_type", taskType);
          formData.append("file", file);
          if (inputData) {
            formData.append("input_data", inputData);
          }
          return {
            url: "/ai-generation",
            method: "POST",
            body: formData,
          };
        }

        return {
          url: "/ai-generation",
          method: "POST",
          body: {
            task_type: taskType,
            input_data: inputData,
          },
        };
      },
      transformResponse: (response) => {
        console.log("Generate AI Content response:", response);
        return response;
      },
      invalidatesTags: (result, error, arg) => [
        "AiUsage",
        { type: "AiGenerations", id: arg?.taskType ?? "all" },
        { type: "AiGenerations", id: "all" },
      ],
    }),
  }),
});

export const {
  useGetAiUsageQuery,
  useGetRecentGenerationsQuery,
  useGenerateAiContentMutation,
} = aiCreatorApi;
