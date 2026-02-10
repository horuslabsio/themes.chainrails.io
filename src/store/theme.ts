import { proxy } from "valtio";
import type { Theme, ThemeFilter, ThemeCategory } from "../types/theme";
import { themeApi, type ThemeListQuery, type CreateThemePayload, type UpdateThemePayload, ApiError } from "../utils/api";

export const themeStore = proxy({
  themes: [] as Theme[],
  myThemes: [] as Theme[],
  currentTheme: null as Theme | null,
  filter: {
    search: "",
    category: undefined,
    status: undefined,
    visibility: undefined,
  } as ThemeFilter,

  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  myPagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },

  isLoading: false,
  isLoadingMine: false,
  isCreating: false,
  isUpdating: false,
  isSubmitting: false,
  error: null as string | null,
});

export async function fetchThemes(query: ThemeListQuery = {}) {
  themeStore.isLoading = true;
  themeStore.error = null;
  try {
    const mergedQuery: ThemeListQuery = {
      page: themeStore.pagination.page,
      limit: themeStore.pagination.limit,
      search: themeStore.filter.search || undefined,
      category: themeStore.filter.category || undefined,
      ...query,
    };
    const response = await themeApi.list(mergedQuery);
    themeStore.themes = response.themes;
    themeStore.pagination = response.pagination;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to load themes";
    console.error("fetchThemes error:", err);
  } finally {
    themeStore.isLoading = false;
  }
}

export async function fetchMyThemes(query: ThemeListQuery = {}) {
  themeStore.isLoadingMine = true;
  themeStore.error = null;
  try {
    const mergedQuery: ThemeListQuery = {
      page: themeStore.myPagination.page,
      limit: themeStore.myPagination.limit,
      search: themeStore.filter.search || undefined,
      category: themeStore.filter.category || undefined,
      ...query,
    };
    const response = await themeApi.listMine(mergedQuery);
    themeStore.myThemes = response.themes;
    themeStore.myPagination = response.pagination;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to load your themes";
    console.error("fetchMyThemes error:", err);
  } finally {
    themeStore.isLoadingMine = false;
  }
}

export async function fetchThemeBySlug(slug: string) {
  themeStore.isLoading = true;
  themeStore.error = null;
  try {
    const theme = await themeApi.getBySlug(slug);
    themeStore.currentTheme = theme;
    return theme;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to load theme";
    console.error("fetchThemeBySlug error:", err);
    return null;
  } finally {
    themeStore.isLoading = false;
  }
}

export async function fetchMyThemeBySlug(slug: string) {
  themeStore.isLoading = true;
  themeStore.error = null;
  try {
    const theme = await themeApi.getMyThemeBySlug(slug);
    themeStore.currentTheme = theme;
    return theme;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to load theme";
    console.error("fetchMyThemeBySlug error:", err);
    return null;
  } finally {
    themeStore.isLoading = false;
  }
}

export async function createTheme(payload: CreateThemePayload) {
  themeStore.isCreating = true;
  themeStore.error = null;
  try {
    const theme = await themeApi.create(payload);
    return theme;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to create theme";
    console.error("createTheme error:", err);
    return null;
  } finally {
    themeStore.isCreating = false;
  }
}

export async function updateTheme(id: string, payload: UpdateThemePayload) {
  themeStore.isUpdating = true;
  themeStore.error = null;
  try {
    const theme = await themeApi.update(id, payload);
    themeStore.currentTheme = theme;
    return theme;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to update theme";
    console.error("updateTheme error:", err);
    return null;
  } finally {
    themeStore.isUpdating = false;
  }
}

export async function submitTheme(id: string) {
  themeStore.isSubmitting = true;
  themeStore.error = null;
  try {
    const theme = await themeApi.submit(id);
    themeStore.currentTheme = theme;
    return theme;
  } catch (err) {
    themeStore.error = err instanceof ApiError ? err.message : "Failed to submit theme";
    console.error("submitTheme error:", err);
    return null;
  } finally {
    themeStore.isSubmitting = false;
  }
}

export async function fetchThemeCss(slug: string, isMine = false) {
  try {
    if (isMine) {
      return await themeApi.getMyCss(slug);
    }
    return await themeApi.getCss(slug);
  } catch (err) {
    console.error("fetchThemeCss error:", err);
    return null;
  }
}

export function updateFilter(newFilter: Partial<ThemeFilter>) {
  Object.assign(themeStore.filter, newFilter);
}

export function setPage(page: number) {
  themeStore.pagination.page = page;
}

export function setMyPage(page: number) {
  themeStore.myPagination.page = page;
}

export const THEME_CATEGORIES: { value: ThemeCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gaming", label: "Gaming" },
  { value: "health", label: "Health & Wellness" },
  { value: "travel", label: "Travel" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "others", label: "Others" },
];
