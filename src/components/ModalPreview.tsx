import type { ThemeModalScreen } from "../types/theme";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

interface ModalPreviewProps {
  screen: ThemeModalScreen;
  customCss?: string;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    preview?: {
      hover?: (element: HTMLElement) => void;
    };
  }
}

export default function ModalPreview({ screen, customCss }: ModalPreviewProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize window.preview if it doesn't exist
    if (!window.preview) {
      window.preview = {};
    }

    // Define the hover function
    window.preview.hover = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const className = Array.from(element.classList).find((cls) => cls.startsWith("cr-"));

      console.log("Hover element:", {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        className: className || "no-cr-class-found",
      });

      document.documentElement.style.setProperty("--left", `${rect.left - 2}px`);
      document.documentElement.style.setProperty("--top", `${rect.top - 2}px`);
      document.documentElement.style.setProperty("--width", `${rect.width + 4}px`);
      document.documentElement.style.setProperty("--height", `${rect.height + 4}px`);
    };
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
    e.stopPropagation();
    if (window.preview?.hover) {
      window.preview.hover(e.currentTarget as HTMLElement);
    }
  };

  const renderHead = (hasLogo: boolean, title: string, subtitle: string) => (
    <>
      <div className="cr-payment-head flex max-w-full justify-between gap-2 text-center" onMouseEnter={handleHover}>
        <button
          className={`cr-nav-button relative grid shrink-0 cursor-pointer place-content-center border p-0 transition-all duration-200 ${
            hasLogo ? "size-11.5 rounded-xl border-transparent" : "bg-bg-200 border-border-200 size-12 rounded-3xl"
          }`}
          onMouseEnter={handleHover}
        >
          <svg
            className={`cr-nav-chevron absolute inset-0 m-auto size-6 transition duration-200 ${
              hasLogo ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            onMouseEnter={handleHover}
          >
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {hasLogo && (
            <div
              className="cr-app-icon absolute inset-0 size-11 transition duration-200 scale-100 opacity-100"
              onMouseEnter={handleHover}
            >
              <div
                className="cr-logo size-11.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold"
                onMouseEnter={handleHover}
              >
                CR
              </div>
            </div>
          )}
        </button>

        <motion.div className="cr-header-content mt-0.5 flex w-full flex-col text-left" layout onMouseEnter={handleHover}>
          <motion.h1
            className={`cr-app-title mr-auto line-clamp-1 w-fit font-[inter] text-[1.25rem] leading-[106%] tracking-[-0.4px] text-[#494949] capitalize transition-[margin] duration-200 ${
              hasLogo ? "ml-0" : "ml-auto"
            }`}
            layout
            transition={{ duration: 0.2 }}
            onMouseEnter={handleHover}
          >
            {title}
          </motion.h1>
          <motion.div
            className={`cr-app-description font-inter white-space-pre mr-auto line-clamp-1 w-fit max-w-[250px] min-w-0 text-sm tracking-[-0.28px] text-[#45454599] transition-[margin] duration-200 ${
              hasLogo ? "ml-0" : "ml-auto"
            }`}
            layout
            transition={{ duration: 0.2 }}
            onMouseEnter={handleHover}
          >
            {subtitle}
          </motion.div>
        </motion.div>

        <button
          className="cr-close-button border-border-200 bg-bg-200 grid size-12 cursor-pointer place-content-center rounded-full border p-3"
          title="Close"
          onMouseEnter={handleHover}
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <hr className="cr-divider bg-bg-100-alt h-0.25 border-none" onMouseEnter={handleHover} />
    </>
  );

  const renderAmount = (compact: boolean, label: string = "Amount") => (
    <div
      className={`cr-amount-container relative flex flex-col items-start gap-4 bg-white p-4 ${
        compact ? "rounded-2xl pb-4" : "rounded-3xl pb-23.25"
      }`}
      onMouseEnter={handleHover}
    >
      <p className="cr-amount-label text-[#494949] text-[14px]" onMouseEnter={handleHover}>
        {label}
      </p>
      <p
        className={`cr-amount-value absolute left-0 w-full px-4 font-[inter] leading-[106%] tracking-[-1.16px] ease-out text-text-900 ${
          compact ? "top-4 scale-100 text-right text-[16px] font-medium" : "top-10 text-left text-[58px] font-normal"
        }`}
        onMouseEnter={handleHover}
      >
        $50.00
      </p>
    </div>
  );

  const renderFees = (compact: boolean) => {
    if (!compact) return null;
    return (
      <div
        className="cr-fees-container relative max-h-12 items-center justify-between bg-white px-4 py-3 flex rounded-2xl"
        onMouseEnter={handleHover}
      >
        <p className="cr-fees-label text-[#494949] text-[14px]" onMouseEnter={handleHover}>
          Fees
        </p>
        <p
          className="cr-fees-value flex w-fit items-center gap-2 text-right font-[inter] text-[16px] leading-[106%] font-medium tracking-[-1.16px]"
          onMouseEnter={handleHover}
        >
          <div className="size-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">U</div>
          <span>0.50 USDC</span>
        </p>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "selectMethod":
        return (
          <>
            {renderHead(true, "Chainrails", "Complete your payment")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(false)}
              {renderFees(false)}
            </div>
            <div className="cr-select-method -mt-4 flex flex-col gap-1 pt-2" onMouseEnter={handleHover}>
              <div
                className="cr-payment-options flex flex-col gap-2.5 rounded-3xl bg-white p-2.5 pt-3"
                onMouseEnter={handleHover}
              >
                <div className="cr-payment-methods flex gap-1" onMouseEnter={handleHover}>
                  <button
                    className="cr-payment-method-button cr-payment-method-crypto flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium text-sm"
                    onMouseEnter={handleHover}
                  >
                    Pay with Crypto
                  </button>
                  <button
                    className="cr-payment-method-button cr-payment-method-card flex-1 rounded-xl bg-gray-100 px-4 py-2.5 text-gray-400 font-medium text-sm flex items-center justify-center gap-2"
                    disabled
                    onMouseEnter={handleHover}
                  >
                    <svg
                      className="cr-card-icon size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      onMouseEnter={handleHover}
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                      <path d="M2 10h20" strokeWidth="2" />
                    </svg>
                    Pay with Card
                  </button>
                </div>
                <div className="cr-payment-options-list flex flex-col gap-1" onMouseEnter={handleHover}>
                  <div
                    className="cr-payment-option bg-bg-100 group flex cursor-pointer items-center gap-4 rounded-2xl px-3.5 py-3"
                    onMouseEnter={handleHover}
                  >
                    <p
                      className="cr-payment-option-text text-[14px] text-text-800 group-hover:text-text-900"
                      onMouseEnter={handleHover}
                    >
                      Pay from wallet
                    </p>
                    <div className="cr-payment-option-networks ml-auto flex -space-x-2" onMouseEnter={handleHover}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="size-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className="cr-payment-option bg-bg-100 group flex cursor-pointer items-center gap-4 rounded-2xl px-3.5 py-3"
                    onMouseEnter={handleHover}
                  >
                    <p
                      className="cr-payment-option-text text-[14px] text-text-800 group-hover:text-text-900"
                      onMouseEnter={handleHover}
                    >
                      Pay with transfer
                    </p>
                    <div className="cr-payment-option-networks ml-auto flex -space-x-2" onMouseEnter={handleHover}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="size-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "payWithWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Wallet")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Payment Amount")}
              {renderFees(true)}
            </div>
            <div className="cr-wallet-list-container relative flex flex-col gap-2.5" onMouseEnter={handleHover}>
              <p className="cr-wallet-list-title text-text-700/60 ml-2 text-sm text-[14px]" onMouseEnter={handleHover}>
                Select Wallet
              </p>
              <div className="cr-wallet-list flex max-h-[250px] flex-col gap-1 overflow-y-auto" onMouseEnter={handleHover}>
                {["MetaMask", "WalletConnect", "Coinbase Wallet", "Rainbow", "Trust Wallet"].map((wallet, i) => (
                  <motion.div
                    key={wallet}
                    transition={{ bounce: 1, delay: i * 0.025, duration: 0.2 }}
                    className="cr-wallet-item flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-2xl bg-[#F2F2F2] px-4 py-2"
                    onMouseEnter={handleHover}
                  >
                    <div className="cr-wallet-item-content flex items-center gap-2" onMouseEnter={handleHover}>
                      <div
                        className="cr-wallet-icon size-7 overflow-clip rounded-[6px] bg-gradient-to-br from-orange-400 to-pink-500"
                        onMouseEnter={handleHover}
                      />
                      <p className="cr-wallet-name text-[#2F2F2F]" onMouseEnter={handleHover}>
                        {wallet}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        );

      case "connectToWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Connecting to Wallet")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Payment Amount")}
              {renderFees(true)}
            </div>
            <div className="cr-connecting-wallet-container flex flex-col items-center gap-6 py-8" onMouseEnter={handleHover}>
              <div
                className="cr-wallet-connecting-icon size-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"
                onMouseEnter={handleHover}
              />
              <div className="cr-connecting-wallet-content flex flex-col gap-2 text-center" onMouseEnter={handleHover}>
                <p className="cr-connecting-wallet-title font-medium text-[#2F2F2F]" onMouseEnter={handleHover}>
                  Connecting to MetaMask
                </p>
                <p className="cr-connecting-wallet-subtitle text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                  Please confirm in your wallet
                </p>
              </div>
            </div>
          </>
        );

      case "payToAddress":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Chain/Network")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Pay")}
              {renderFees(true)}
            </div>
            <div className="cr-chain-list-container relative flex flex-col gap-2.5" onMouseEnter={handleHover}>
              <p className="cr-chain-list-title text-text-700/60 ml-2 text-sm text-[14px]" onMouseEnter={handleHover}>
                Select Chain
              </p>
              <div className="cr-chain-list relative flex h-[250px] flex-col gap-1 overflow-y-auto" onMouseEnter={handleHover}>
                {[
                  { name: "Ethereum", time: "≈30s", fee: "0.50" },
                  { name: "Polygon", time: "≈30s", fee: "0.25" },
                  { name: "Arbitrum", time: "≈30s", fee: "0.30" },
                  { name: "Optimism", time: "≈30s", fee: "0.35" },
                  { name: "Base", time: "≈30s", fee: "0.20" },
                ].map((chain) => (
                  <div
                    key={chain.name}
                    className="cr-chain-item flex max-h-12 cursor-pointer items-center justify-between gap-2 rounded-2xl px-4 py-2 bg-bg-100-alt"
                    onMouseEnter={handleHover}
                  >
                    <div className="cr-chain-item-content flex items-center gap-2" onMouseEnter={handleHover}>
                      <div
                        className="cr-chain-icon size-7 overflow-clip rounded-[6px] bg-gradient-to-br from-purple-400 to-blue-500"
                        onMouseEnter={handleHover}
                      />
                      <p className="cr-chain-name text-[#2F2F2F] capitalize" onMouseEnter={handleHover}>
                        {chain.name}
                      </p>
                    </div>
                    <div
                      className="cr-chain-item-details flex flex-col items-end text-xs text-[#6D6D6D]"
                      onMouseEnter={handleHover}
                    >
                      <p className="cr-chain-time flex items-center gap-1" onMouseEnter={handleHover}>
                        <span className="cr-chain-time-icon" onMouseEnter={handleHover}>
                          ⏳
                        </span>
                        <span className="cr-chain-time-value text-[#0A9355]" onMouseEnter={handleHover}>
                          {chain.time}
                        </span>
                      </p>
                      <p className="cr-chain-fee" onMouseEnter={handleHover}>
                        Fee: {chain.fee} USDC
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "addRefundAddress":
        return (
          <>
            {renderHead(false, "Chainrails", "Add Refund Address")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Payment Amount")}
              {renderFees(true)}
            </div>
            <div className="cr-refund-address-container flex flex-col gap-4" onMouseEnter={handleHover}>
              <div
                className="cr-refund-info-box bg-brand-lightblue flex w-full items-start gap-3 rounded-2xl p-4 pr-7"
                onMouseEnter={handleHover}
              >
                <svg
                  className="cr-refund-info-icon text-brand-blue mt-0.75 shrink-0 size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  onMouseEnter={handleHover}
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div
                  className="cr-refund-info-content -mt-1 font-[inter] text-[12px] -tracking-[0.24px]"
                  onMouseEnter={handleHover}
                >
                  <h4 className="cr-refund-info-title text-brand-blue" onMouseEnter={handleHover}>
                    Refund Processing
                  </h4>
                  <p className="cr-refund-info-text text-text-700 text-[11.5px]" onMouseEnter={handleHover}>
                    In the event we encounter an issue processing your payment, we'd like to automatically refund. Below, enter
                    the Wallet Address you'd like to be refunded to.
                  </p>
                </div>
              </div>
              <form
                className="cr-refund-address-form bg-bg-000 relative flex flex-col items-start justify-center gap-1.5 self-stretch rounded-2xl px-4 py-2.5"
                onMouseEnter={handleHover}
              >
                <label
                  htmlFor="address"
                  className="cr-refund-address-label text-text-700 font-[inter] text-[12px] -tracking-[-0.24px]"
                  onMouseEnter={handleHover}
                >
                  Enter Wallet Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Type or Paste Address"
                  className="cr-refund-address-input placeholder:text-text-800-alt text-text-900-alt w-full !border-none font-[inter] -tracking-[0.28px] !outline-none"
                  onMouseEnter={handleHover}
                />
                <button
                  className="cr-paste-button bg-bg-000 absolute right-2 bottom-2 size-8 cursor-pointer p-2"
                  type="button"
                  onMouseEnter={handleHover}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                  </svg>
                </button>
              </form>
              <button
                className="cr-refund-submit-button !h-10 w-full rounded-xl bg-blue-600 text-white font-medium"
                onMouseEnter={handleHover}
              >
                Skip
              </button>
            </div>
          </>
        );

      case "transferToAddress":
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <div className="grid gap-0.75">
              {renderAmount(true)}
              {renderFees(true)}
            </div>
            <div className="cr-transfer-to-address-container flex flex-col gap-4" onMouseEnter={handleHover}>
              <div
                className="cr-qr-code-container bg-white rounded-2xl p-6 flex items-center justify-center"
                onMouseEnter={handleHover}
              >
                <div
                  className="cr-qr-code size-48 bg-gray-900 rounded-xl flex items-center justify-center"
                  onMouseEnter={handleHover}
                >
                  <div className="cr-qr-code-placeholder text-white text-xs text-center" onMouseEnter={handleHover}>
                    QR CODE
                  </div>
                </div>
              </div>
              <div className="cr-payment-details bg-white rounded-2xl p-4 flex flex-col gap-3" onMouseEnter={handleHover}>
                <div className="cr-payment-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-payment-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Network
                  </p>
                  <div className="cr-payment-detail-value flex items-center gap-2" onMouseEnter={handleHover}>
                    <div className="cr-network-icon size-5 rounded-full bg-purple-500" onMouseEnter={handleHover} />
                    <p className="cr-network-name font-medium" onMouseEnter={handleHover}>
                      Ethereum
                    </p>
                  </div>
                </div>
                <div className="cr-payment-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-payment-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Token
                  </p>
                  <div className="cr-payment-detail-value flex items-center gap-2" onMouseEnter={handleHover}>
                    <div className="cr-token-icon size-5 rounded-full bg-blue-500" onMouseEnter={handleHover} />
                    <p className="cr-token-name font-medium" onMouseEnter={handleHover}>
                      USDC
                    </p>
                  </div>
                </div>
                <div className="cr-payment-detail-item cr-address-detail flex flex-col gap-1" onMouseEnter={handleHover}>
                  <p className="cr-payment-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Address
                  </p>
                  <div
                    className="cr-address-container flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                    onMouseEnter={handleHover}
                  >
                    <p className="cr-address-value text-xs font-mono flex-1 truncate" onMouseEnter={handleHover}>
                      0x1234...5678
                    </p>
                    <button className="cr-copy-button p-1" onMouseEnter={handleHover}>
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="cr-payment-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-payment-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Amount
                  </p>
                  <p className="cr-payment-detail-value cr-amount font-medium" onMouseEnter={handleHover}>
                    50.50 USDC
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "transferWithWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Token")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Payment Amount")}
              {renderFees(true)}
            </div>
            <div className="cr-token-list-container relative flex flex-col gap-2.5" onMouseEnter={handleHover}>
              <p className="cr-token-list-title text-text-700/60 ml-2 text-sm text-[14px]" onMouseEnter={handleHover}>
                Select Token
              </p>
              <div className="cr-token-list flex max-h-[250px] flex-col gap-1 overflow-y-auto" onMouseEnter={handleHover}>
                {[
                  { token: "USDC", chain: "Ethereum", balance: "1,234.56" },
                  { token: "USDC", chain: "Polygon", balance: "567.89" },
                  { token: "USDT", chain: "Ethereum", balance: "890.12" },
                ].map((item) => (
                  <div
                    key={`${item.token}-${item.chain}`}
                    className="cr-token-item flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-2xl bg-[#F2F2F2] px-4 py-2"
                    onMouseEnter={handleHover}
                  >
                    <div className="cr-token-item-content flex items-center gap-3" onMouseEnter={handleHover}>
                      <div
                        className="cr-token-icon size-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
                        onMouseEnter={handleHover}
                      />
                      <div className="cr-token-info flex flex-col" onMouseEnter={handleHover}>
                        <p className="cr-token-symbol font-medium text-[#2F2F2F]" onMouseEnter={handleHover}>
                          {item.token}
                        </p>
                        <p className="cr-token-chain text-xs text-[#6D6D6D]" onMouseEnter={handleHover}>
                          {item.chain}
                        </p>
                      </div>
                    </div>
                    <p className="cr-token-balance text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                      {item.balance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "initiatingTransfer":
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <div className="cr-initiating-transfer-container flex flex-col items-center gap-6 py-12" onMouseEnter={handleHover}>
              <div
                className="cr-transfer-icon-wrapper size-24 rounded-full bg-blue-100 flex items-center justify-center"
                onMouseEnter={handleHover}
              >
                <div className="cr-transfer-icon size-16 rounded-full bg-blue-500 animate-pulse" onMouseEnter={handleHover} />
              </div>
              <div className="cr-initiating-transfer-content flex flex-col gap-2 text-center" onMouseEnter={handleHover}>
                <p className="cr-initiating-transfer-title font-medium text-lg" onMouseEnter={handleHover}>
                  Initiating Transfer
                </p>
                <p className="cr-initiating-transfer-subtitle text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                  Please confirm the transaction in your wallet
                </p>
              </div>
              <div className="cr-transfer-details bg-white rounded-2xl p-4 w-full flex flex-col gap-2" onMouseEnter={handleHover}>
                <div className="cr-transfer-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-transfer-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Connected Wallet
                  </p>
                  <p className="cr-transfer-detail-value font-mono text-sm" onMouseEnter={handleHover}>
                    0x1234...5678
                  </p>
                </div>
                <div className="cr-transfer-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-transfer-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Token
                  </p>
                  <p className="cr-transfer-detail-value font-medium" onMouseEnter={handleHover}>
                    USDC
                  </p>
                </div>
                <div className="cr-transfer-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                  <p className="cr-transfer-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                    Amount
                  </p>
                  <p className="cr-transfer-detail-value font-medium" onMouseEnter={handleHover}>
                    50.50 USDC
                  </p>
                </div>
              </div>
            </div>
          </>
        );

      case "confirmation":
        return (
          <>
            {renderHead(true, "Chainrails", "Payment Processing...")}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cr-confirmation-status origin-[50%_25%]"
                transition={{ bounce: 0.1, duration: 0.15, ease: "easeOut" }}
                onMouseEnter={handleHover}
              >
                <div className="cr-status-container flex flex-col items-center gap-4 py-8" onMouseEnter={handleHover}>
                  <div
                    className="cr-status-icon-wrapper size-16 rounded-full bg-yellow-100 flex items-center justify-center"
                    onMouseEnter={handleHover}
                  >
                    <div
                      className="cr-status-icon size-12 rounded-full bg-yellow-500 flex items-center justify-center animate-spin"
                      onMouseEnter={handleHover}
                    >
                      <svg
                        className="cr-status-spinner size-6 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        onMouseEnter={handleHover}
                      >
                        <path
                          d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="cr-status-content flex flex-col gap-2 text-center" onMouseEnter={handleHover}>
                    <p className="cr-status-title font-medium text-lg" onMouseEnter={handleHover}>
                      Processing Payment
                    </p>
                    <p className="cr-status-subtitle text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                      This may take a few moments...
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="cr-transaction-details bg-white rounded-2xl p-4 flex flex-col gap-3" onMouseEnter={handleHover}>
              <div className="cr-transaction-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                <p className="cr-transaction-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                  Status
                </p>
                <span
                  className="cr-transaction-status cr-status-processing px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"
                  onMouseEnter={handleHover}
                >
                  Processing
                </span>
              </div>
              <div className="cr-transaction-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                <p className="cr-transaction-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                  Transaction ID
                </p>
                <p className="cr-transaction-detail-value cr-transaction-id font-mono text-xs" onMouseEnter={handleHover}>
                  0xabcd...efgh
                </p>
              </div>
              <div className="cr-transaction-detail-item flex items-center justify-between" onMouseEnter={handleHover}>
                <p className="cr-transaction-detail-label text-sm text-[#6D6D6D]" onMouseEnter={handleHover}>
                  Amount
                </p>
                <p className="cr-transaction-detail-value cr-transaction-amount font-medium" onMouseEnter={handleHover}>
                  $50.00
                </p>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="cr-screen-not-available flex items-center justify-center py-8 text-gray-500" onMouseEnter={handleHover}>
            Screen preview not available
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      <motion.div
        ref={modalRef}
        layout
        transition={{ duration: 0.2, bounce: 20 }}
        className="cr-payment-modal border-border-100 safe-bottom modal-container relative mx-auto flex w-screen max-w-113.5 flex-col gap-3 rounded-t-3xl border border-solid bg-[#F8F8F8] px-3 pt-3 md:rounded-b-3xl"
        onMouseEnter={handleHover}
      >
        {renderScreen()}
        <hr className="bg-bg-100-alt h-0.25 border-none" />
        <div
          className="cr-payment-footer text-text-700/60 flex items-center justify-center pb-1.5 text-xs"
          onMouseEnter={handleHover}
        >
          <p className="cr-powered-by-text" onMouseEnter={handleHover}>
            powered by Chainrails
          </p>
        </div>
      </motion.div>
    </div>
  );
}
