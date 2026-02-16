import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CodeMirror from "@uiw/react-codemirror";
import { css as cssLang } from "@codemirror/lang-css";
import { ChevronLeft, ChevronRight, Copy, FileText, Loader2 } from "lucide-react";
import type { ThemeModalScreen } from "../types/theme";
import MockModal from "../components/ModalPreview";
import Button from "../components/Button";
import { cn } from "../utils/cn";
import { useMyThemeBySlug, useUpdateTheme, useSubmitTheme } from "../hooks/useThemeQueries";

const modalScreens: { key: ThemeModalScreen; label: string }[] = [
  { key: "depositInputAmount", label: "Deposit: Input Amount" },
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

  const { data: fetchedTheme, isLoading: isLoadingTheme, error: loadError } = useMyThemeBySlug(themeName);
  const updateMutation = useUpdateTheme();
  const submitMutation = useSubmitTheme();

  const [themeId, setThemeId] = useState<string | null>(null);
  const [themeInfo, setThemeInfo] = useState<{
    name: string;
    description: string | null;
    visibility: "public" | "private";
    slug: string;
    status: string;
  } | null>(null);

  useEffect(() => setCss((css) => fetchedTheme?.cssContent || css), [fetchedTheme?.cssContent]);

  const [css, setCss] = useState(
    fetchedTheme?.cssContent ||
      `
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
}`,
  );

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedCss, setSavedCss] = useState("");
  const [editorWidthPct, setEditorWidthPct] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync fetched theme data into local state
  useEffect(() => {
    if (fetchedTheme) {
      setThemeId(fetchedTheme.id);
      setThemeInfo({
        name: fetchedTheme.name,
        description: fetchedTheme.description,
        visibility: fetchedTheme.visibility,
        slug: fetchedTheme.slug,
        status: fetchedTheme.status,
      });
      if (fetchedTheme.css) {
        setCss(fetchedTheme.css);
        setSavedCss(fetchedTheme.css);
      } else {
        setSavedCss(css);
      }
    }
  }, [fetchedTheme]);

  // Redirect if theme not found after loading
  useEffect(() => {
    if (!isLoadingTheme && loadError) {
      toast.error("Theme not found");
      navigate("/mine");
    }
  }, [isLoadingTheme, loadError, navigate]);

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

  const handleSave = useCallback(async () => {
    if (!themeId) return;

    try {
      const updated = await updateMutation.mutateAsync({ id: themeId, payload: { cssContent: css } });
      if (updated) {
        setSavedCss(css);
        setHasUnsavedChanges(false);
        toast.success("Draft saved!");
      }
    } catch {
      toast.error("Error saving theme. Please try again.");
    }
  }, [themeId, css, updateMutation]);

  const handlePublish = useCallback(async () => {
    if (!themeId) return;

    try {
      // First save the CSS if there are unsaved changes
      if (hasUnsavedChanges) {
        const updated = await updateMutation.mutateAsync({ id: themeId, payload: { cssContent: css } });
        if (!updated) {
          toast.error("Failed to save CSS before publishing.");
          return;
        }
        setSavedCss(css);
        setHasUnsavedChanges(false);
      }

      // Then submit for review
      const submitted = await submitMutation.mutateAsync(themeId);
      if (submitted) {
        setThemeInfo((prev) => (prev ? { ...prev, status: "pending" } : prev));
        toast.success("Theme submitted for review!");
      }
    } catch {
      toast.error("Error publishing theme. Please try again.");
    }
  }, [themeId, css, hasUnsavedChanges, updateMutation, submitMutation]);

  // Handle Ctrl+S save shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges && !updateMutation.isPending) {
          handleSave();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, updateMutation.isPending, handleSave]);

  if (isLoadingTheme) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2B2B2B] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-[#6B7280]">Loading theme...</p>
        </div>
      </div>
    );
  }

  if (!themeInfo) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B7280] mb-4">Theme not found</p>
          <Button variant="primary" onClick={() => navigate("/mine")}>
            Back to My Themes
          </Button>
        </div>
      </div>
    );
  }

  const canEdit = themeInfo.status === "draft" || themeInfo.status === "rejected";
  const canPublish = canEdit && css.trim().length > 0;

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-white">
      {/* Secondary Toolbar */}
      <div className="h-16 border-b border-[#EFEFEF] bg-white px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white border border-[#EDEDED] rounded-md">
            <FileText className="w-4 h-4 text-[#8C8C8C]" />
          </div>
          <span className="font-medium text-[#2F2F2F]">{themeInfo.name || "untitled"}.css</span>
          {themeInfo.status === "pending" && (
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-yellow-100 text-yellow-700">
              Under Review
            </span>
          )}
          {themeInfo.status === "approved" && (
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-100 text-green-700">Approved</span>
          )}
          {themeInfo.status === "rejected" && (
            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-100 text-red-700">Rejected</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {canEdit && (
            <>
              <Button variant="secondary" onClick={handleSave} disabled={updateMutation.isPending || !hasUnsavedChanges}>
                {updateMutation.isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
                Save Draft
              </Button>
              <Button variant="primary" onClick={handlePublish} disabled={submitMutation.isPending || !canPublish}>
                {submitMutation.isPending ? <Loader2 size={14} className="animate-spin mr-1" /> : null}
                Publish
              </Button>
            </>
          )}
          {!canEdit && (
            <span className="text-xs text-[#888]">
              {themeInfo.status === "pending" ? "Awaiting review" : "This theme cannot be edited"}
            </span>
          )}
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
              readOnly={!canEdit}
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
          className="col-span-1 min-w-[240px]bg-[#F1F1F1] rounded-xl relative flex flex-col items-center h-[calc(100vh-160px)] overflow-hidden"
          style={{ width: `${100 - editorWidthPct}%` }}
        >
          <Button variant="secondary" size="sm" className="absolute top-5 left-5 pointer-events-none w-15 h-5.5">
            Preview
          </Button>

          <div className="flex-1 flex items-end justify-center max-h-[666px] w-full pb-4 h-full overflow-hidden group pointer-events-none">
            <div className="scale-90 origin-bottom pointer-events-auto">
              <MockModal screen={activeScreen} customCss={css} />
            </div>
            <div
              className="fixed z-100 size-20 border border-dashed border-[#0052FF] top-8 left-8 pointer-events-none opacity-0 group-hover:opacity-100 bg-[#97C6EA4D]"
              style={{
                left: "var(--left)",
                top: "var(--top)",
                width: "var(--width)",
                height: "var(--height)",
              }}
            >
              <div className="absolute -top-2.5 -translate-y-full flex flex-col px-2.5 py-1.5 justify-center items-center rounded-lg border border-[#DFDFDF] bg-[#FFF] z-10">
                <p className="whitespace-pre text-sm">.cr-amount-value</p>
                <button className="ml-2.5 flex gap-1.5 items-center text-[#0052FF]">
                  <Copy size={12} />
                  <span className="text-xs whitespace-pre">click anywhere to copy</span>
                </button>
              </div>
              <div className="absolute -top-0 -translate-y-full flex flex-col px-2.5 py-1.5 justify-center items-center">
                <p className="whitespace-pre text-sm invisible">.cr-amount-value</p>
                <button className="ml-2.5 flex gap-1.5 items-center text-[#0052FF] invisible">
                  <Copy size={12} />
                  <span className="text-xs whitespace-pre">click anywhere to copy</span>
                </button>
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-135 origin-bottom"
                >
                  <path d="M8.93408 0.5H0.934082L4.93408 6.5L8.93408 0.5Z" fill="white" stroke="#DFDFDF" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 pb-4 z-10 w-full justify-center">
            <button
              onClick={() => {
                const idx = modalScreens.findIndex((s) => s.key === activeScreen);
                const prev = (idx - 1 + modalScreens.length) % modalScreens.length;
                setActiveScreen(modalScreens[prev].key);
              }}
              className="flex w-8 h-8 justify-center items-center rounded-full border border-[#EFEFEF] bg-[#FFF] cursor-pointer"
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
              className="flex w-8 h-8 justify-center items-center rounded-full border border-[#EFEFEF] bg-[#FFF] cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
