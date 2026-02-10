import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  themeApi,
  type ThemeListQuery,
  type CreateThemePayload,
  type UpdateThemePayload,
  type ThemeListResponse,
  type ApiTheme,
} from "../utils/api";

export const themeKeys = {
  all: ["themes"] as const,
  lists: () => [...themeKeys.all, "list"] as const,
  list: (query: ThemeListQuery) => [...themeKeys.lists(), query] as const,
  myLists: () => [...themeKeys.all, "my-list"] as const,
  myList: (query: ThemeListQuery) => [...themeKeys.myLists(), query] as const,
  details: () => [...themeKeys.all, "detail"] as const,
  detail: (slug: string) => [...themeKeys.details(), slug] as const,
  myDetails: () => [...themeKeys.all, "my-detail"] as const,
  myDetail: (slug: string) => [...themeKeys.myDetails(), slug] as const,
};

export function useThemes(query: ThemeListQuery) {
  return useQuery<ThemeListResponse>({
    queryKey: themeKeys.list(query),
    queryFn: () => themeApi.list(query),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useMyThemes(query: ThemeListQuery, enabled = true) {
  return useQuery<ThemeListResponse>({
    queryKey: themeKeys.myList(query),
    queryFn: () => themeApi.listMine(query),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
    enabled,
  });
}

export function useThemeBySlug(slug: string | undefined) {
  return useQuery<ApiTheme>({
    queryKey: themeKeys.detail(slug!),
    queryFn: () => themeApi.getBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMyThemeBySlug(slug: string | undefined) {
  return useQuery<ApiTheme>({
    queryKey: themeKeys.myDetail(slug!),
    queryFn: () => themeApi.getMyThemeBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateThemePayload) => themeApi.create(payload),
    onSuccess: () => {
      // Invalidate all theme lists so they refetch
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: themeKeys.myLists() });
    },
  });
}

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateThemePayload }) => themeApi.update(id, payload),
    onSuccess: (updatedTheme) => {
      // Update the cache for this specific theme
      queryClient.setQueryData(themeKeys.myDetail(updatedTheme.slug), updatedTheme);
      queryClient.setQueryData(themeKeys.detail(updatedTheme.slug), updatedTheme);
      // Invalidate lists so counts/statuses refresh
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: themeKeys.myLists() });
    },
  });
}

export function useSubmitTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => themeApi.submit(id),
    onSuccess: (submittedTheme) => {
      queryClient.setQueryData(themeKeys.myDetail(submittedTheme.slug), submittedTheme);
      queryClient.invalidateQueries({ queryKey: themeKeys.myLists() });
      queryClient.invalidateQueries({ queryKey: themeKeys.lists() });
    },
  });
}
