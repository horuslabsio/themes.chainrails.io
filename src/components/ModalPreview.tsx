import clsx from "clsx";
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
            hasLogo ? "size-11.5 rounded-xl border-transparent" : "bg-[#eee] border-[#eaeaea] size-12 rounded-3xl"
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
              className="cr-app-icon absolute inset-0 size-11 transition duration-200 scale-100 opacity-100 rounded-lg overflow-hidden"
              onMouseEnter={handleHover}
            >
              <img
                className="cr-logo-image"
                src="https://dev.chainrails.io/api/v1/images/e33c5a93-a29e-4112-84eb-82ec685a5a14"
                alt=""
              />
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
          className="cr-close-button border-[#eaeaea] bg-[#eee] grid size-12 flex-shrink-0 cursor-pointer place-content-center rounded-full border p-3"
          title="Close"
          onMouseEnter={handleHover}
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <hr className="cr-divider bg-[#f0f0f0] h-0.25 border-none" onMouseEnter={handleHover} />
    </>
  );

  const renderAmount = (compact: boolean, label: string = "Amount") => (
    <div
      className={`cr-amount-container relative flex flex-col items-start gap-4 bg-white px-4 py-3 ${
        compact ? "rounded-2xl pb-3" : "rounded-3xl pb-23.25"
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
                    className="cr-button h-9 w-fit rounded-4xl text-white bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] button-shadow text-sm px-4"
                    onMouseEnter={handleHover}
                  >
                    Pay with Crypto
                  </button>
                  <button
                    className="cr-button h-9 w-fit rounded-[10px] text-[#6d6d6d] bg-[#F8F8F8] text-sm pl-3 pr-4 flex items-center gap-2"
                    onMouseEnter={handleHover}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.75 9.75005V17.2461C2.75 18.3507 3.64543 19.2461 4.75 19.2461L19.2461 19.2461C20.3507 19.2461 21.2461 18.3507 21.2461 17.2461V9.75005M2.75 9.75005V6.75293C2.75 5.64836 3.64543 4.75293 4.75 4.75293H19.248C20.3503 4.75293 21.2448 5.64482 21.2457 6.74712C21.2464 7.74809 21.2461 8.74907 21.2461 9.75005M2.75 9.75005H21.2461"
                        stroke="#878787"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    Pay with Card
                  </button>
                </div>
                <div className="cr-payment-options-list flex flex-col gap-1" onMouseEnter={handleHover}>
                  <div
                    className="cr-payment-option bg-[#f8f8f8] hover:bg-[#f0f0f0] flex cursor-pointer items-center gap-4 rounded-2xl px-3.5 py-3 transition-colors duration-100 group/cpo"
                    onMouseEnter={handleHover}
                  >
                    <p className="text-[14px] text-[#2f2f2f] group-hover/cpo:text-text-900">Pay from wallet</p>
                    <div className="cr-network flex cursor-pointer items-center gap-2 transition-all duration-200 group-hover/cpo:gap-0 ml-auto">
                      <div className="cr-image-stack flex">
                        {[
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/metamask.svg",
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/argent.svg",
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/phantom.svg",
                        ].map((image, index) => (
                          <div
                            key={index}
                            style={{
                              zIndex: 3 - index,
                            }}
                            className={`cr-image-item relative flex size-6 items-center justify-center rounded-[6px] z-[${3 - index}] -mr-1.5 overflow-clip transition-[margin] duration-200 group-hover/cpo:mr-0.5`}
                          >
                            <img src={image} alt={`image ${index + 1}`} className="cr-image size-full rounded-[6px]" />
                          </div>
                        ))}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        direction="right"
                        className="size-4 text-[#000] transition-all duration-200 group-hover/cpo:size-6"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.7068 3.29289C16.0973 3.68342 16.0973 4.31658 15.7068 4.70711L9.12102 11.2929C8.73049 11.6834 8.73049 12.3166 9.12102 12.7071L15.7068 19.2929C16.0973 19.6834 16.0973 20.3166 15.7068 20.7071C15.3163 21.0976 14.6831 21.0976 14.2926 20.7071L7.70681 14.1213C6.53523 12.9498 6.53523 11.0503 7.7068 9.8787L14.2926 3.29289C14.6831 2.90237 15.3163 2.90237 15.7068 3.29289Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div
                    className="cr-payment-option bg-[#f8f8f8] hover:bg-[#f0f0f0] flex cursor-pointer items-center gap-4 rounded-2xl px-3.5 py-3 transition-colors duration-100 group/cpo"
                    onMouseEnter={handleHover}
                  >
                    <p className="text-[14px] text-[#2f2f2f] group-hover/cpo:text-text-900">Pay with transfer</p>
                    <div className="cr-network flex cursor-pointer items-center gap-2 transition-all duration-200 group-hover/cpo:gap-0 ml-auto">
                      <div className="cr-image-stack flex">
                        {[
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/ethereum.svg",
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/base.webp",
                          "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/starknet.svg",
                        ].map((image, index) => (
                          <div
                            key={index}
                            style={{
                              zIndex: 3 - index,
                            }}
                            className={`cr-image-item relative flex size-6 items-center justify-center rounded-[6px] z-[${3 - index}] -mr-1.5 overflow-clip transition-[margin] duration-200 group-hover/cpo:mr-0.5`}
                          >
                            <img src={image} alt={`image ${index + 1}`} className="cr-image size-full rounded-[6px]" />
                          </div>
                        ))}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        direction="right"
                        className="size-4 text-[#000] transition-all duration-200 group-hover/cpo:size-6"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.7068 3.29289C16.0973 3.68342 16.0973 4.31658 15.7068 4.70711L9.12102 11.2929C8.73049 11.6834 8.73049 12.3166 9.12102 12.7071L15.7068 19.2929C16.0973 19.6834 16.0973 20.3166 15.7068 20.7071C15.3163 21.0976 14.6831 21.0976 14.2926 20.7071L7.70681 14.1213C6.53523 12.9498 6.53523 11.0503 7.7068 9.8787L14.2926 3.29289C14.6831 2.90237 15.3163 2.90237 15.7068 3.29289Z"
                          fill="currentColor"
                        ></path>
                      </svg>
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
            </div>
            <div className="cr-select-wallet relative flex flex-col gap-2.5" onMouseEnter={handleHover}>
              <p className="text-[#494949]/60 ml-2 text-sm text-[14px]">Select Wallet</p>
              <div
                className="cr-select-wallet-list flex max-h-[250px] flex-col gap-1 overflow-y-auto no-scrollbar"
                onMouseEnter={handleHover}
              >
                {[
                  {
                    name: "MetaMask",
                    image: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/metamask.svg",
                  },
                  {
                    name: "Ready Wallet",
                    image: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/argent.svg",
                  },
                  {
                    name: "Braavos",
                    image: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/braavos.svg",
                  },
                  {
                    name: "Base Account",
                    image: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/baseapp.webp",
                  },
                  {
                    name: "Gemini Wallet",
                    image: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/gemini.svg",
                  },
                ].map((wallet, i) => (
                  <motion.div
                    key={wallet.name}
                    transition={{ bounce: 1, delay: i * 0.025, duration: 0.2 }}
                    className="cr-select-wallet-item flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-2xl bg-[#F2F2F2] px-4 py-2"
                    onMouseEnter={handleHover}
                  >
                    <div className="cr-select-wallet-wallet flex items-center gap-2" onMouseEnter={handleHover}>
                      <div className="size-7 overflow-clip rounded-[6px]">
                        <img src={wallet.image} className="object-cover" alt={wallet.name} />
                      </div>
                      <p className="text-[#2F2F2F]">{wallet.name}</p>
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
            <div
              className="cr-connecting-wallet flex min-h-[250px] flex-col items-center justify-center pb-2"
              onMouseEnter={handleHover}
            >
              <motion.div
                initial={{
                  height: "0px",
                  opacity: 0,
                }}
                animate={{
                  height: "46px",
                  opacity: 1,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="cr-connecting-wallet-animation mt-4 flex flex-col items-center text-[#017BFD]"
                onMouseEnter={handleHover}
              >
                <svg className="absolute" width="10" height="30" viewBox="0 0 10 30">
                  <line x1="5" y1="0" x2="5" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
                    <animate attributeName="stroke-dashoffset" values="8;0" dur="0.7s" repeatCount="indefinite" />
                  </line>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="mt-5 size-6">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>

              <motion.div
                layout
                initial={{
                  height: "200px",
                  width: "200px",
                }}
                animate={{
                  height: "140px",
                  width: "140px",
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="cr-connecting-wallet-image overflow-clip rounded-[24px]"
                onMouseEnter={handleHover}
              >
                <img
                  src="https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/metamask.svg"
                  alt="MetaMask"
                  className="size-full rounded-[24px]"
                />
              </motion.div>

              <div
                className="cr-connecting-wallet-content mt-4 flex flex-col justify-center gap-3 pb-4 text-center"
                onMouseEnter={handleHover}
              >
                <h2
                  className="cr-connecting-wallet-title font-[inter] text-[1.25rem] leading-[106%] tracking-[-0.4px] text-[#494949] capitalize transition-all"
                  onMouseEnter={handleHover}
                >
                  Requesting Connection
                </h2>
                <p
                  className="cr-connecting-wallet-subtitle mx-auto max-w-[75%] text-[14px] text-[#45454599]"
                  onMouseEnter={handleHover}
                >
                  Open the MetaMask extension to grant permission.
                </p>
              </div>

              {/* Open wallet button */}
              <button
                className="cr-connecting-wallet-cta w-full cursor-pointer rounded-2xl bg-[#F2F2F2] p-3 text-[#2F2F2F]"
                onMouseEnter={handleHover}
              >
                Open MetaMask
              </button>
            </div>
          </>
        );

      case "payToAddress":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Chain/Network")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Pay")}
            </div>
            <div className="cr-select-chain relative flex flex-col gap-2.5" onMouseEnter={handleHover}>
              <p className="cr-select-chain-title text-[#494949]/60 ml-2 text-sm text-[14px]" onMouseEnter={handleHover}>
                Select Chain
              </p>
              <div
                className="cr-select-chain-list relative flex max-h-[300px] flex-col gap-1 overflow-y-auto"
                onMouseEnter={handleHover}
              >
                {[
                  {
                    name: "Ethereum",
                    logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/ethereum.svg",
                    time: "≈30s",
                    fee: "0.50",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                        amount: "50.50",
                      },
                      {
                        symbol: "ETH",
                        logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/ethereum.svg",
                        amount: "0.00261",
                      },
                    ],
                  },
                  {
                    name: "Base",
                    logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/base.webp",
                    time: "≈30s",
                    fee: "0.20",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                        amount: "50.20",
                      },
                    ],
                  },
                  {
                    name: "Arbitrum",
                    logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/arbitrum.svg",
                    time: "≈30s",
                    fee: "0.30",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                        amount: "50.30",
                      },
                    ],
                  },
                ].map((chain, index) => (
                  <div
                    key={chain.name}
                    className={clsx(
                      "cr-select-chain-item bg-[#F2F2F2] border border-[#eaeaea] cursor-pointer text-sm",
                      index === 0 ? "rounded-3xl" : "rounded-2xl",
                    )}
                    onMouseEnter={handleHover}
                  >
                    <div
                      className="cr-select-chain-chain flex h-[48px] w-full items-center justify-between gap-2 p-2"
                      onMouseEnter={handleHover}
                    >
                      <div className="cr-select-chain-chain-desc ml-1 flex items-center gap-2" onMouseEnter={handleHover}>
                        <div className="cr-select-chain-icon size-7 overflow-clip rounded-[6px]" onMouseEnter={handleHover}>
                          <img src={chain.logo} className="object-cover" alt={chain.name} />
                        </div>
                        <p className="cr-select-chain-name text-[#2F2F2F] capitalize" onMouseEnter={handleHover}>
                          {chain.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs text-[#2F2F2F]">
                        <div className="flex items-center gap-1">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cr-select-chain-hourglass size-3 shrink-0 transition-transform duration-200 text-[#6d6d6d]"
                            onMouseEnter={handleHover}
                          >
                            <path
                              d="M6 6L3.20275 4.17103C2.92026 3.98632 2.75 3.67158 2.75 3.33406V1.25H9.25V3.33406C9.25 3.67158 9.07974 3.98632 8.79725 4.17103L6 6ZM6 6L8.79725 7.82897C9.07974 8.01368 9.25 8.32842 9.25 8.66594V10.75H2.75V8.66594C2.75 8.32842 2.92026 8.01368 3.20275 7.82897L6 6ZM10.25 10.75H1.75M10.25 1.25H1.75"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                          <span className="cr-select-chain-eta text-[#0A9355]" onMouseEnter={handleHover}>
                            {chain.time}
                          </span>
                        </div>
                        <div className="cr-select-chain-fee flex items-center gap-1" onMouseEnter={handleHover}>
                          <p>Fee: ${chain.fee}</p>
                          <svg
                            className={clsx(
                              "cr-select-chain-chevron size-3.5 shrink-0 text-[#6D6D6D] transition-transform duration-200",
                              index === 0 && "rotate-180",
                            )}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            onMouseEnter={handleHover}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Expanded tokens for first chain */}
                    {index === 0 && (
                      <div
                        className="cr-select-chain-tokens flex max-h-[190px] flex-col gap-1 overflow-y-auto p-3 pt-0"
                        onMouseEnter={handleHover}
                      >
                        {chain.tokens.map((token) => (
                          <div
                            key={token.symbol}
                            className="cr-select-chain-token bg-white rounded-2xl p-3 flex items-center gap-2 text-sm cursor-pointer hover:bg-[#f8f8f8] transition-colors duration-100"
                            onMouseEnter={handleHover}
                          >
                            <div
                              className="cr-select-chain-token-images relative rounded-[6px] shrink-0 size-6"
                              onMouseEnter={handleHover}
                            >
                              <img src={token.logo} alt={token.symbol} className="size-full rounded-full object-cover" />
                              <div
                                className="cr-select-chain-token-chain absolute -right-[1px] -bottom-[1px] z-10 size-3 rounded-full"
                                onMouseEnter={handleHover}
                              >
                                <img src={chain.logo} alt={chain.name} className="size-3 rounded-full object-cover" />
                              </div>
                            </div>
                            <div>
                              <p
                                className="cr-select-chain-token-name text-[#2F2F2F] flex items-center gap-1"
                                onMouseEnter={handleHover}
                              >
                                <span className="uppercase">{token.symbol}</span> on{" "}
                                <span className="capitalize">{chain.name}</span>
                              </p>
                            </div>
                            <div
                              className="cr-select-chain-token-amount text-[#6D6D6D] flex flex-1 justify-end gap-1 items-center"
                              onMouseEnter={handleHover}
                            >
                              <p>
                                ≈ {token.amount} <span className="uppercase">{token.symbol}</span>
                              </p>
                              <svg
                                className="size-4 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* More Available button */}
              <div
                className="cr-select-chain-more absolute bottom-0 left-1/2 flex w-fit -translate-x-1/2 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-center text-xs text-[#2F2F2F]"
                onMouseEnter={handleHover}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="rotate-90 size-3.5"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14 8.00009C14 7.86749 13.9473 7.74031 13.8536 7.64654L9.68689 3.47986C9.49163 3.2846 9.17504 3.2846 8.97978 3.47986C8.78452 3.67512 8.78452 3.9917 8.97978 4.18697L12.2929 7.50009L2.5 7.50009C2.22386 7.50009 2 7.72395 2 8.00009C2 8.27624 2.22386 8.50009 2.5 8.50009H12.2929L8.97978 11.8132C8.78452 12.0085 8.78452 12.325 8.97978 12.5203C9.17504 12.7156 9.49162 12.7156 9.68689 12.5203L13.8536 8.35365C13.9473 8.25988 14 8.1327 14 8.00009Z"
                    fill="currentColor"
                  ></path>
                </svg>
                More Available
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
            </div>
            <div className="cr-refund flex flex-col gap-4" onMouseEnter={handleHover}>
              <div
                className="cr-refund-info bg-[#e5eff9] flex w-full items-start gap-3 rounded-2xl p-4 pr-7"
                onMouseEnter={handleHover}
              >
                <svg
                  className="cr-refund-info-icon text-[#0869dc] mt-0.75 shrink-0 size-5"
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
                  <h4 className="cr-refund-info-title text-[#0869dc]" onMouseEnter={handleHover}>
                    Refund Processing
                  </h4>
                  <p className="cr-refund-info-text text-[#494949] text-[11.5px]" onMouseEnter={handleHover}>
                    In the event we encounter an issue processing your payment, we'd like to automatically refund. Below, enter
                    the Wallet Address you'd like to be refunded to.
                  </p>
                </div>
              </div>
              <form
                className="cr-refund-address bg-[#fff] relative flex flex-col items-start justify-center gap-1.5 self-stretch rounded-2xl px-4 py-2.5"
                onMouseEnter={handleHover}
              >
                <label
                  htmlFor="address"
                  className="cr-refund-address-label text-[#494949] font-[inter] text-[12px] -tracking-[-0.24px]"
                  onMouseEnter={handleHover}
                >
                  Enter Wallet Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Type or Paste Address"
                  className="cr-refund-address-input placeholder:text-text-[#a3a3a3] text-text-[#020818] w-full !border-none font-[inter] -tracking-[0.28px] !outline-none appearance-none"
                  onMouseEnter={handleHover}
                />
                <button
                  className="cr-refund-address-paste bg-[#fff] absolute right-2 bottom-2 size-8 cursor-pointer p-2"
                  type="button"
                  onMouseEnter={handleHover}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10.5 2H11.5C11.8978 2 12.2794 2.15804 12.5607 2.43934C12.842 2.72064 13 3.10218 13 3.5V13.5C13 13.8978 12.842 14.2794 12.5607 14.5607C12.2794 14.842 11.8978 15 11.5 15H4.5C4.10218 15 3.72064 14.842 3.43934 14.5607C3.15804 14.2794 3 13.8978 3 13.5V3.5C3 3.10218 3.15804 2.72064 3.43934 2.43934C3.72064 2.15804 4.10218 2 4.5 2H5.5"
                      stroke="#1652F0"
                      stroke-width="1.25"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9.68344 1H6.31656C5.86559 1 5.5 1.36559 5.5 1.81656V2.18344C5.5 2.63441 5.86559 3 6.31656 3H9.68344C10.1344 3 10.5 2.63441 10.5 2.18344V1.81656C10.5 1.36559 10.1344 1 9.68344 1Z"
                      stroke="#1652F0"
                      stroke-linejoin="round"
                      stroke-width="1.25"
                    ></path>
                  </svg>
                </button>
              </form>
              <button
                className="cr-button !h-10 w-full rounded-4xl  text-white bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] button-shadow text-sm"
                onMouseEnter={handleHover}
              >
                Skip
              </button>
            </div>
          </>
        );

      case "transferToAddress":
        // Structure and styles match frontend TransferToAddress
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <div className="grid gap-0.75">
              {renderAmount(true)}
              {renderFees(true)}
            </div>
            <div className="cr-transfer flex flex-col gap-3" onMouseEnter={handleHover}>
              <div
                className="cr-transfer-qr qr h-36 w-full rounded-[24px] bg-white p-2.5 flex items-center justify-center"
                onMouseEnter={handleHover}
              >
                <div className="bg-[#f2f2f2] size-31 rounded-xl"></div>
              </div>
              <p className="cr-transfer-text text-[#494949]/60 ml-2 text-sm text-[14px]" onMouseEnter={handleHover}>
                Payment Details
              </p>
              <div
                className="cr-transfer-details divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-3 py-4 text-sm text-[#7B7B7B]"
                onMouseEnter={handleHover}
              >
                <div className="cr-transfer-detail flex items-center justify-between pb-3" onMouseEnter={handleHover}>
                  <p>Send Exactly</p>
                  <p className="flex items-center gap-2">
                    <span className="cr-transfer-value text-[#020818]" onMouseEnter={handleHover}>
                      50.50 USDC
                    </span>
                    <button>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.16667 5.16667V4.5C5.16667 3.39543 6.0621 2.5 7.16667 2.5H11.5C12.6046 2.5 13.5 3.39543 13.5 4.5V8.84C13.5 9.94457 12.6046 10.84 11.5 10.84H10.8333M2.5 7.16667V11.5C2.5 12.6046 3.39543 13.5 4.5 13.5H8.83333C9.9379 13.5 10.8333 12.6046 10.8333 11.5V7.16667C10.8333 6.0621 9.9379 5.16667 8.83333 5.16667H4.5C3.39543 5.16667 2.5 6.0621 2.5 7.16667Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </p>
                </div>
                <div className="cr-transfer-detail flex items-center justify-between py-2.5" onMouseEnter={handleHover}>
                  <p>To</p>
                  <p className="flex items-center gap-2">
                    <span className="cr-transfer-value text-[#020818]" onMouseEnter={handleHover}>
                      0x92BC8568A...4e66B
                    </span>
                    <button>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.16667 5.16667V4.5C5.16667 3.39543 6.0621 2.5 7.16667 2.5H11.5C12.6046 2.5 13.5 3.39543 13.5 4.5V8.84C13.5 9.94457 12.6046 10.84 11.5 10.84H10.8333M2.5 7.16667V11.5C2.5 12.6046 3.39543 13.5 4.5 13.5H8.83333C9.9379 13.5 10.8333 12.6046 10.8333 11.5V7.16667C10.8333 6.0621 9.9379 5.16667 8.83333 5.16667H4.5C3.39543 5.16667 2.5 6.0621 2.5 7.16667Z"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </button>
                  </p>
                </div>
                <div className="cr-transfer-detail flex items-center justify-between pt-3" onMouseEnter={handleHover}>
                  <p>Expires In</p>
                  <p className="flex items-center gap-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cr-select-chain-hourglass size-3 shrink-0 transition-transform duration-200 text-[#6d6d6d]"
                      onMouseEnter={handleHover}
                    >
                      <path
                        d="M6 6L3.20275 4.17103C2.92026 3.98632 2.75 3.67158 2.75 3.33406V1.25H9.25V3.33406C9.25 3.67158 9.07974 3.98632 8.79725 4.17103L6 6ZM6 6L8.79725 7.82897C9.07974 8.01368 9.25 8.32842 9.25 8.66594V10.75H2.75V8.66594C2.75 8.32842 2.92026 8.01368 3.20275 7.82897L6 6ZM10.25 10.75H1.75M10.25 1.25H1.75"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <span className="cr-transfer-value text-[#020818] tabular-nums" onMouseEnter={handleHover}>
                      05:00
                    </span>
                  </p>
                </div>
              </div>
              {/* CTA Button */}
              <button className="cr-button mt-3 min-h-[40px] w-full rounded-4xl text-white bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] button-shadow text-sm">
                I have made this payment
              </button>
            </div>
            {/* Status and TransactionDetails (shown after payment) would go here, if needed for preview */}
          </>
        );

      case "transferWithWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Token")}
            <div className="cr-amount-fees-grid grid gap-0.75" onMouseEnter={handleHover}>
              {renderAmount(true, "Payment Amount")}
            </div>
            <div className="cr-transfer-with-wallet flex min-h-[250px] flex-col gap-4" onMouseEnter={handleHover}>
              {/* Connected Wallet */}
              <div
                className="cr-connected-wallet -mt-2 flex items-center justify-between rounded-3xl bg-white px-4 py-3.5"
                onMouseEnter={handleHover}
              >
                <p className="cr-connect-wallet-status text-[14px] text-[#494949]" onMouseEnter={handleHover}>
                  Wallet Connected
                </p>
                <div className="cr-connect-wallet-info flex items-center gap-2" onMouseEnter={handleHover}>
                  <img
                    src="https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/wallets/metamask.svg"
                    className="cr-connect-wallet-icon size-6"
                    alt="wallet"
                    onMouseEnter={handleHover}
                  />
                  <p
                    className="cr-connect-wallet-address text-sm leading-[106%] tracking-[-1.16px] text-[#2F2F2F]"
                    onMouseEnter={handleHover}
                  >
                    0x1234...5678
                  </p>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      className="cr-connect-wallet-disconnect fill-[#CF0003]"
                      d="M7.5 1.33C7.96 1.33 8.33 1.71 8.33 2.17V3C8.33 3.46 7.96 3.83 7.5 3.83C7.04 3.83 6.67 3.46 6.67 3V2.17C6.67 1.71 7.04 1.33 7.5 1.33ZM10.78 2.81C11.58 2.32 12.59 2.32 13.39 2.81C13.64 2.96 13.88 3.2 14.15 3.47L16.97 6.3C17.3 6.62 17.69 7.11 17.69 7.11C18.18 7.91 18.18 8.92 17.69 9.72L15.59 11.92C15.26 12.25 14.74 12.25 14.41 11.92C14.09 11.6 14.09 11.07 14.41 10.74L15.8 9.36C16.16 9 16.23 8.91 16.27 8.85C16.43 8.58 16.43 8.25 16.27 7.98C16.23 7.92 16.16 7.84 15.8 7.47L13.03 4.7L11.14 4.7L9.76 6.09C9.43 6.41 8.9 6.41 8.58 6.09C8.25 5.76 8.25 5.24 8.58 4.91L9.96 3.53C10.29 3.2 10.52 2.96 10.78 2.81ZM2.33 2.83C2.65 2.5 3.18 2.5 3.51 2.83L4.34 3.66C4.66 3.99 4.66 4.51 4.34 4.84C4.01 5.16 3.49 5.16 3.16 4.84L2.33 4.01C2 3.68 2 3.15 2.33 2.83ZM0.83 8C0.83 7.54 1.21 7.17 1.67 7.17H2.5C2.96 7.17 3.33 7.54 3.33 8C3.33 8.46 2.96 8.83 2.5 8.83H1.67C1.21 8.83 0.83 8.46 0.83 8ZM5.59 9.08C5.91 9.4 5.91 9.93 5.59 10.26L4.2 11.64C3.84 12 3.77 12.08 3.73 12.15C3.57 12.42 3.57 12.75 3.73 13.02C3.77 13.08 3.84 13.16 4.2 13.53L6.97 16.3C7.34 16.66 7.42 16.73 7.48 16.77C7.75 16.93 8.08 16.93 8.35 16.77C8.41 16.73 8.5 16.66 8.86 16.3L10.24 14.91C10.57 14.59 11.1 14.59 11.42 14.91C11.75 15.24 11.75 15.76 11.42 16.09L10.04 17.47C9.71 17.8 9.48 18.03 9.22 18.19C8.42 18.68 7.41 18.68 6.61 18.19C6.36 18.03 6.12 17.8 5.85 17.53L3.03 14.7C2.7 14.38 2.46 14.14 2.31 13.89C1.82 13.09 1.82 12.08 2.31 11.28C2.46 11.02 2.7 10.79 2.97 10.52L4.41 9.08C4.74 8.75 5.26 8.75 5.59 9.08ZM16.67 13C16.67 12.54 17.04 12.17 17.5 12.17H18.33C18.79 12.17 19.17 12.54 19.17 13C19.17 13.46 18.79 13.83 18.33 13.83H17.5C17.04 13.83 16.67 13.46 16.67 13ZM15.66 16.16C15.99 15.84 16.51 15.84 16.84 16.16L17.67 17C18 17.32 18 17.85 17.67 18.17C17.35 18.5 16.82 18.5 16.49 18.17L15.66 17.34C15.34 17.01 15.34 16.49 15.66 16.16ZM12.5 17.17C12.96 17.17 13.33 17.54 13.33 18V18.83C13.33 19.29 12.96 19.67 12.5 19.67C12.04 19.67 11.67 19.29 11.67 18.83V18C11.67 17.54 12.04 17.17 12.5 17.17Z"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Select Payment Token */}
              <div className="cr-select-wallet-token" onMouseEnter={handleHover}>
                <p
                  className="cr-select-wallet-token-text text-[#494949]/60 mb-4 ml-2 text-sm text-[14px]"
                  onMouseEnter={handleHover}
                >
                  Select Payment Token
                </p>
                <div
                  className="cr-wallet-token-list flex max-h-[268px] flex-col gap-1 overflow-y-auto"
                  onMouseEnter={handleHover}
                >
                  {[
                    {
                      tokenSymbol: "USDC",
                      chainName: "Ethereum",
                      chainLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/ethereum.svg",
                      tokenLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                      balance: "1,234.56",
                      payAmount: "50.50",
                      lowBalance: false,
                    },
                    {
                      tokenSymbol: "USDC",
                      chainName: "Base",
                      chainLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/base.webp",
                      tokenLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                      balance: "567.89",
                      payAmount: "50.25",
                      lowBalance: false,
                    },
                    {
                      tokenSymbol: "USDC",
                      chainName: "Arbitrum",
                      chainLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/arbitrum.svg",
                      tokenLogo: "https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/tokens/usdc.svg",
                      balance: "23.45",
                      payAmount: "50.30",
                      lowBalance: true,
                    },
                  ].map((item) => (
                    <button
                      key={`${item.tokenSymbol}-${item.chainName}`}
                      className={clsx(
                        "cr-wallet-token-item flex max-h-12 cursor-pointer justify-between rounded-2xl bg-[#F2F2F2] py-1.5 pr-3 pl-4 text-[#2F2F2F]",
                        item.lowBalance ? "opacity-50 cursor-not-allowed" : "opacity-100",
                      )}
                      onMouseEnter={handleHover}
                    >
                      <div className="flex items-center gap-2">
                        <div className="cr-wallet-token-item-image relative size-6 rounded-[6px]" onMouseEnter={handleHover}>
                          <img src={item.tokenLogo} alt={item.tokenSymbol} className="size-full rounded-full object-cover" />
                          <div className="absolute -right-[1px] -bottom-[1px] z-10 size-3 rounded-full">
                            <img src={item.chainLogo} alt={item.chainName} className="size-3 rounded-full object-cover" />
                          </div>
                        </div>
                        <p className="cr-wallet-token-item-name text-base" onMouseEnter={handleHover}>
                          {item.tokenSymbol} on <span>{item.chainName}</span>
                        </p>
                      </div>
                      <div className="cr-wallet-token-item-amounts flex flex-col items-end text-sm" onMouseEnter={handleHover}>
                        <p className="cr-wallet-token-item-amount text-[#2F2F2F]" onMouseEnter={handleHover}>
                          {item.payAmount} {item.tokenSymbol}
                        </p>
                        <p
                          className={clsx(
                            "cr-wallet-token-item-balance flex items-center gap-1 text-xs",
                            item.lowBalance ? "text-[#CF0003]" : "text-[#6D6D6D]",
                          )}
                          onMouseEnter={handleHover}
                        >
                          Balance: {item.balance} {item.tokenSymbol}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "initiatingTransfer":
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <div
              className="cr-initiating flex h-50 w-full flex-col justify-center gap-5.5 rounded-[24px] bg-white p-7 items-center"
              onMouseEnter={handleHover}
            >
              <div className="cr-initiating-loader relative mx-auto size-22.5" onMouseEnter={handleHover}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  className="cr-initiating-loader-svg animate-360 absolute inset-0 scale-145 text-[#E6E6E6] w-full h-full"
                  onMouseEnter={handleHover}
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.75}
                    className="cr-initiating-loader-path animate-pulse stroke-[#45454599] duration-1000"
                    d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
                  ></path>
                </svg>
                <figure
                  className="cr-initiating-loader-chain absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 animate-pulse overflow-hidden rounded-full duration-1000"
                  onMouseEnter={handleHover}
                >
                  <img
                    src="https://chainrails-frontend-git-staging-horus-labs.vercel.app/images/chains/ethereum.svg"
                    alt="Ethereum logo"
                  />
                </figure>
              </div>
              <div className="cr-initiating-content text-center" onMouseEnter={handleHover}>
                <h4
                  className="cr-initiating-content-title text-[#494949] text-[20px] -tracking-[0.4px]"
                  onMouseEnter={handleHover}
                >
                  Initiating Transaction
                </h4>
                <p
                  className="cr-initiating-content-text text-[#494949]/60 text-[14px] font-medium -tracking-[0.28px]"
                  onMouseEnter={handleHover}
                >
                  Generating your payment address
                </p>
              </div>
            </div>
          </>
        );

      case "depositInputAmount":
        return (
          <>
            {renderHead(true, "Chainrails", "Complete your deposit")}
            <div className="cr-add-amount flex flex-col gap-4" onMouseEnter={handleHover}>
              <form
                className="cr-amount-form bg-[#fff] relative flex flex-col items-start justify-center gap-2 self-stretch rounded-2xl px-4 py-3"
                onMouseEnter={handleHover}
              >
                <label
                  htmlFor="amount"
                  className="cr-amount-label text-[#494949] font-[inter] text-sm -tracking-[-0.24px] not-italic"
                  onMouseEnter={handleHover}
                >
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  className="cr-amount-input placeholder:text-text-[#a3a3a3] text-text-[#020818] -mt-2 mb-4 w-full appearance-none !border-none pl-[19px] font-[inter] !text-[58px] -tracking-[0.28px] !outline-none"
                  defaultValue="50.00"
                  onMouseEnter={handleHover}
                />
                <span
                  className="cr-currency-symbol absolute top-8 left-2 p-2 text-[20px] font-medium text-[#000]"
                  onMouseEnter={handleHover}
                >
                  $
                </span>
                <span
                  className="cr-minimum-notice absolute bottom-1.5 left-2 cursor-pointer p-2 text-xs text-[#7b7b7b]"
                  onMouseEnter={handleHover}
                >
                  Minimum: $0.1
                </span>
              </form>
              <button
                className="cr-button !h-10 w-full rounded-4xl  text-white bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] button-shadow text-sm"
                onMouseEnter={handleHover}
              >
                Proceed
              </button>
            </div>
          </>
        );

      case "confirmation":
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cr-confirmation-status origin-[50%_25%]"
                transition={{ bounce: 0.1, duration: 0.15, ease: "easeOut" }}
                onMouseEnter={handleHover}
              >
                {/* Status stepper, match PaymentModal Status */}
                <div className="flex flex-col gap-3 rounded-2xl p-4 bg-white">
                  <p className="flex items-center gap-1 text-sm tracking-[-0.28px] text-[#8A8A8A]">
                    <span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-3"
                      >
                        <path
                          d="M6 6L3.20275 4.17103C2.92026 3.98632 2.75 3.67158 2.75 3.33406V1.25H9.25V3.33406C9.25 3.67158 9.07974 3.98632 8.79725 4.17103L6 6ZM6 6L8.79725 7.82897C9.07974 8.01368 9.25 8.32842 9.25 8.66594V10.75H2.75V8.66594C2.75 8.32842 2.92026 8.01368 3.20275 7.82897L6 6ZM10.25 10.75H1.75M10.25 1.25H1.75"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span>Status:</span>
                    <span className="font-semibold text-[#020818] capitalize">processing</span>
                  </p>
                  {/* Stepper bar */}
                  <div className="relative w-full max-w-md">
                    <div className="absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between">
                      <div className="flex size-6 items-center justify-center rounded-full p-1 bg-[#017BFD] text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="rotate-0 transition-all delay-0 duration-300"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14 8.00009C14 7.86749 13.9473 7.74031 13.8536 7.64654L9.68689 3.47986C9.49163 3.2846 9.17504 3.2846 8.97978 3.47986C8.78452 3.67512 8.78452 3.9917 8.97978 4.18697L12.2929 7.50009L2.5 7.50009C2.22386 7.50009 2 7.72395 2 8.00009C2 8.27624 2.22386 8.50009 2.5 8.50009H12.2929L8.97978 11.8132C8.78452 12.0085 8.78452 12.325 8.97978 12.5203C9.17504 12.7156 9.49162 12.7156 9.68689 12.5203L13.8536 8.35365C13.9473 8.25988 14 8.1327 14 8.00009Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex size-6 items-center justify-center rounded-full bg-[#EFEFEF] text-[#7C7C7C]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="transition-all delay-300 duration-300"
                        >
                          <path
                            d="M14.5 10H12.5V6.33375C12.9807 6.92669 13.6044 7.38742 14.3125 7.6725C14.4349 7.71966 14.5709 7.71684 14.6912 7.66464C14.8116 7.61244 14.9066 7.51505 14.9558 7.39346C15.005 7.27187 15.0044 7.13582 14.9542 7.01464C14.904 6.89345 14.8083 6.79684 14.6875 6.74563C14.0399 6.48568 13.4853 6.03739 13.0953 5.45876C12.7053 4.88013 12.4979 4.19778 12.5 3.5C12.5 3.36739 12.4473 3.24021 12.3536 3.14645C12.2598 3.05268 12.1326 3 12 3C11.8674 3 11.7402 3.05268 11.6464 3.14645C11.5527 3.24021 11.5 3.36739 11.5 3.5C11.5 4.42826 11.1313 5.3185 10.4749 5.97487C9.8185 6.63125 8.92826 7 8 7C7.07174 7 6.1815 6.63125 5.52513 5.97487C4.86875 5.3185 4.5 4.42826 4.5 3.5C4.5 3.36739 4.44732 3.24021 4.35355 3.14645C4.25979 3.05268 4.13261 3 4 3C3.86739 3 3.74021 3.05268 3.64645 3.14645C3.55268 3.24021 3.5 3.36739 3.5 3.5C3.50206 4.19778 3.29469 4.88013 2.9047 5.45876C2.51471 6.03739 1.96006 6.48568 1.3125 6.74563C1.19175 6.79684 1.09595 6.89345 1.04577 7.01464C0.995584 7.13582 0.995029 7.27187 1.04422 7.39346C1.09342 7.51505 1.18842 7.61244 1.30875 7.66464C1.42908 7.71684 1.56511 7.71966 1.6875 7.6725C2.39556 7.38742 3.01934 6.92669 3.5 6.33375V10H1.5C1.36739 10 1.24021 10.0527 1.14645 10.1464C1.05268 10.2402 1 10.3674 1 10.5C1 10.6326 1.05268 10.7598 1.14645 10.8536C1.24021 10.9473 1.36739 11 1.5 11H3.5V12.5C3.5 12.6326 3.55268 12.7598 3.64645 12.8536C3.74021 12.9473 3.86739 13 4 13C4.13261 13 4.25979 12.9473 4.35355 12.8536C4.44732 12.7598 4.5 12.6326 4.5 12.5V11H11.5V12.5C11.5 12.6326 11.5527 12.7598 11.6464 12.8536C11.7402 12.9473 11.8674 13 12 13C12.1326 13 12.2598 12.9473 12.3536 12.8536C12.4473 12.7598 12.5 12.6326 12.5 12.5V11H14.5C14.6326 11 14.7598 10.9473 14.8536 10.8536C14.9473 10.7598 15 10.6326 15 10.5C15 10.3674 14.9473 10.2402 14.8536 10.1464C14.7598 10.0527 14.6326 10 14.5 10ZM9 7.8875V10H7V7.8875C7.65823 8.03752 8.34177 8.03752 9 7.8875ZM4.5 6.325C4.90804 6.82919 5.41956 7.2399 6 7.52938V10H4.5V6.325ZM10 10V7.53C10.5804 7.24053 11.092 6.82981 11.5 6.32562V10H10Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex size-6 items-center justify-center rounded-full bg-[#EFEFEF] text-[#7C7C7C]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="transition-all delay-300 duration-300"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.5948 1.86259C12.8548 2.05281 12.9114 2.4178 12.7211 2.67781L5.8927 12.0111C5.79898 12.1392 5.65711 12.2236 5.49981 12.2448C5.3425 12.266 5.18336 12.2222 5.05908 12.1235L1.38751 9.20679C1.13525 9.0064 1.0932 8.63946 1.29359 8.3872C1.49399 8.13494 1.86093 8.09289 2.11319 8.29329L5.30951 10.8324L11.7796 1.98894C11.9698 1.72893 12.3348 1.67236 12.5948 1.86259Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[#EFEFEF]">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "33%" }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full overflow-hidden rounded-full bg-[#017BFD] transition-all duration-300"
                      >
                        <div className="shimmer absolute h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <span className="text-[#494949]/60 ml-2 text-sm">Transaction Details</span>
                <div className="divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-4 py-4 text-sm text-[#7B7B7B]">
                  <div className="flex items-center justify-between pb-3">
                    <p>Network</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#020818]">Ethereum</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <p>Fee</p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#020818]">0.50 USDC</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <p>Timestamp</p>
                    <span className="text-[#020818]">2026-02-16 12:34:56</span>
                  </div>
                </div>
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
    <div className="relative user-select-none">
      {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      <motion.div
        ref={modalRef}
        layout
        transition={{ duration: 0.2, bounce: 20 }}
        className="cr-payment-modal border-[#f2f2f2] safe-bottom modal-container relative mx-auto flex w-screen max-w-113.5 flex-col gap-3 rounded-t-3xl border border-solid bg-[#F8F8F8] p-4 md:rounded-b-3xl"
        onMouseEnter={handleHover}
      >
        {renderScreen()}
        <hr className="cr-divider bg-[#f0f0f0] h-0.25 border-none" />
        <div
          className="cr-payment-footer text-[#494949]/60 flex items-center justify-center pb-1.5 text-xs"
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
