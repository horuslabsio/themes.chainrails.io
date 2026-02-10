import { useState } from "react";
import { useAuthStore } from "../store/auth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import ThemePreview from "../components/ThemePreview";
import { cn } from "../utils/cn";
import Button from "../components/Button";
import type { ThemeCategory } from "../types/theme";
import { useThemes, useMyThemes } from "../hooks/useThemeQueries";
import { THEME_CATEGORIES } from "../store/theme";

const ITEMS_PER_PAGE = 8;

export default function ThemeStore() {
  const { accessToken } = useAuthStore();
  const location = useLocation();
  const isMinePage = location.pathname.startsWith("/mine");

  const [activeCategory, setActiveCategory] = useState<ThemeCategory | "all">("all");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const query = {
    page,
    limit: ITEMS_PER_PAGE,
    category: activeCategory === "all" ? undefined : activeCategory,
  };

  const publicQuery = useThemes(query);
  const mineQuery = useMyThemes(query, isMinePage && !!accessToken);

  const { data, isLoading, error } = isMinePage ? mineQuery : publicQuery;

  const themes = data?.themes ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: ITEMS_PER_PAGE, total: 0, totalPages: 0 };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      setPageInput(newPage.toString());
    }
  };

  const handleCategoryChange = (category: ThemeCategory | "all") => {
    setActiveCategory(category);
    setPage(1);
    setPageInput("1");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handleInputBlur = () => {
    let page = parseInt(pageInput);
    if (isNaN(page) || page < 1) page = 1;
    if (page > pagination.totalPages) page = pagination.totalPages;
    handlePageChange(page);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="overflow-y-scroll min-h-[calc(100vh-48px)] bg-[#FAFAFA] w-full pr-0">
      <div className="pl-25 pr-22 py-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {THEME_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={cn(
                "px-3 py-2 text-xs font-normal cursor-pointer",
                activeCategory === cat.value
                  ? "bg-[#111111] text-white font-bold rounded-3xl"
                  : "bg-[#F3F4F6] text-[#878787] rounded-lg hover:bg-[linear-gradient(180deg,#2F2F2FEE_0%,#0B0B0BEE_100%)] hover:text-white",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#888]" />
            <span className="ml-2 text-sm text-[#888]">Loading themes...</span>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-red-500 mb-3">{error instanceof Error ? error.message : "Something went wrong"}</p>
            <Button variant="secondary" onClick={() => (isMinePage ? mineQuery.refetch() : publicQuery.refetch())}>
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && themes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-[#888] mb-3">{isMinePage ? "You haven't created any themes yet." : "No themes found."}</p>
            {isMinePage && (
              <Link to="/create">
                <Button variant="primary">Create Your First Theme</Button>
              </Link>
            )}
          </div>
        )}

        {/* Themes Grid */}
        {!isLoading && !error && themes.length > 0 && (
          <>
            <div className="flex flex-wrap gap-4 mb-7 w-full">
              {themes.map((theme) => (
                <div key={theme.id} className="group flex flex-col w-74">
                  <Link
                    to={isMinePage && theme.status !== "approved" ? `/edit/${theme.slug}` : `/theme/${theme.slug}`}
                    className="bg-[#F3F3F3] flex flex-col relative group-hover:shadow-xs transition-all duration-100 py-3 px-4 rounded-2xl"
                  >
                    <ThemePreview theme={theme} />
                    <h3 className="mt-4 font-medium text-base text-black mb-1.5 group-hover:underline decoration-1.5 underline-offset-2">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-[#454545] mb-1.5 line-clamp-2 leading-[1.2]">
                      {theme.description || "No description"}
                    </p>
                    {isMinePage && (
                      <span
                        className={cn(
                          "mt-1 inline-flex w-fit px-2 py-0.5 text-[10px] font-medium rounded-full",
                          theme.status === "approved" && "bg-green-100 text-green-700",
                          theme.status === "pending" && "bg-yellow-100 text-yellow-700",
                          theme.status === "draft" && "bg-gray-100 text-gray-600",
                          theme.status === "rejected" && "bg-red-100 text-red-700",
                        )}
                      >
                        {theme.status}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft size={16} className="-ml-1.5" />
                    Prev
                  </Button>
                  <div className="flex items-center gap-1 text-xs text-[#DBDBDB]">
                    {renderPageNumbers().map((p, index) =>
                      p === "..." ? (
                        <span key={`ellipsis-${index}`} className="w-7.5 h-7.5 flex items-center justify-center">
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p as number)}
                          className={cn(
                            "w-7.5 h-7.5 flex items-center justify-center rounded-lg border cursor-pointer",
                            pagination.page === p
                              ? "text-[#4F4F4F] border-[#DEDEDE]"
                              : " hover:text-[#888888] border-transparent",
                          )}
                        >
                          {p}
                        </button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                    <ChevronRight size={16} className="-mr-1.5" />
                  </Button>
                </div>

                <div className="flex items-center text-xs text-[#4F4F4F]">
                  Page
                  <input
                    type="text"
                    value={pageInput}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    className="w-7.5 text-center text-[#4F4F4F] border border-[#DEDEDE] rounded-lg mx-2 py-1"
                  />
                  of {pagination.totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
