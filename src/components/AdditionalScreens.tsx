import type { MouseEvent } from "react";
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

interface AdditionalScreensProps {
  screen: AdditionalScreen;
  onHover: (event: MouseEvent<HTMLElement>) => void;
}

const chains = ["Ethereum", "Base", "Solana"];

function Header({
  title,
  subtitle,
  onHover,
}: {
  title: string;
  subtitle: string;
  onHover: AdditionalScreensProps["onHover"];
}) {
  return (
    <>
      <div
        className="cr-payment-head flex max-w-full justify-between gap-2 text-center"
        onMouseEnter={onHover}
      >
        <button
          className="cr-nav-button relative grid size-12 shrink-0 cursor-pointer place-content-center border border-[#eaeaea] bg-[#eee] p-0 transition-all duration-200 rounded-3xl"
          onMouseEnter={onHover}
        >
          <span className="text-2xl leading-none">‹</span>
        </button>
        <div
          className="cr-header-content mt-0.5 flex w-full flex-col text-left"
          onMouseEnter={onHover}
        >
          <h1
            className="cr-app-title mr-auto line-clamp-1 w-fit font-[inter] text-[1.25rem] capitalize leading-[106%] tracking-[-0.4px] text-[#494949] transition-[margin] duration-200 ml-auto"
            onMouseEnter={onHover}
          >
            {title}
          </h1>
          <div
            className="cr-app-description font-inter white-space-pre mr-auto line-clamp-1 w-fit min-w-0 max-w-[250px] text-sm tracking-[-0.28px] text-[#45454599] transition-[margin] duration-200 ml-auto"
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

function Amount({ onHover }: { onHover: AdditionalScreensProps["onHover"] }) {
  return (
    <div
      className="cr-amount-container relative flex items-center justify-between rounded-2xl bg-white px-4 py-3"
      onMouseEnter={onHover}
    >
      <span
        className="cr-amount-label text-[#494949] text-[14px]"
        onMouseEnter={onHover}
      >
        Payment Amount
      </span>
      <strong
        className="cr-amount-value font-[inter] text-[16px] font-medium leading-[106%] tracking-[-1.16px] text-[#020818]"
        onMouseEnter={onHover}
      >
        $50.00
      </strong>
    </div>
  );
}

function Option({
  children,
  onHover,
  muted = false,
}: {
  children: string;
  onHover: AdditionalScreensProps["onHover"];
  muted?: boolean;
}) {
  return (
    <div
      className={`cr-payment-option group flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-3.5 py-3 transition-colors duration-100 ${muted ? "bg-[#f2f2f2] text-[#6d6d6d]" : "bg-[#f8f8f8] text-[#2f2f2f] hover:bg-[#f0f0f0]"}`}
      onMouseEnter={onHover}
    >
      <span>{children}</span>
      <span className="text-lg text-[#8a8a8a]">›</span>
    </div>
  );
}

function Field({
  label,
  value,
  onHover,
}: {
  label: string;
  value: string;
  onHover: AdditionalScreensProps["onHover"];
}) {
  return (
    <div
      className="cr-field flex flex-col gap-1 rounded-2xl bg-white px-4 py-3"
      onMouseEnter={onHover}
    >
      <label className="text-xs text-[#6d6d6d]" onMouseEnter={onHover}>
        {label}
      </label>
      <div className="text-sm text-[#020818]" onMouseEnter={onHover}>
        {value}
      </div>
    </div>
  );
}

export default function AdditionalScreens({
  screen,
  onHover,
}: AdditionalScreensProps) {
  if (screen === "otherPaymentMethods") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Other payment methods"
          onHover={onHover}
        />
        <Amount onHover={onHover} />
        <div className="cr-payment-methods flex flex-col gap-1.5">
          <Option onHover={onHover}>Pay with bank transfer</Option>
          <Option onHover={onHover}>Pay with mobile money</Option>
          <Option onHover={onHover}>Pay with external provider</Option>
        </div>
      </>
    );
  }

  if (screen === "multiChainWalletSelect") {
    return (
      <>
        <Header title="Chainrails" subtitle="Select Chain" onHover={onHover} />
        <div className="cr-multichain-wallet-select flex flex-col gap-3">
          <div
            className="mx-auto grid size-28 place-content-center rounded-3xl bg-[#f2f2f2] text-4xl"
            onMouseEnter={onHover}
          >
            ◈
          </div>
          <p className="ml-2 text-sm text-[#49494999]" onMouseEnter={onHover}>
            Select Chain
          </p>
          {chains.map((chain) => (
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
        <Header
          title="Chainrails"
          subtitle="Select Payment Token"
          onHover={onHover}
        />
        <div
          className="cr-connected-wallet flex items-center justify-between rounded-3xl bg-white px-4 py-3.5"
          onMouseEnter={onHover}
        >
          <span>Farcaster Wallet</span>
          <span className="text-sm text-[#6d6d6d]">0x1234...5678</span>
        </div>
        <p className="ml-2 text-sm text-[#49494999]" onMouseEnter={onHover}>
          Select Payment Token
        </p>
        <div className="cr-wallet-token-list flex flex-col gap-1">
          <Option onHover={onHover}>USDC on Ethereum</Option>
          <Option onHover={onHover} muted>
            USDC on Base · Balance too low
          </Option>
        </div>
      </>
    );
  }

  if (screen === "fiatVerifyEmail") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Verify your email"
          onHover={onHover}
        />
        <div className="cr-verify-email flex flex-col gap-3">
          <p className="px-2 text-sm text-[#49494999]" onMouseEnter={onHover}>
            Enter your email to continue with payment.
          </p>
          <Field
            label="Email address"
            value="you@example.com"
            onHover={onHover}
          />
          <button
            className="cr-button h-10 rounded-4xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
            onMouseEnter={onHover}
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  if (screen === "fiatSelectProvider") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Select Provider"
          onHover={onHover}
        />
        <Amount onHover={onHover} />
        <div className="cr-select-provider flex flex-col gap-2">
          <p className="ml-2 text-sm text-[#49494999]" onMouseEnter={onHover}>
            Select Provider (United States)
          </p>
          <div
            className="cr-quotes-wrapper rounded-[18px] border border-[#1E5BF133] bg-[#F3F3FF] p-2"
            onMouseEnter={onHover}
          >
            <p className="px-2 py-1 text-xs text-[#2f2f2f]">Recommended</p>
            <Option onHover={onHover}>Guardarian</Option>
          </div>
          <Option onHover={onHover}>Other Providers</Option>
        </div>
      </>
    );
  }

  if (screen === "fiatTransferDetails") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Complete your bank transfer"
          onHover={onHover}
        />
        <div className="cr-direct-transfer-details flex flex-col gap-3">
          <div
            className="rounded-2xl bg-[#e5eff9] p-4 text-sm text-[#0869dc]"
            onMouseEnter={onHover}
          >
            Transfer the exact amount using the bank details below.
          </div>
          <Field label="Bank name" value="Chainrails Bank" onHover={onHover} />
          <Field label="Account number" value="0123456789" onHover={onHover} />
          <button
            className="cr-button h-10 rounded-4xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
            onMouseEnter={onHover}
          >
            I have made this payment
          </button>
        </div>
      </>
    );
  }

  if (screen === "fiatKyc") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Verify your identity"
          onHover={onHover}
        />
        <div className="cr-kyc flex flex-col gap-3">
          <div
            className="cr-kyc-info rounded-[18px] border border-[#1E5BF133] bg-[#F3F3FF] px-4 py-3 text-xs text-[#000000CC]"
            onMouseEnter={onHover}
          >
            We need a few more details to process your transaction.
          </div>
          <Field label="First name" value="Your first name" onHover={onHover} />
          <Field label="Last name" value="Your last name" onHover={onHover} />
          <Field
            label="Phone number"
            value="+1 202 555 0123"
            onHover={onHover}
          />
          <button
            className="cr-button h-10 rounded-4xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
            onMouseEnter={onHover}
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  if (screen === "fiatMobileMoneyDetails") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Mobile money details"
          onHover={onHover}
        />
        <div className="cr-mobile-money-details flex flex-col gap-3">
          <Field
            label="Phone number"
            value="+254 712 345 678"
            onHover={onHover}
          />
          <Field label="Carrier name" value="Select option" onHover={onHover} />
          <button
            className="cr-button h-10 rounded-4xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
            onMouseEnter={onHover}
          >
            Continue
          </button>
        </div>
      </>
    );
  }

  if (screen === "fiatMobileMoneyProcessing") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Processing payment"
          onHover={onHover}
        />
        <div
          className="cr-mobile-money-processing flex flex-col items-center justify-center gap-5 rounded-2xl bg-white px-2 py-12"
          onMouseEnter={onHover}
        >
          <div className="size-12 rounded-full border-4 border-[#1E5BF133] border-t-[#1E5BF1]" />
          <div className="text-center">
            <h4 className="text-xl text-[#020818]">Processing..</h4>
            <p className="mt-1 text-sm text-[#45454599]">
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
          title="Chainrails"
          subtitle="Complete with Guardarian"
          onHover={onHover}
        />
        <div className="cr-fiat-payment-widget flex flex-col gap-4 rounded-3xl bg-white p-4">
          <div
            className="cr-initiating-content text-center"
            onMouseEnter={onHover}
          >
            <h4 className="text-lg text-[#494949]">Complete with Guardarian</h4>
            <p className="text-sm text-[#45454599]">
              Your flow might look something like this, so don’t be alarmed.
            </p>
          </div>
          <div
            className="cr-amount-display flex items-center justify-between rounded-2xl bg-[#f8f8f8] p-4"
            onMouseEnter={onHover}
          >
            <span>USD</span>
            <span>→</span>
            <span>USDC</span>
          </div>
          <button
            className="cr-button h-10 rounded-2xl bg-gradient-to-b from-[#2f2f2f] to-[#0b0b0b] text-sm text-white"
            onMouseEnter={onHover}
          >
            Open Guardarian
          </button>
        </div>
      </>
    );
  }

  if (screen === "transactionHistory") {
    return (
      <>
        <Header
          title="Chainrails"
          subtitle="Transaction history"
          onHover={onHover}
        />
        <div className="cr-transaction-history flex flex-col gap-1">
          <p className="ml-2 text-sm text-[#49494999]" onMouseEnter={onHover}>
            Recent transactions
          </p>
          <Option onHover={onHover}>50.00 USDC · Completed</Option>
          <Option onHover={onHover}>25.00 USDC · Processing</Option>
        </div>
      </>
    );
  }

  return null;
}
