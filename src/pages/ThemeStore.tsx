import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { themeStore } from "../store/theme";
import { Link, Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThemePreview from "../components/ThemePreview";
import { cn } from "../utils/cn";
import Button from "../components/Button";

const CATEGORIES = ["All", "Gaming", "Technology", "Health & Wellness", "Travel", "Finance", "Education"];
const ITEMS_PER_PAGE = 8;

export default function ThemeStore() {
  const snap = useSnapshot(themeStore);
  const themes = snap.getFilteredThemes();
  const [activeCategory, setActiveCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const totalPages = Math.ceil(themes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentThemes = themes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
    setPageInput("1");
  }, [activeCategory, themes.length]); // Reset on category or data change

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setPageInput(page.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handleInputBlur = () => {
    let page = parseInt(pageInput);
    if (isNaN(page) || page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    handlePageChange(page);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
      (e.target as HTMLInputElement).blur();
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
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
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3 py-2 text-xs font-normal cursor-pointer",
                activeCategory === category
                  ? "bg-[#111111] text-white font-bold rounded-3xl"
                  : "bg-[#F3F4F6] text-[#878787] rounded-lg hover:bg-[linear-gradient(180deg,#2F2F2FEE_0%,#0B0B0BEE_100%)] hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="flex flex-wrap gap-4 mb-7 justify-evenly w-full">
          {currentThemes.map((theme) => (
            <div key={theme.id} className="group flex flex-col w-74">
              <Link
                to={`/theme/${theme.slug}`}
                className="bg-[#F3F3F3] flex flex-col relative group-hover:shadow-xs transition-all duration-100 py-3 px-4 rounded-2xl"
              >
                <ThemePreview theme={theme} />
                <h3 className="mt-4 font-medium text-base text-black mb-1.5 group-hover:underline decoration-1.5 underline-offset-2">
                  {theme.name}
                </h3>
                <p className="text-sm text-[#454545] mb-1.5 line-clamp-2 leading-[1.2]">{theme.description}</p>
                <Link
                  to="#"
                  className="w-fit text-xs text-[#00000099] border-b border-[#CCCCCC] pb-0.5 hover:text-black hover:border-black transition-colors font-mono"
                >
                  by {theme.author}
                </Link>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <ChevronLeft size={16} className="-ml-1.5" />
              Prev
            </Button>
            <div className="flex items-center gap-1 text-xs text-[#DBDBDB]">
              {renderPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="w-7.5 h-7.5 flex items-center justify-center">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      "w-7.5 h-7.5 flex items-center justify-center rounded-lg border cursor-pointer",
                      currentPage === page ? "text-[#4F4F4F] border-[#DEDEDE]" : " hover:text-[#888888] border-transparent",
                    )}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <Button variant="secondary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
            of {totalPages}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
