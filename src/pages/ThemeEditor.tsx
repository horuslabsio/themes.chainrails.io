import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CodeMirror from "@uiw/react-codemirror";
import { css as cssLang } from "@codemirror/lang-css";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { ThemeModalScreen } from "../types/theme";
import MockModal from "../components/ModalPreview";
import Button from "../components/Button";
import { cn } from "../utils/cn";

const modalScreens: { key: ThemeModalScreen; label: string }[] = [
  { key: "selectMethod", label: "Select Method" },
  { key: "payToAddress", label: "Pay to Address" },
  { key: "payWithWallet", label: "Pay with Wallet" },
  { key: "connectToWallet", label: "Connect Wallet" },
  { key: "transferToAddress", label: "Transfer to Address" },
  { key: "transferWithWallet", label: "Transfer with Wallet" },
  { key: "addRefundAddress", label: "Add Refund Address" },
  { key: "initiatingTransfer", label: "Initiating Transfer" },
  { key: "confirmation", label: "Confirmation" },
];

export default function ThemeEditor() {
  const { themeName } = useParams<{ themeName: string }>();
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<ThemeModalScreen>("selectMethod");

  const [themeInfo, setThemeInfo] = useState<{
    name: string;
    description: string;
    visibility: "public" | "private";
    slug: string;
  } | null>(null);

  const [css, setCss] = useState(`/* Start editing your theme here */
@import url('https://fonts.cdnfonts.com/css/inter');
@import url('https://fonts.cdnfonts.com/css/google-sans');

.cr-payment-modal {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.cr-button-primary {
  cursor: pointer;
}

.cr-amount-desc, 
.cr-amount-value {
    font-family: 'Product Sans', -apple-system, 'Helvetica Neue', sans-serif;
    letter-spacing: -2%;
}`);

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedCss, setSavedCss] = useState("");
  const [editorWidthPct, setEditorWidthPct] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load theme info from localStorage or API
    if (themeName) {
      const storedTheme = localStorage.getItem(`theme-${themeName}`);
      if (storedTheme) {
        setThemeInfo(JSON.parse(storedTheme));

        // Load existing CSS if available
        const storedCss = localStorage.getItem(`theme-${themeName}-css`);
        if (storedCss) {
          setCss(storedCss);
          setSavedCss(storedCss);
        } else {
          setSavedCss(css);
        }
      } else {
        // Fallback for demo if not found in local storage
        setThemeInfo({
          name: themeName || "Demo Theme",
          description: "A demo theme",
          visibility: "public",
          slug: themeName || "demo-theme",
        });
        // Theme not found, redirect to create page
        // navigate("/create");
      }
    }
  }, [themeName, navigate]);

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(css !== savedCss);
  }, [css, savedCss]);

  const handleCssChange = useCallback((value: string) => {
    setCss(value);
  }, []);

  const updateWidthsFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clampedX = Math.min(Math.max(clientX - rect.left, 240), rect.width - 240);
    const pct = (clampedX / rect.width) * 100;
    setEditorWidthPct(Number(pct.toFixed(2)));
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      if ("touches" in e) {
        updateWidthsFromClientX(e.touches[0].clientX);
      } else {
        updateWidthsFromClientX(e.clientX);
      }
    },
    [updateWidthsFromClientX],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      updateWidthsFromClientX(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      updateWidthsFromClientX(e.touches[0].clientX);
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("touchcancel", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("touchcancel", handleEnd);
    };
  }, [updateWidthsFromClientX]);

  const handleSave = useCallback(
    async (status: "draft" | "submitted") => {
      if (!themeInfo) return;

      setIsSaving(true);

      try {
        // Save CSS to localStorage (in a real app, this would be an API call)
        localStorage.setItem(`theme-${themeInfo.slug}-css`, css);

        // Update saved state
        setSavedCss(css);
        setHasUnsavedChanges(false);

        // Update theme info with status
        const updatedTheme = {
          ...themeInfo,
          status,
          css,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`theme-${themeInfo.slug}`, JSON.stringify(updatedTheme));

        // Show success message
        toast.success(status === "submitted" ? "Theme published!" : "Draft saved!");

        if (status === "submitted") {
          // Redirect to theme details or dashboard
          // navigate(`/theme/${themeInfo.slug}`);
        }
      } catch (error) {
        toast.error("Error saving theme. Please try again.");
      } finally {
        setIsSaving(false);
      }
    },
    [themeInfo, css, navigate],
  );

  // Handle Ctrl+S save shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          handleSave("draft");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, isSaving, handleSave]);

  if (!themeInfo) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2B2B2B] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-[#6B7280]">Loading theme...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-white">
      {/* Secondary Toolbar */}
      <div className="h-16 border-b border-[#EFEFEF] bg-white px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white border border-[#EDEDED] rounded-md">
            <FileText className="w-4 h-4 text-[#8C8C8C]" />
          </div>
          <span className="font-medium text-[#2F2F2F]">{themeInfo.name || "untitled"}.css</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => handleSave("draft")}>
            Save Draft
          </Button>
          <Button variant="primary" onClick={() => handleSave("submitted")}>
            Publish
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div
          className="h-full border-r border-[#EFEFEF] bg-white flex flex-col min-w-[240px]"
          style={{ width: `${editorWidthPct}%` }}
        >
          <div className="flex-1 overflow-auto">
            <CodeMirror
              value={css}
              height="100%"
              extensions={[cssLang()]}
              onChange={handleCssChange}
              className="h-full text-[14px]"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                foldGutter: true,
              }}
            />
          </div>
        </div>

        {/* Splitter */}
        <div
          className="group relative w-3 cursor-col-resize bg-[#EFEFEF] hover:bg-[#E0E0E0] transition-colors duration-150 flex items-center justify-center"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize editor and preview"
        >
          <div className="flex flex-col gap-1 items-center">
            <div className="w-1 h-1 rounded-full bg-[#B0B0B0] group-hover:bg-[#888]" />
            <div className="w-1 h-1 rounded-full bg-[#B0B0B0] group-hover:bg-[#888]" />
            <div className="w-1 h-1 rounded-full bg-[#B0B0B0] group-hover:bg-[#888]" />
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className="col-span-1 min-w-[240px] bg-[#F1F1F1] rounded-xl relative flex flex-col items-center h-[calc(100vh-160px)] overflow-hidden"
          style={{ width: `${100 - editorWidthPct}%` }}
        >
          <Button variant="secondary" size="sm" className="absolute top-5 left-5 pointer-events-none w-15 h-5.5">
            Preview
          </Button>

          <div className="flex-1 flex items-end justify-center w-full pb-4 h-full overflow-hidden">
            <div className="scale-75 origin-bottom">
              <MockModal screen={activeScreen} customCss={savedCss} />
            </div>
          </div>

          <div className="flex items-center gap-1 pb-4 z-10 w-full justify-center">
            <button
              onClick={() => {
                const idx = modalScreens.findIndex((s) => s.key === activeScreen);
                const prev = (idx - 1 + modalScreens.length) % modalScreens.length;
                setActiveScreen(modalScreens[prev].key);
              }}
              className="flex w-8 h-8 justify-center items-center rounded-full border border-[#EFEFEF] bg-[#FFF]"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="bg-white rounded-full px-4 h-8 flex items-center gap-2 shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
              {modalScreens.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveScreen(s.key)}
                  className={cn(
                    "rounded-full cursor-pointer",
                    activeScreen === s.key ? "w-5 h-2 bg-black" : "w-2 h-2 bg-[#ECECEC] hover:bg-[#D4D4D4]",
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => {
                const idx = modalScreens.findIndex((s) => s.key === activeScreen);
                const next = (idx + 1) % modalScreens.length;
                setActiveScreen(modalScreens[next].key);
              }}
              className="flex w-8 h-8 justify-center items-center rounded-full border border-[#EFEFEF] bg-[#FFF]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
