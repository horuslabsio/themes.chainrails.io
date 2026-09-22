import clsx from "clsx";
import type { ThemeModalScreen } from "../types/theme";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import AdditionalScreens from "./AdditionalScreens";

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
      const className = Array.from(element.classList).find((cls) =>
        cls.startsWith("cr-"),
      );

      console.log("Hover element:", {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        className: className || "no-cr-class-found",
      });

      document.documentElement.style.setProperty(
        "--left",
        `${rect.left - 2}px`,
      );
      document.documentElement.style.setProperty("--top", `${rect.top - 2}px`);
      document.documentElement.style.setProperty(
        "--width",
        `${rect.width + 4}px`,
      );
      document.documentElement.style.setProperty(
        "--height",
        `${rect.height + 4}px`,
      );
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
      <div
        className="cr-payment-head flex max-w-full justify-between gap-2 text-center"
        onMouseEnter={handleHover}
      >
        <button
          className={`cr-nav-button relative grid shrink-0 cursor-pointer place-content-center border p-0 transition-all duration-200 ${
            hasLogo
              ? "size-11.5 rounded-xl border-transparent"
              : "bg-[#eee] border-[#eaeaea] size-12 rounded-3xl"
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
            <path
              d="M15 18l-6-6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

        <motion.div
          className="cr-header-content mt-0.5 flex w-full flex-col text-left"
          layout
          onMouseEnter={handleHover}
        >
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
          <svg
            className="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <hr
        className="cr-divider bg-[#f0f0f0] h-0.25 border-none"
        onMouseEnter={handleHover}
      />
    </>
  );

  const renderAmount = (compact: boolean, label: string = "Amount") => (
    <div
      className={`cr-amount-container relative flex flex-col items-start gap-4 bg-white px-4 py-3 ${
        compact ? "rounded-2xl pb-3" : "rounded-3xl pb-23.25"
      }`}
      onMouseEnter={handleHover}
    >
      <p
        className="cr-amount-label text-[#494949] text-[14px]"
        onMouseEnter={handleHover}
      >
        {label}
      </p>
      <p
        className={`cr-amount-value absolute left-0 w-full px-4 font-[inter] leading-[106%] tracking-[-1.16px] ease-out text-text-900 ${
          compact
            ? "top-4 scale-100 text-right text-[16px] font-medium"
            : "top-10 text-left text-[58px] font-normal"
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
        <p
          className="cr-fees-label text-[#494949] text-[14px]"
          onMouseEnter={handleHover}
        >
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

  const renderPaymentIcon = (type: "bank" | "crypto" | "wallet" | "dots") => {
    if (type === "bank") {
      return (
        <svg
          className="cr-icon-bank-transfer size-5"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.043 7.70801V14.3747M12.7096 14.3747V7.70801M3.95964 7.70801V14.3747M7.29297 14.3747V7.70801M2.29297 5.97724L10.0013 2.08301L17.7096 5.97724V7.70801H2.29297V5.97724ZM2.29297 16.8747H17.7096L16.8763 14.3747H3.1263L2.29297 16.8747Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    if (type === "crypto") {
      return (
        <svg className="cr-icon-crypto size-5" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.7096 10.0003C17.7096 14.2575 14.2585 17.7087 10.0013 17.7087C5.74411 17.7087 2.29297 14.2575 2.29297 10.0003C2.29297 5.74313 5.74411 2.29199 10.0013 2.29199C14.2585 2.29199 17.7096 5.74313 17.7096 10.0003Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M9.58464 6.15142C9.84247 6.00257 10.1601 6.00257 10.418 6.15142L13.1263 7.71504C13.3841 7.8639 13.543 8.139 13.543 8.43673V11.5639C13.543 11.8616 13.3841 12.1368 13.1263 12.2856L10.418 13.8492C10.1601 13.9981 9.84247 13.9981 9.58464 13.8492L6.87631 12.2856C6.61847 12.1368 6.45964 11.8616 6.45964 11.5639V8.43673C6.45964 8.139 6.61847 7.8639 6.87631 7.71504L9.58464 6.15142Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    }
    if (type === "wallet") {
      return (
        <svg className="cr-icon-wallet size-5" viewBox="0 0 20 20" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5013 5.41667C2.5013 3.80584 3.80714 2.5 5.41797 2.5H11.8069C13.1109 2.5 14.168 3.55711 14.168 4.86111V6.66667H14.3763C16.1022 6.66667 17.5013 8.06578 17.5013 9.79167V14.375C17.5013 16.1009 16.1022 17.5 14.3763 17.5H10.2096C9.86446 17.5 9.58464 17.2202 9.58464 16.875C9.58464 16.5298 9.86446 16.25 10.2096 16.25H14.3763C15.4118 16.25 16.2513 15.4105 16.2513 14.375V9.79167C16.2513 8.75613 15.4118 7.91667 14.3763 7.91667H5.0013C4.54594 7.91667 4.11902 7.79492 3.7513 7.58221V9.375C3.7513 9.72018 3.47148 10 3.1263 10C2.78112 10 2.5013 9.72018 2.5013 9.375V5.41667ZM2.91797 13.1541V15.5959L5.0013 16.8111L7.08464 15.5959V13.1541L5.0013 11.9388L2.91797 13.1541ZM4.68638 10.6754C4.88098 10.5619 5.12162 10.5619 5.31622 10.6754L8.02455 12.2553C8.21657 12.3673 8.33464 12.5728 8.33464 12.7951V15.9548C8.33464 16.177 8.21657 16.3827 8.02455 16.4947L5.31622 18.0746C5.12162 18.1881 4.88098 18.1881 4.68638 18.0746L1.97805 16.4947C1.78604 16.3827 1.66797 16.177 1.66797 15.9548V12.7951C1.66797 12.5728 1.78604 12.3673 1.97805 12.2553L4.68638 10.6754Z"
            fill="currentColor"
          />
          <path
            d="M12.918 12.9167C13.3782 12.9167 13.7513 12.5436 13.7513 12.0833C13.7513 11.6231 13.3782 11.25 12.918 11.25C12.4577 11.25 12.0846 11.6231 12.0846 12.0833C12.0846 12.5436 12.4577 12.9167 12.918 12.9167Z"
            fill="currentColor"
          />
        </svg>
      );
    }
    return (
      <svg className="cr-icon-dots size-5" viewBox="0 0 20 20" fill="none">
        <circle cx="5" cy="10" r="1.25" fill="currentColor" />
        <circle cx="10" cy="10" r="1.25" fill="currentColor" />
        <circle cx="15" cy="10" r="1.25" fill="currentColor" />
      </svg>
    );
  };

  const renderChevron = (direction: "right" | "down", className = "size-4") => (
    <svg
      className={`cr-icon-chevron ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: direction === "down" ? "rotate(270deg)" : "rotate(180deg)",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7068 3.29289C16.0973 3.68342 16.0973 4.31658 15.7068 4.70711L9.12102 11.2929C8.73049 11.6834 8.73049 12.3166 9.12102 12.7071L15.7068 19.2929C16.0973 19.6834 16.0973 20.3163 15.7068 20.7071C15.3163 21.0976 14.6831 21.0976 14.2926 20.7071L7.70681 14.1213C6.53523 12.9498 6.53523 11.0503 7.7068 9.8787L14.2926 3.29289C14.6831 2.90237 15.3163 2.90237 15.7068 3.29289Z"
        fill="currentColor"
      />
    </svg>
  );

  const renderQrCode = () => {
    const size = 29;
    const finderOrigins = [
      [0, 0],
      [size - 7, 0],
      [0, size - 7],
    ];
    const isFinderCell = (row: number, column: number) =>
      finderOrigins.some(
        ([originRow, originColumn]) =>
          row >= originRow &&
          row < originRow + 7 &&
          column >= originColumn &&
          column < originColumn + 7,
      );
    const modules = Array.from({ length: size * size }, (_, index) => {
      const row = Math.floor(index / size);
      const column = index % size;
      if (isFinderCell(row, column)) return null;
      const active = (row * 17 + column * 31 + row * column * 7) % 11 < 4;
      return active ? (
        <rect
          key={`${row}-${column}`}
          x={column}
          y={row}
          width="1"
          height="1"
        />
      ) : null;
    });

    return (
      <svg
        className="cr-transfer-qr-code size-full"
        viewBox={`0 0 ${size} ${size}`}
        shapeRendering="crispEdges"
      >
        <rect width={size} height={size} fill="white" />
        {finderOrigins.map(([row, column]) => (
          <g key={`${row}-${column}`}>
            <rect x={column} y={row} width="7" height="7" fill="#111" />
            <rect
              x={column + 1}
              y={row + 1}
              width="5"
              height="5"
              fill="white"
            />
            <rect x={column + 2} y={row + 2} width="3" height="3" fill="#111" />
          </g>
        ))}
        <g fill="#111">{modules}</g>
      </svg>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case "multiChainWalletSelect":
      case "farcasterSelectToken":
      case "fiatVerifyEmail":
      case "fiatSelectProvider":
      case "fiatTransferDetails":
      case "fiatPaymentWidget":
      case "fiatKyc":
      case "fiatMobileMoneyDetails":
      case "fiatMobileMoneyProcessing":
      case "transactionHistory":
        return <AdditionalScreens screen={screen} onHover={handleHover} />;

      case "selectMethod":
        return (
          <>
            {renderHead(true, "Horus Labs", "Complete your payment")}
            <div
              className="cr-amount-fees-grid grid gap-0.75"
              onMouseEnter={handleHover}
            >
              <div
                className="cr-amount-display relative flex min-h-0 flex-col items-start gap-2 rounded-3xl bg-white p-4"
                onMouseEnter={handleHover}
              >
                <div className="cr-amount-label text-[#494949] text-[14px]">
                  Amount
                </div>
                <div className="flex min-h-0 w-full flex-1 items-center justify-between gap-2">
                  <div className="flex flex-col items-start justify-center">
                    <p className="cr-amount-value w-full shrink-0 font-[inter] text-left text-[58px] font-normal leading-[106%] tracking-[-1.16px] text-[#020818]">
                      ₦33,077.00
                    </p>
                    <div className="cr-usd-equivalent text-xs text-[#7b7b7b]">
                      = $20.00
                    </div>
                  </div>
                  <div className="cr-country-slot flex cursor-pointer items-center gap-2 rounded-full border border-[#1E5BF133] bg-[#F3F3FF] px-3 py-1.5">
                    <img
                      src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1775116708/ar_ugcv7x.svg"
                      className="size-5 overflow-clip rounded-[6px] object-cover"
                      alt="AR"
                    />
                    <span className="text-xs font-medium text-[#494949]">
                      AR
                    </span>
                    {renderChevron("down", "size-3 text-[#494949]")}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="cr-select-method -mt-4 flex flex-col gap-1 pt-2"
              onMouseEnter={handleHover}
            >
              <div className="cr-payment-options flex flex-col gap-1 rounded-3xl bg-white px-2.5 pb-2.5 pt-3">
                <div className="cr-payment-options-list flex flex-col gap-1 pb-1">
                  {[
                    { label: "Bank Transfer", icon: "bank", recommended: true },
                    {
                      label: "Crypto Transfer",
                      icon: "crypto",
                      recommended: false,
                    },
                    {
                      label: "Pay with Wallet",
                      icon: "wallet",
                      recommended: false,
                    },
                    { label: "Others", icon: "dots", recommended: false },
                  ].map(({ label, icon, recommended }) => (
                    <div
                      key={label}
                      className="cr-payment-option group flex cursor-pointer items-center gap-3 rounded-2xl bg-[#f8f8f8] px-3.5 py-3 transition-colors duration-100 hover:bg-[#f0f0f0]"
                      onMouseEnter={handleHover}
                    >
                      <div className="cr-payment-option-icon grid size-7 place-content-center text-[#494949]">
                        {renderPaymentIcon(
                          icon as "bank" | "crypto" | "wallet" | "dots",
                        )}
                      </div>
                      <span className="flex-1 text-sm text-[#494949] group-hover:text-[#020818]">
                        {label}
                      </span>
                      {recommended && (
                        <span className="ml-auto rounded-full border border-[#AFC3FF] px-3 py-1 text-xs text-[#1E5BF1]">
                          <svg
                            className="cr-icon-star mr-1 inline size-3"
                            viewBox="0 0 13 13"
                            fill="none"
                          >
                            <path
                              d="M7.53596 1.18997C7.11958 0.326002 5.88302 0.326 5.46664 1.18996L4.37513 3.45479L1.81265 3.81713C0.86217 3.94119 0.465377 5.11261 1.1739 5.77855L3.0121 7.50625L2.56774 10.0237C2.38897 10.9796 3.40391 11.6867 4.24117 11.2367L6.46875 10.0397L8.76143 11.2367C9.59869 11.6867 10.6136 10.9796 10.4349 10.0237L9.97338 7.55617L11.8287 5.77855C12.5372 5.11261 12.1404 3.94119 11.1899 3.81713L8.67716 3.48918L7.53596 1.18997Z"
                              fill="currentColor"
                            />
                          </svg>
                          Recommended
                        </span>
                      )}
                      {!recommended && label !== "Others" && (
                        <div className="cr-image-stack ml-auto flex items-center gap-1">
                          {(label === "Crypto Transfer"
                            ? [
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg",
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087943/starknet_ltvror.svg",
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772183427/solana_xv5sbs.svg",
                              ]
                            : [
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/metamask_jbb8hn.svg",
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443675/argent_wvdpqv.svg",
                                "https://res.cloudinary.com/dc3gdzgel/image/upload/v1777350018/farcaster_1_veen9o.jpg",
                              ]
                          ).map((image, index) => (
                            <img
                              key={image}
                              src={image}
                              alt=""
                              className={`cr-image size-5 rounded-sm object-contain ${index > 0 ? "-ml-1" : ""}`}
                            />
                          ))}
                        </div>
                      )}
                      {renderChevron("right", "ml-auto size-4 text-[#8A8A8A]")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "payWithWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Wallet")}
            <div
              className="cr-amount-fees-grid grid gap-0.75"
              onMouseEnter={handleHover}
            >
              {renderAmount(true, "Payment Amount")}
            </div>
            <div
              className="cr-select-wallet relative flex flex-col gap-2.5"
              onMouseEnter={handleHover}
            >
              <p className="cr-select-wallet-title text-[#494949]/60 ml-2 text-sm">
                Select Wallet
              </p>
              <div
                className="cr-select-wallet-list flex max-h-[250px] flex-col gap-1 overflow-y-auto no-scrollbar"
                onMouseEnter={handleHover}
              >
                {[
                  {
                    name: "MetaMask",
                    image:
                      "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/metamask_jbb8hn.svg",
                  },
                  {
                    name: "Ready Wallet",
                    image:
                      "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443675/argent_wvdpqv.svg",
                  },
                  {
                    name: "Braavos",
                    image:
                      "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443675/braavos_acfgsu.svg",
                  },
                  {
                    name: "Base Account",
                    image:
                      "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/baseapp_ugzpiu.webp",
                  },
                  {
                    name: "Gemini Wallet",
                    image:
                      "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/gemini_xh7e4h.svg",
                  },
                ].map((wallet, i) => (
                  <motion.div
                    key={wallet.name}
                    transition={{ bounce: 1, delay: i * 0.025, duration: 0.2 }}
                    className="cr-select-wallet-item flex min-h-[56px] cursor-pointer items-center justify-between gap-2 rounded-2xl bg-[#F2F2F2] px-4 py-2"
                    onMouseEnter={handleHover}
                  >
                    <div
                      className="cr-select-wallet-wallet flex items-center gap-2"
                      onMouseEnter={handleHover}
                    >
                      <div className="size-7 overflow-clip rounded-[6px]">
                        <img
                          src={wallet.image}
                          className="object-cover"
                          alt={wallet.name}
                        />
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
                <svg
                  className="absolute"
                  width="10"
                  height="30"
                  viewBox="0 0 10 30"
                >
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="30"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="8;0"
                      dur="0.7s"
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="mt-5 size-6"
                >
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
                  src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/metamask_jbb8hn.svg"
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
            <div
              className="cr-amount-fees-grid grid gap-0.75"
              onMouseEnter={handleHover}
            >
              {renderAmount(true, "Pay")}
            </div>
            <div
              className="cr-select-chain relative flex flex-col gap-2.5"
              onMouseEnter={handleHover}
            >
              <p
                className="cr-select-chain-title text-[#494949]/60 ml-2 text-sm"
                onMouseEnter={handleHover}
              >
                Select Chain
              </p>
              <div
                className="cr-select-chain-list relative flex max-h-[300px] flex-col gap-1 overflow-y-auto"
                onMouseEnter={handleHover}
              >
                {[
                  {
                    name: "Ethereum",
                    logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg",
                    time: "≈30s",
                    fee: "0.50",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
                        amount: "50.50",
                      },
                      {
                        symbol: "ETH",
                        logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg",
                        amount: "0.00261",
                      },
                    ],
                  },
                  {
                    name: "Base",
                    logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087942/base_yognh9.webp",
                    time: "≈30s",
                    fee: "0.20",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
                        amount: "50.20",
                      },
                    ],
                  },
                  {
                    name: "Arbitrum",
                    logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087941/arbitrum_tp1kad.svg",
                    time: "≈30s",
                    fee: "0.30",
                    tokens: [
                      {
                        symbol: "USDC",
                        logo: "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
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
                      <div
                        className="cr-select-chain-chain-desc ml-1 flex items-center gap-2"
                        onMouseEnter={handleHover}
                      >
                        <div
                          className="cr-select-chain-icon size-7 overflow-clip rounded-[6px]"
                          onMouseEnter={handleHover}
                        >
                          <img
                            src={chain.logo}
                            className="object-cover"
                            alt={chain.name}
                          />
                        </div>
                        <p
                          className="cr-select-chain-name text-[#2F2F2F] capitalize"
                          onMouseEnter={handleHover}
                        >
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
                          <span
                            className="cr-select-chain-eta text-[#0A9355]"
                            onMouseEnter={handleHover}
                          >
                            {chain.time}
                          </span>
                        </div>
                        <div
                          className="cr-select-chain-fee flex items-center gap-1"
                          onMouseEnter={handleHover}
                        >
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
                              <img
                                src={token.logo}
                                alt={token.symbol}
                                className="size-full rounded-full object-cover"
                              />
                              <div
                                className="cr-select-chain-token-chain absolute -right-[1px] -bottom-[1px] z-10 size-3 rounded-full"
                                onMouseEnter={handleHover}
                              >
                                <img
                                  src={chain.logo}
                                  alt={chain.name}
                                  className="size-3 rounded-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <p
                                className="cr-select-chain-token-name text-[#2F2F2F] flex items-center gap-1"
                                onMouseEnter={handleHover}
                              >
                                <span className="uppercase">
                                  {token.symbol}
                                </span>{" "}
                                on{" "}
                                <span className="capitalize">{chain.name}</span>
                              </p>
                            </div>
                            <div
                              className="cr-select-chain-token-amount text-[#6D6D6D] flex flex-1 justify-end gap-1 items-center"
                              onMouseEnter={handleHover}
                            >
                              <p>
                                ≈ {token.amount}{" "}
                                <span className="uppercase">
                                  {token.symbol}
                                </span>
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
            <div
              className="cr-amount-fees-grid grid gap-0.75"
              onMouseEnter={handleHover}
            >
              {renderAmount(true, "Payment Amount")}
            </div>
            <div
              className="cr-refund flex flex-col gap-4"
              onMouseEnter={handleHover}
            >
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
                  <path
                    d="M12 16v-4M12 8h.01"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  className="cr-refund-info-content -mt-1 font-[inter] text-[12px] -tracking-[0.24px]"
                  onMouseEnter={handleHover}
                >
                  <h4
                    className="cr-refund-info-title text-[#0869dc]"
                    onMouseEnter={handleHover}
                  >
                    Refund Processing
                  </h4>
                  <p
                    className="cr-refund-info-text text-[#494949] text-[11.5px]"
                    onMouseEnter={handleHover}
                  >
                    In the event we encounter an issue processing your payment,
                    we'd like to automatically refund. Below, enter the Wallet
                    Address you'd like to be refunded to.
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
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
            <div
              className="cr-transfer flex flex-col gap-3"
              onMouseEnter={handleHover}
            >
              <p
                className="cr-transfer-text text-[#494949]/60 ml-2 text-sm"
                onMouseEnter={handleHover}
              >
                Payment Details
              </p>
              <div
                className="cr-transfer-details divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-3 py-4 text-sm text-[#7B7B7B]"
                onMouseEnter={handleHover}
              >
                <div
                  className="cr-transfer-detail flex items-center justify-between pb-3"
                  onMouseEnter={handleHover}
                >
                  <p>Send Exactly</p>
                  <p className="flex items-center gap-2">
                    <span
                      className="cr-transfer-value text-[#020818]"
                      onMouseEnter={handleHover}
                    >
                      50.50 USDC
                    </span>
                    <button>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                <div
                  className="cr-transfer-detail flex items-center justify-between py-2.5"
                  onMouseEnter={handleHover}
                >
                  <p>To</p>
                  <p className="flex items-center gap-2">
                    <span
                      className="cr-transfer-value text-[#020818]"
                      onMouseEnter={handleHover}
                    >
                      0x92BC8568A...4e66B
                    </span>
                    <button>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                <div
                  className="cr-transfer-detail flex items-center justify-between pt-3"
                  onMouseEnter={handleHover}
                >
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
                    <span
                      className="cr-transfer-value text-[#020818] tabular-nums"
                      onMouseEnter={handleHover}
                    >
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

      case "transferToAddressQr":
        return (
          <>
            {renderHead(true, "Chainrails", "Make your Payment")}
            <div
              className="cr-transfer-qr-view flex flex-col gap-4 overflow-y-auto"
              onMouseEnter={handleHover}
            >
              <div
                className="cr-transfer-qr qr mx-auto my-[min(3vw,30px)] flex h-[min(90vw,360px)] w-[min(90vw,360px)] items-center justify-center rounded-[24px] bg-white p-8"
                onMouseEnter={handleHover}
              >
                {renderQrCode()}
              </div>
            </div>
          </>
        );

      case "transferWithWallet":
        return (
          <>
            {renderHead(false, "Chainrails", "Select Token")}
            <div
              className="cr-amount-fees-grid grid gap-0.75"
              onMouseEnter={handleHover}
            >
              {renderAmount(true, "Payment Amount")}
            </div>
            <div
              className="cr-transfer-with-wallet flex min-h-[250px] flex-col gap-4"
              onMouseEnter={handleHover}
            >
              {/* Connected Wallet */}
              <div
                className="cr-connected-wallet -mt-2 flex items-center justify-between rounded-3xl bg-white px-4 py-3.5"
                onMouseEnter={handleHover}
              >
                <p
                  className="cr-connect-wallet-status text-[14px] text-[#494949]"
                  onMouseEnter={handleHover}
                >
                  Wallet Connected
                </p>
                <div
                  className="cr-connect-wallet-info flex items-center gap-2"
                  onMouseEnter={handleHover}
                >
                  <img
                    src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/metamask_jbb8hn.svg"
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
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
              <div
                className="cr-select-wallet-token"
                onMouseEnter={handleHover}
              >
                <p
                  className="cr-select-wallet-token-text text-[#494949]/60 mb-4 ml-2 text-sm"
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
                      chainLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg",
                      tokenLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
                      balance: "1,234.56",
                      payAmount: "50.50",
                      lowBalance: false,
                    },
                    {
                      tokenSymbol: "USDC",
                      chainName: "Base",
                      chainLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087942/base_yognh9.webp",
                      tokenLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
                      balance: "567.89",
                      payAmount: "50.25",
                      lowBalance: false,
                    },
                    {
                      tokenSymbol: "USDC",
                      chainName: "Arbitrum",
                      chainLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087941/arbitrum_tp1kad.svg",
                      tokenLogo:
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg",
                      balance: "23.45",
                      payAmount: "50.30",
                      lowBalance: true,
                    },
                  ].map((item) => (
                    <button
                      key={`${item.tokenSymbol}-${item.chainName}`}
                      className={clsx(
                        "cr-wallet-token-item flex max-h-12 cursor-pointer justify-between rounded-2xl bg-[#F2F2F2] py-1.5 pr-3 pl-4 text-[#2F2F2F]",
                        item.lowBalance
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100",
                      )}
                      onMouseEnter={handleHover}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="cr-wallet-token-item-image relative size-6 rounded-[6px]"
                          onMouseEnter={handleHover}
                        >
                          <img
                            src={item.tokenLogo}
                            alt={item.tokenSymbol}
                            className="size-full rounded-full object-cover"
                          />
                          <div className="absolute -right-[1px] -bottom-[1px] z-10 size-3 rounded-full">
                            <img
                              src={item.chainLogo}
                              alt={item.chainName}
                              className="size-3 rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <p
                          className="cr-wallet-token-item-name text-base"
                          onMouseEnter={handleHover}
                        >
                          {item.tokenSymbol} on <span>{item.chainName}</span>
                        </p>
                      </div>
                      <div
                        className="cr-wallet-token-item-amounts flex flex-col items-end text-sm"
                        onMouseEnter={handleHover}
                      >
                        <p
                          className="cr-wallet-token-item-amount text-[#2F2F2F]"
                          onMouseEnter={handleHover}
                        >
                          {item.payAmount} {item.tokenSymbol}
                        </p>
                        <p
                          className={clsx(
                            "cr-wallet-token-item-balance flex items-center gap-1 text-xs",
                            item.lowBalance
                              ? "text-[#CF0003]"
                              : "text-[#6D6D6D]",
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
              <div
                className="cr-initiating-loader relative mx-auto size-22.5"
                onMouseEnter={handleHover}
              >
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
                    src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg"
                    alt="Ethereum logo"
                  />
                </figure>
              </div>
              <div
                className="cr-initiating-content text-center"
                onMouseEnter={handleHover}
              >
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
            <div
              className="cr-add-amount flex flex-col gap-4"
              onMouseEnter={handleHover}
            >
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
                <div
                  className="cr-confirmation-progress flex flex-col gap-3 rounded-2xl p-4 bg-white"
                  onMouseEnter={handleHover}
                >
                  <p
                    className="cr-confirmation-progress-status flex items-center gap-1 text-sm tracking-[-0.28px] text-[#8A8A8A]"
                    onMouseEnter={handleHover}
                  >
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
                    <span
                      className="cr-confirmation-progress-status-text font-semibold text-[#020818] capitalize"
                      onMouseEnter={handleHover}
                    >
                      processing
                    </span>
                  </p>
                  {/* Stepper bar */}
                  <div
                    className="cr-confirmation-progress-stepper relative w-full max-w-md"
                    onMouseEnter={handleHover}
                  >
                    <div className="absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between">
                      <div
                        className="cr-confirmation-progress-track flex size-6 items-center justify-center rounded-full p-1 bg-[#017BFD] text-white"
                        onMouseEnter={handleHover}
                      >
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
                      <div
                        className="cr-confirmation-progress-track flex size-6 items-center justify-center rounded-full bg-[#EFEFEF] text-[#7C7C7C]"
                        onMouseEnter={handleHover}
                      >
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
                      <div
                        className="cr-confirmation-progress-track flex size-6 items-center justify-center rounded-full bg-[#EFEFEF] text-[#7C7C7C]"
                        onMouseEnter={handleHover}
                      >
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
                    <div
                      className="cr-confirmation-progress-bar h-3 w-full rounded-full bg-[#EFEFEF]"
                      onMouseEnter={handleHover}
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "33%" }}
                        transition={{ duration: 0.3 }}
                        className="cr-confirmation-progress-progress relative h-full overflow-hidden rounded-full bg-[#017BFD] transition-all duration-300"
                      >
                        <div
                          className="cr-confirmation-progress-shimmer shimmer absolute h-full w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          onMouseEnter={handleHover}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <p
                  className="cr-transfer-text text-[#494949]/60 ml-2 text-sm"
                  onMouseEnter={handleHover}
                >
                  Transaction Details
                </p>

                <div
                  className="cr-transfer-details divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-3 py-4 text-sm text-[#7B7B7B]"
                  onMouseEnter={handleHover}
                >
                  <div
                    className="cr-transfer-detail flex items-center justify-between pb-3"
                    onMouseEnter={handleHover}
                  >
                    <p>Network</p>
                    <span
                      className="cr-transfer-value text-[#020818]"
                      onMouseEnter={handleHover}
                    >
                      Ethereum
                    </span>
                  </div>
                  <div
                    className="cr-transfer-detail flex items-center justify-between py-2.5"
                    onMouseEnter={handleHover}
                  >
                    <p>Fee</p>
                    <p className="flex items-center gap-2">
                      <span
                        className="cr-transfer-value text-[#020818]"
                        onMouseEnter={handleHover}
                      >
                        0.50 USDC
                      </span>
                    </p>
                  </div>
                  <div
                    className="cr-transfer-detail flex items-center justify-between pt-3"
                    onMouseEnter={handleHover}
                  >
                    <p>Timestamp</p>
                    <span
                      className="cr-transfer-value text-[#020818]"
                      onMouseEnter={handleHover}
                    >
                      2026-02-16 12:34:56
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div
            className="cr-screen-not-available flex items-center justify-center py-8 text-gray-500"
            onMouseEnter={handleHover}
          >
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
