import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import type { ThemeModalScreen } from "../types/theme";
import MockModal from "../components/ModalPreview";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Button from "../components/Button";
import { cn } from "../utils/cn";
import { useThemeBySlug } from "../hooks/useThemeQueries";

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

export default function ThemeDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: theme, isLoading, error } = useThemeBySlug(slug);
  const [activeScreen, setActiveScreen] = useState<ThemeModalScreen>("selectMethod");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#888]" />
        <span className="ml-2 text-sm text-[#888]">Loading theme...</span>
      </div>
    );
  }

  if (error || !theme) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Theme Not Found</h1>
          <p className="text-gray-600 mb-6">The theme you're looking for doesn't exist.</p>
          <Link to="/" className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Back to Theme Store
          </Link>
        </div>
      </div>
    );
  }

  const handleUseTheme = () => {
    const code = `<ChainrailsModal theme="${theme.slug}" />`;
    navigator.clipboard.writeText(code);
    toast.success("Usage code copied to clipboard!");
  };

  return (
    <div className="py-4">
      {/* Breadcrumb */}
      <nav className="pl-25 pr-22 mb-4 pb-3 border-b border-[#EFEFEF]">
        <Link to="/" className="flex w-8 h-8 justify-center items-center rounded-full border border-[#E4E4E4] bg-[#EEE]">
          <ChevronLeft size={20} />
        </Link>
      </nav>

      <div className="pl-25 pr-22 grid grid-cols-[42fr_58fr] gap-2">
        {/* Theme Info */}
        <div className="col-span-1 min-w-0">
          <div className="bg-white border border-[#F2F2F2] rounded-2xl p-8">
            <div>
              <h1 className="text-5xl font-medium mb-2">{theme.name}</h1>
              <span className="text-xs text-[#00000066]">{theme.category}</span>
            </div>

            <p className="text-sm text-[#454545] my-8 max-w-88">{theme.description || "No description"}</p>

            <div className="font-mono text-xs text-[#00000099]">
              <div className="border-t border-[#EFEFEF] flex items-center justify-between py-2">
                <span>Status</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium",
                    theme.status === "approved" && "bg-green-100 text-green-700",
                    theme.status === "pending" && "bg-yellow-100 text-yellow-700",
                    theme.status === "draft" && "bg-gray-100 text-gray-600",
                    theme.status === "rejected" && "bg-red-100 text-red-700",
                  )}
                >
                  {theme.status}
                </span>
              </div>
              <div className="border-t border-[#EFEFEF] flex items-center justify-between py-2">
                <span>Visibility</span>
                <span>{theme.visibility}</span>
              </div>
              <div className="border-t border-[#EFEFEF] flex items-center justify-between py-2">
                <span>Created</span>
                <span>{new Date(theme.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="border-t border-[#EFEFEF] flex items-center justify-between py-2">
                <span>Updated</span>
                <span>{new Date(theme.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg mt-6 overflow-hidden">
              <CodeMirror
                value={`<PaymentModal theme="${theme.slug}" />`}
                extensions={[javascript({ jsx: true })]}
                readOnly
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: false,
                  bracketMatching: true,
                  closeBrackets: false,
                  autocompletion: false,
                  highlightSelectionMatches: false,
                }}
                className="text-base pointer-events-none"
              />
            </div>

            <Button onClick={handleUseTheme} size="md" className="w-full mt-4 rounded-3xl font-bold font-normal">
              Use This Theme
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="col-span-1 min-w-0 bg-[#F1F1F1] rounded-xl relative flex flex-col items-center h-[calc(100vh-160px)] overflow-hidden">
          <Button variant="secondary" size="sm" className="absolute top-5 left-5 pointer-events-none w-15 h-5.5">
            Preview
          </Button>

          <div className="flex-1 flex items-end justify-center w-full pb-4 h-full overflow-hidden">
            <div className="scale-75 origin-bottom">
              <MockModal screen={activeScreen} customCss={theme.css} />
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
