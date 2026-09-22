import type { MouseEvent, ReactNode } from "react";
import type { ThemeModalScreen } from "../types/theme";

type AdditionalScreen = Exclude<
  ThemeModalScreen,
  | "selectMethod"
  | "payToAddress"
  | "payWithWallet"
  | "connectToWallet"
  | "transferToAddress"
  | "transferWithWallet"
  | "addRefundAddress"
  | "initiatingTransfer"
  | "confirmation"
  | "depositInputAmount"
>;

type HoverHandler = (event: MouseEvent<HTMLElement>) => void;

type Props = {
  screen: AdditionalScreen;
  onHover: HoverHandler;
};

function Header({
  title,
  subtitle,
  onHover,
}: {
  title: string;
  subtitle: string;
  onHover: HoverHandler;
}) {
  return (
    <>
      <div
        className="cr-payment-head flex max-w-full justify-between gap-2 text-center"
        onMouseEnter={onHover}
      >
        <button
          className="cr-nav-button relative grid size-12 shrink-0 cursor-pointer place-content-center rounded-3xl border border-[#eaeaea] bg-[#eee] p-0"
          onMouseEnter={onHover}
        >
          <span className="text-2xl leading-none">‹</span>
        </button>
        <div
          className="cr-header-content mt-0.5 flex w-full flex-col text-left"
          onMouseEnter={onHover}
        >
          <h1
            className="cr-app-title ml-auto mr-auto line-clamp-1 w-fit text-center font-[inter] text-[1.25rem] capitalize leading-[106%] tracking-[-0.4px] text-[#494949]"
            onMouseEnter={onHover}
          >
            {title}
          </h1>
          <div
            className="cr-app-description ml-auto mr-auto line-clamp-1 w-fit min-w-0 max-w-[250px] text-center text-sm tracking-[-0.28px] text-[#45454599]"
            onMouseEnter={onHover}
          >
            {subtitle}
          </div>
        </div>
        <button
          className="cr-close-button grid size-12 shrink-0 cursor-pointer place-content-center rounded-full border border-[#eaeaea] bg-[#eee] p-3 text-[#000]"
          onMouseEnter={onHover}
        >
          ×
        </button>
      </div>
      <hr
        className="cr-divider h-0.25 border-none bg-[#f0f0f0]"
        onMouseEnter={onHover}
      />
    </>
  );
}

function Amount({ onHover }: { onHover: HoverHandler }) {
  return (
    <div
      className="cr-amount-container flex min-h-[49px] items-center justify-between rounded-2xl bg-white px-4 py-3"
      onMouseEnter={onHover}
    >
      <span className="cr-amount-label text-[14px] text-[#494949]">
        Payment Amount
      </span>
      <strong className="cr-amount-value font-[inter] text-[16px] font-medium leading-[106%] tracking-[-1.16px] text-[#020818]">
        $50.00
      </strong>
    </div>
  );
}

function Button({
  children,
  onHover,
}: {
  children: ReactNode;
  onHover: HoverHandler;
}) {
  return (
    <button
      className="cr-button !h-10 w-full rounded-2xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
      onMouseEnter={onHover}
    >
      {children}
    </button>
  );
}

function Option({
  children,
  onHover,
  muted = false,
}: {
  children: ReactNode;
  onHover: HoverHandler;
  muted?: boolean;
}) {
  return (
    <div
      className={`cr-payment-option group flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 transition-colors duration-100 ${muted ? "bg-[#f2f2f2] text-[#6d6d6d]" : "bg-[#f8f8f8] text-[#2f2f2f] hover:bg-[#f0f0f0]"}`}
      onMouseEnter={onHover}
    >
      <span className="flex-1 text-sm group-hover:text-[#020818]">
        {children}
      </span>
      <span className="text-2xl leading-none text-[#8a8a8a]">›</span>
    </div>
  );
}

function Field({
  label,
  value,
  onHover,
  className = "",
}: {
  label: string;
  value: string;
  onHover: HoverHandler;
  className?: string;
}) {
  return (
    <div
      className={`cr-field bg-[#fff] flex flex-col items-start justify-center gap-1.5 rounded-2xl px-4 py-2.5 ${className}`}
      onMouseEnter={onHover}
    >
      <label className="text-[12px] text-[#6d6d6d]">{label}</label>
      <div className="text-sm text-[#020818]">{value}</div>
    </div>
  );
}

function Info({
  children,
  onHover,
}: {
  children: ReactNode;
  onHover: HoverHandler;
}) {
  return (
    <div
      className="cr-kyc-info flex w-full items-center gap-2 rounded-[18px] border border-[#1E5BF133] bg-[#F3F3FF] px-4 py-3 text-xs text-[#000000CC]"
      onMouseEnter={onHover}
    >
      {children}
    </div>
  );
}

export default function AdditionalScreens({ screen, onHover }: Props) {
  const title = "Horus Labs";

  if (screen === "multiChainWalletSelect") {
    return (
      <>
        <Header title={title} subtitle="Select Wallet" onHover={onHover} />
        <div className="cr-multichain-wallet-select relative flex min-h-[280px] flex-col gap-2.5">
          <div
            className="cr-multichain-wallet-image mx-auto size-[140px] overflow-hidden rounded-[24px] bg-[#f2f2f2]"
            onMouseEnter={onHover}
          >
            <img
              src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772443677/metamask_jbb8hn.svg"
              alt="MetaMask"
              className="size-full object-contain"
            />
          </div>
          <p className="cr-multichain-wallet-title ml-2 text-sm text-[#49494999]">
            Select Chain
          </p>
          {["EVM chains", "Solana", "Starknet"].map((chain) => (
            <Option key={chain} onHover={onHover}>
              {chain}
            </Option>
          ))}
        </div>
      </>
    );
  }

  if (screen === "farcasterSelectToken") {
    return (
      <>
        <Header title={title} subtitle="Select Wallet" onHover={onHover} />
        <div className="cr-connected-wallet -mt-2 flex items-center justify-between rounded-2xl bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1777350018/farcaster_1_veen9o.jpg"
              alt="Farcaster"
              className="cr-connected-wallet-icon size-7 rounded-md"
            />
            <span className="cr-connected-wallet-status text-sm text-[#494949]">
              Wallet Connected
            </span>
          </div>
          <span className="cr-connected-wallet-info text-sm text-[#6d6d6d]">
            0x1234...5678
          </span>
        </div>
        <div className="cr-transfer-with-wallet flex min-h-[250px] flex-col gap-4">
          <p className="cr-select-wallet-token-text mb-0 ml-2 text-sm text-[#49494999]">
            Select Payment Token
          </p>
          <div className="cr-wallet-token-list flex max-h-[268px] flex-col gap-1">
            <Option onHover={onHover}>
              <span className="flex items-center gap-2">
                <img
                  src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087896/usdc_rexec2.svg"
                  alt="USDC"
                  className="cr-wallet-token-item-image size-8 rounded-full"
                />
                50.00 USDC{" "}
                <span className="text-xs text-[#7b7b7b]">≈ 100 USDC</span>
              </span>
            </Option>
            <Option onHover={onHover} muted>
              USDC on Base <span className="text-xs">Balance too low</span>
            </Option>
          </div>
        </div>
      </>
    );
  }

  if (screen === "fiatVerifyEmail") {
    return (
      <>
        <Header title={title} subtitle="Verify your email" onHover={onHover} />
        <div className="cr-verify-email flex flex-col gap-4">
          <p className="cr-verify-email-description ml-2 text-sm text-[#49494999]">
            Enter your email to continue with payment.
          </p>
          <Field
            label="Email address"
            value="you@example.com"
            onHover={onHover}
            className="cr-refund-address"
          />
          <Button onHover={onHover}>Continue</Button>
        </div>
      </>
    );
  }

  if (screen === "fiatSelectProvider") {
    return (
      <>
        <Header title={title} subtitle="Select Provider" onHover={onHover} />
        <Amount onHover={onHover} />
        <div className="cr-select-chain relative flex flex-col gap-2.5 overflow-hidden">
          <p className="cr-select-chain-title ml-2 text-sm text-[#49494999]">
            Select Provider (United States)
          </p>
          <div className="cr-select-chain-list relative flex cursor-pointer select-none flex-col gap-3 overflow-y-auto">
            <div className="cr-quotes-wrapper relative rounded-[18px] border border-[#1E5BF133] bg-[#F3F3FF] p-1">
              <div className="text-[#2f2f2f] flex items-center gap-2 px-4 py-2">
                <svg
                  className="cr-icon-star size-3.25 text-[#1E5BF1]"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M7.53596 1.18997C7.11958 0.326002 5.88302 0.326 5.46664 1.18996L4.37513 3.45479C4.36697 3.47172 4.34916 3.48608 4.32544 3.48918L1.81265 3.81713C0.86217 3.94119 0.465377 5.11261 1.1739 5.77855L3.0121 7.50625C3.02707 7.52032 3.0324 7.53913 3.02922 7.55617L2.56774 10.0237C2.38897 10.9796 3.40391 11.6867 4.24117 11.2367L6.46875 10.0397C6.48886 10.0289 6.51374 10.0289 6.53385 10.0397L8.76143 11.2367C9.59869 11.6867 10.6136 10.9796 10.4349 10.0237L9.97338 7.55617C9.97019 7.53913 9.97553 7.52032 9.9905 7.50625L11.8287 5.77855C12.5372 5.11261 12.1404 3.94119 11.1899 3.81713L8.67716 3.48918C8.65344 3.48608 8.63563 3.47172 8.62747 3.45479L7.53596 1.18997Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-xs">Recommended</p>
              </div>
              <div
                className="cr-select-chain-item cr-provider-detail cursor-pointer rounded-2xl border border-[#E6E6E6] bg-white text-sm transition-transform duration-200"
                onMouseEnter={onHover}
              >
                <div className="cr-select-chain-chain flex h-12 w-full items-center justify-between gap-2 px-5 py-2.5">
                  <div className="cr-select-chain-chain-desc flex items-center gap-2">
                    <div className="cr-select-chain-icon size-5 overflow-hidden rounded-[6px]">
                      <img
                        src="/images/ramp/GUARDARIAN.svg"
                        alt="Guardarian"
                        className="size-full object-contain"
                      />
                    </div>
                    <p className="cr-select-chain-name text-[#2F2F2F]">
                      Guardarian
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-[#F3F3FF] px-2 py-1">
                    <span className="cr-select-chain-eta text-xs font-semibold text-[#1E5BF1]">
                      $1 = $1.00
                    </span>
                  </div>
                </div>
                <div className="border-t border-[#E6E6E6] px-5 pb-4 pt-3">
                  <div className="flex items-center justify-between gap-1 text-sm text-[#2F2F2F]">
                    <div className="flex flex-col gap-px">
                      <span className="text-xs text-[#45454599]">You pay</span>
                      <p className="font-medium">$20.00</p>
                    </div>
                    <div className="flex flex-col gap-px">
                      <span className="text-xs text-[#45454599]">You get</span>
                      <p className="font-medium">20.00 USDC</p>
                    </div>
                    <button
                      className="grid size-7 place-content-center rounded-full bg-[#383838] p-1 text-white"
                      onMouseEnter={onHover}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cr-quotes-wrapper relative rounded-[18px] border border-[#E6E6E6] bg-[#F8F8F8] p-1">
              <div className="flex items-center justify-between px-3 py-1.5 text-[#2f2f2f]">
                <p className="text-xs">Other Providers</p>
                <span className="cr-select-chain-chevron text-[#6d6d6d]">
                  ⌄
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === "fiatTransferDetails") {
    const copyIcon = (
      <svg className="cr-transfer-copy size-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M5.16667 5.16667V4.5C5.16667 3.39543 6.0621 2.5 7.16667 2.5H11.5C12.6046 2.5 13.5 3.39543 13.5 4.5V8.84C13.5 9.94457 12.6046 10.84 11.5 10.84H10.8333M2.5 7.16667V11.5C2.5 12.6046 3.39543 13.5 4.5 13.5H8.83333C9.9379 13.5 10.8333 12.6046 10.8333 11.5V7.16667C10.8333 6.0621 9.9379 5.16667 8.83333 5.16667H4.5C3.39543 5.16667 2.5 6.0621 2.5 7.16667Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
    return (
      <>
        <Header title={title} subtitle="Transfer Details" onHover={onHover} />
        <div className="cr-direct-transfer-details flex flex-col gap-4">
          <p className="ml-2 text-sm text-[#49494999]">Transfer Details</p>
          <div className="cr-direct-transfer-details divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-3 pb-4 pt-1.5 text-sm text-[#7B7B7B]">
            <div className="flex items-center justify-between py-2.5">
              <p>Bank</p>
              <div className="flex items-center gap-2">
                {copyIcon}
                <p className="cr-transfer-value text-[#020818]">
                  Chainrails Bank
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <p>Account Number</p>
              <div className="flex items-center gap-2">
                {copyIcon}
                <p className="cr-transfer-value text-[#020818]">0123456789</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3">
              <p>Expires In</p>
              <div className="flex items-center gap-1">
                <svg
                  className="cr-transfer-expiry-icon size-4"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 6L3.20275 4.17103C2.92026 3.98632 2.75 3.67158 2.75 3.33406V1.25H9.25V3.33406C9.25 3.67158 9.07974 3.98632 8.79725 4.17103L6 6ZM6 6L8.79725 7.82897C9.07974 8.01368 9.25 8.32842 9.25 8.66594V10.75H2.75V8.66594C2.75 8.32842 2.92026 8.01368 3.20275 7.82897L6 6ZM10.25 10.75H1.75M10.25 1.25H1.75"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="cr-transfer-value tabular-nums text-[#020818]">
                  14:32
                </span>
              </div>
            </div>
          </div>
          <Button onHover={onHover}>I have made this payment</Button>
        </div>
      </>
    );
  }

  if (screen === "fiatKyc") {
    return (
      <>
        <Header
          title={title}
          subtitle="Verify your identity"
          onHover={onHover}
        />
        <div className="cr-kyc flex flex-col gap-4">
          <Info onHover={onHover}>
            We need a few more details to process your transaction.
          </Info>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="First Name"
              value="Your first name"
              onHover={onHover}
            />
            <Field label="Last Name" value="Your last name" onHover={onHover} />
          </div>
          <Field
            label="Phone Number"
            value="+1 202 555 0123"
            onHover={onHover}
          />
          <Button onHover={onHover}>Continue</Button>
        </div>
      </>
    );
  }

  if (screen === "fiatMobileMoneyDetails") {
    return (
      <>
        <Header
          title={title}
          subtitle="Mobile money details"
          onHover={onHover}
        />
        <div className="cr-mobile-money-details flex flex-col gap-3">
          <div className="cr-mobile-money-phone">
            <div
              className="cr-mobile-money-phone-input flex flex-col gap-1.25 rounded-2xl bg-white px-4 py-3.5"
              onMouseEnter={onHover}
            >
              <label className="cr-mobile-money-phone-label block text-[12px] text-[#6d6d6d]">
                Phone Number
              </label>
              <div className="flex items-center gap-1.5">
                <svg
                  className="cr-icon-phone size-5 text-[#6d6d6d]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.95964 3.54183H11.043M7.29297 18.5418H12.7096C14.0903 18.5418 15.2096 17.4225 15.2096 16.0418V3.9585C15.2096 2.57778 14.0903 1.4585 12.7096 1.4585H7.29297C5.91226 1.4585 4.79297 2.57778 4.79297 3.9585V16.0418C4.79297 17.4225 5.91226 18.5418 7.29297 18.5418Z"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="cr-mobile-money-phone-prefix text-sm font-medium text-[#020818]">
                  +254
                </span>
                <span className="cr-mobile-money-phone-field text-[15px] text-[#020818]">
                  712 345 678
                </span>
              </div>
            </div>
          </div>
          <div className="cr-mobile-money-carrier">
            <button
              type="button"
              className="cr-mobile-money-carrier-picker flex w-full items-end justify-between gap-2 rounded-2xl bg-white px-4 py-3.5"
              onMouseEnter={onHover}
            >
              <div className="cr-mobile-money-carrier-meta flex flex-col items-start gap-1">
                <span className="text-[12px] text-[#6d6d6d]">Carrier Name</span>
                <span className="cr-mobile-money-carrier-name font-medium text-[#020818]">
                  Select Option
                </span>
              </div>
              <svg
                className="cr-icon-chevron size-4 text-[#6d6d6d]"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: "rotate(270deg)" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.7068 3.29289C16.0973 3.68342 16.0973 4.31658 15.7068 4.70711L9.12102 11.2929C8.73049 11.6834 8.73049 12.3166 9.12102 12.7071L15.7068 19.2929C16.0973 19.6834 16.0973 20.31658 15.7068 20.7071C15.3163 21.0976 14.6831 21.0976 14.2926 20.7071L7.70681 14.1213C6.53523 12.9498 6.53523 11.0503 7.7068 9.8787L14.2926 3.29289C14.6831 2.90237 15.3163 2.90237 15.7068 3.29289Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <Button onHover={onHover}>Proceed</Button>
        </div>
      </>
    );
  }

  if (screen === "fiatMobileMoneyProcessing") {
    return (
      <>
        <Header title={title} subtitle="Processing payment" onHover={onHover} />
        <div className="cr-mobile-money-processing flex flex-col items-center justify-center gap-5 px-2 py-10">
          <div className="cr-mobile-money-processing-spinner relative grid size-12 place-items-center">
            <svg
              className="cr-mobile-money-processing-ring absolute inset-0 size-full animate-[spin_1.4s_linear_infinite] text-[#1E5BF1]/30"
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 28"
              />
            </svg>
            <div className="cr-mobile-money-processing-core size-5 rounded-full bg-[#1E5BF1]" />
          </div>
          <div className="cr-mobile-money-processing-content text-center">
            <h4 className="cr-mobile-money-processing-title font-[inter] text-[20px] text-[#020818]">
              Processing..
            </h4>
            <p className="cr-mobile-money-processing-subtitle mt-1 font-[inter] text-[14px] font-medium text-[#45454599]">
              Hang on for a second
            </p>
          </div>
        </div>
      </>
    );
  }

  if (screen === "fiatPaymentWidget") {
    return (
      <>
        <Header
          title={title}
          subtitle="Complete with Guardarian"
          onHover={onHover}
        />
        <div className="cr-fiat-payment-widget flex flex-col justify-center gap-1 rounded-3xl bg-white">
          <div className="px-4 pb-4">
            <div className="cr-initiating-loader relative mx-auto mt-2 size-[90px]">
              <svg
                className="cr-initiating-loader-svg absolute inset-0 size-full animate-[spin_1.4s_linear_infinite] text-[#E6E6E6] opacity-50"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  className="cr-initiating-loader-path"
                  d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                />
              </svg>
              <figure className="cr-initiating-loader-chain absolute left-1/2 top-1/2 size-7.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
                <img
                  src="/images/ramp/GUARDARIAN.svg"
                  alt="Guardarian"
                  className="size-full"
                />
              </figure>
            </div>
            <div className="space-y-4">
              <div className="space-y-1 px-4 text-center">
                <h4 className="cr-initiating-content-title font-[inter] text-lg text-[#494949]">
                  Complete with{" "}
                  <span className="font-semibold capitalize">Guardarian</span>
                </h4>
                <p className="text-sm text-[#45454599]">
                  Your flow might look something like this, so don’t be alarmed.
                </p>
              </div>
              <div className="cr-payment-flow-display cr-amount-display flex items-center justify-between rounded-2xl border border-[#E7E7E7] bg-[#F8F8F8] p-4 text-[#494949]">
                <div className="flex items-center gap-1">
                  <img
                    src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1775116708/ar_ugcv7x.svg"
                    alt="AR"
                    className="size-8 rounded-full object-cover"
                  />
                  <span>ARS</span>
                </div>
                <span className="cr-payment-flow-arrow text-lg">→</span>
                <div className="flex items-center gap-1">
                  <span className="relative size-8">
                    <img
                      src="https://res.cloudinary.com/dc3gdzgel/image/upload/q_auto/f_auto/v1772087896/usdc_rexec2.svg"
                      alt="USDC"
                      className="size-8 rounded-full object-cover"
                    />
                    <img
                      src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1772087942/ethereum_iyciq3.svg"
                      alt="Ethereum"
                      className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-white object-cover ring-1 ring-white"
                    />
                  </span>
                  <span>USDC</span>
                </div>
              </div>
              <Button onHover={onHover}>Open Guardarian</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={title} subtitle="Transaction history" onHover={onHover} />
      <div className="cr-history flex h-[300px] flex-col gap-4">
        <div className="cr-history-list relative flex flex-col gap-4 overflow-y-auto py-4">
          <div
            className="cr-history-item flex items-center gap-3 text-[#2F2F2F]"
            onMouseEnter={onHover}
          >
            <div className="cr-history-item-icon grid size-10 shrink-0 place-content-center rounded-full border border-[#F3F3F3] bg-white text-[#3BB15D]">
              ↑
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="cr-wallet-token-item-name">Horus Labs</p>
                <span className="cr-app-description flex items-center text-sm text-[#45454599]">
                  Transaction completed
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="mr-1 text-sm">$50.00</p>
                <p className="rounded-[6px] bg-[#EBF6EE] px-1.5 py-1 text-sm capitalize text-[#3BB15D]">
                  completed
                </p>
              </div>
            </div>
          </div>
          <div
            className="cr-history-item flex items-center gap-3 text-[#2F2F2F]"
            onMouseEnter={onHover}
          >
            <div className="cr-history-item-icon grid size-10 shrink-0 place-content-center rounded-full border border-[#F3F3F3] bg-white text-[#006CDB]">
              ⌛
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="cr-wallet-token-item-name">Horus Labs</p>
                <span className="cr-app-description flex items-center text-sm text-[#45454599]">
                  Transaction not completed
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="mr-1 text-sm">$25.00</p>
                <p className="rounded-[6px] bg-[#E5EFF9] px-1.5 py-1 text-sm capitalize text-[#006CDB]">
                  pending
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className="cr-history-load-more mx-auto w-fit rounded-full border border-[#E6E6E6] bg-[#F8F8F8] px-4 py-2 text-sm">
          Load more
        </button>
      </div>
    </>
  );
}
