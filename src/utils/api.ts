import { authStore, clearAccessToken } from "../store/auth";

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL || "https://api.chainrails.io";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = false, ...init } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (auth && authStore.accessToken) {
    headers["Authorization"] = `Bearer ${authStore.accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1${path}`, {
    ...init,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    clearAccessToken();
    throw new ApiError("Unauthorized", 401);
  }

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    const message = (data as { message?: string })?.message || response.statusText;
    throw new ApiError(message, response.status, data);
  }

  const text = await response.text();
  if (!text) return undefined as T;

  return JSON.parse(text) as T;
}

export interface CreateThemePayload {
  name: string;
  description?: string;
  category: ThemeCategory;
  visibility: "public" | "private";
}

export interface UpdateThemePayload {
  name?: string;
  description?: string;
  category?: ThemeCategory;
  visibility?: "public" | "private";
  cssContent?: string;
}

export type ThemeCategory = "gaming" | "health" | "travel" | "finance" | "education" | "others";

export interface ThemeListQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  visibility?: string;
  category?: ThemeCategory;
}

export interface ApiTheme {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ThemeCategory;
  authorId: string;
  visibility: "public" | "private";
  status: "draft" | "pending" | "approved" | "rejected";
  css: string;
  cssHash: string | null;
  cssSize: number | null;
  cdnUrl: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeListResponse {
  themes: ApiTheme[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function buildQuery(params: Record<string, unknown>): string {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return qs ? `?${qs}` : "";
}

export const themeApi = {
  create(payload: CreateThemePayload): Promise<ApiTheme> {
    return request<ApiTheme>("/themes", {
      method: "POST",
      body: payload,
      auth: true,
    });
  },

  list(query: ThemeListQuery = {}): Promise<ThemeListResponse> {
    const qs = buildQuery(query as Record<string, unknown>);
    return request<ThemeListResponse>(`/themes${qs}`);
  },

  listMine(query: ThemeListQuery = {}): Promise<ThemeListResponse> {
    const qs = buildQuery(query as Record<string, unknown>);
    return request<ThemeListResponse>(`/themes/client${qs}`, { auth: true });
  },

  getBySlug(slug: string): Promise<ApiTheme> {
    return request<ApiTheme>(`/themes/${slug}`);
  },

  getMyThemeBySlug(slug: string): Promise<ApiTheme> {
    return request<ApiTheme>(`/themes/client/${slug}`, { auth: true });
  },

  getCss(slug: string): Promise<string> {
    return fetch(`${API_BASE_URL}/api/v1/themes/${slug}/css`).then((res) => {
      if (!res.ok) throw new ApiError("Failed to fetch CSS", res.status);
      return res.text();
    });
  },

  getMyCss(slug: string): Promise<string> {
    const headers: Record<string, string> = {};
    if (authStore.accessToken) {
      headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    }
    return fetch(`${API_BASE_URL}/api/v1/themes/client/${slug}/css`, {
      headers,
    }).then((res) => {
      if (!res.ok) throw new ApiError("Failed to fetch CSS", res.status);
      return res.text();
    });
  },

  update(id: string, payload: UpdateThemePayload): Promise<ApiTheme> {
    return request<ApiTheme>(`/themes/${id}`, {
      method: "PUT",
      body: payload,
      auth: true,
    });
  },

  submit(id: string): Promise<ApiTheme> {
    return request<ApiTheme>(`/themes/${id}/submit`, {
      method: "POST",
      auth: true,
    });
  },
};

export { ApiError };
