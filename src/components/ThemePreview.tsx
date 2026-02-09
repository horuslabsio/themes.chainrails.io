import { useMemo } from "react";
import type { Theme } from "../types/theme";
import ModalPreview from "./ModalPreview";

interface ThemePreviewProps {
  theme: Theme;
  scale?: number;
}

export default function ThemePreview({ theme, scale = 0.5 }: ThemePreviewProps) {
  const scopeId = useMemo(() => `theme-preview-${theme.id}`, [theme.id]);

  const scopedCss = useMemo(() => {
    if (!theme.css) return "";
    return theme.css.replace(/([^\r\n,{}]+)(?=\{)/g, (match) => {
      const selectors = match.split(",");
      return selectors
        .map((sel) => {
          sel = sel.trim();
          // Skip at-rules and keyframes for simplicity
          if (sel.startsWith("@") || sel.match(/^\d+%$/) || sel === "from" || sel === "to") {
            return sel;
          }
          return `#${scopeId} ${sel}`;
        })
        .join(", ");
    });
  }, [theme.css, scopeId]);

  return (
    <div
      id={`theme-preview-${theme.id}`}
      className="overflow-hidden pointer-events-none select-none bg-[#070A10] h-50 pt-15 rounded-xl grid place-content-center"
    >
      <div
        id={scopeId}
        className="origin-center"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <ModalPreview screen="selectMethod" customCss={scopedCss} />
      </div>
    </div>
  );
}
