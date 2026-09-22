import { useEffect, useRef, useState } from "react";
import type { Theme } from "../types/theme";

interface ThemePreviewProps {
  theme: Theme;
}

const PREVIEW_URL =
  "https://chainrails-frontend-git-staging-horus-labs.vercel.app/pay/2000";
const SESSION_URL =
  "https://chainrails-sdk-server.vercel.app/test/create-session?amount=2000&destinationChain=BASE&recipient=0xda3ecb2e5362295e2b802669dd47127a61d9ce54&token=USDC";
const LOGO_URL =
  "https://dev.chainrails.io/api/v1/images/e33c5a93-a29e-4112-84eb-82ec685a5a14";

export default function ThemePreview({ theme }: ThemePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [session, setSession] = useState<unknown>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(SESSION_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Preview session unavailable");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setSession(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const frame = iframeRef.current;
    if (!frame || !session) return;

    const sendSession = () => {
      const data = session as { sessionToken?: string; session_token?: string };
      const sessionToken = data.sessionToken ?? data.session_token;
      if (!sessionToken) {
        setFailed(true);
        return;
      }

      frame.contentWindow?.postMessage(
        {
          type: "session",
          session_token: sessionToken,
          environment: "staging",
          css: theme.css_content || "",
          styles: { theme: "light" },
          client: {
            name: "Horus Labs",
            logoUrl: LOGO_URL,
            paymasterEnabled: false,
            merchantKybVerified: true,
          },
        },
        "*",
      );
    };

    frame.addEventListener("load", sendSession);
    sendSession();
    return () => frame.removeEventListener("load", sendSession);
  }, [session, theme.css_content]);

  return (
    <div className="pointer-events-none relative h-50 overflow-hidden rounded-xl bg-[#070A10] select-none">
      {failed ? (
        <div className="flex h-full items-center justify-center text-xs text-white/60">
          Preview unavailable
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          title={`${theme.name} payment preview`}
          src={PREVIEW_URL}
          className="absolute left-1/2 top-0 h-[1000px] w-[568px] origin-top -translate-x-1/2 scale-[0.5] border-0"
          style={{ translate: "-17.75rem -13.5rem" }}
          loading="lazy"
        />
      )}
    </div>
  );
}
