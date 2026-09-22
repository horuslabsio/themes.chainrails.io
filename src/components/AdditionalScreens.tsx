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
            className="cr-app-title ml-auto mr-auto line-clamp-1 w-fit font-[inter] text-[1.25rem] capitalize leading-[106%] tracking-[-0.4px] text-[#494949]"
            onMouseEnter={onHover}
          >
            {title}
          </h1>
          <div
            className="cr-app-description mr-auto line-clamp-1 w-fit min-w-0 max-w-[250px] text-sm tracking-[-0.28px] text-[#45454599]"
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

  if (screen === "otherPaymentMethods") {
    return (
      <>
        <Header
          title={title}
          subtitle="Other payment methods"
          onHover={onHover}
        />
        <Amount onHover={onHover} />
        <div className="cr-payment-methods flex flex-col gap-1">
          {" "}
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
          <div className="cr-select-chain-list relative flex flex-col gap-3">
            <div className="cr-quotes-wrapper relative rounded-[18px] border border-[#1E5BF133] bg-[#F3F3FF] p-1">
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="text-xs text-[#2f2f2f]">★ Recommended</span>
              </div>
              <Option onHover={onHover}>Guardarian</Option>
            </div>
            <div className="cr-quotes-wrapper relative rounded-[18px] border border-[#E6E6E6] bg-[#F8F8F8] p-1">
              <Option onHover={onHover}>Other Providers</Option>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === "fiatTransferDetails") {
    return (
      <>
        <Header title={title} subtitle="Transfer Details" onHover={onHover} />
        <div className="cr-direct-transfer-details flex flex-col gap-4">
          <p className="ml-2 text-sm text-[#49494999]">Transfer Details</p>
          <div className="cr-transfer-details divide-y divide-[#E6E6E6] rounded-[24px] bg-[#F2F2F2] px-4 py-4 text-sm text-[#7B7B7B]">
            <div className="cr-transfer-detail flex justify-between pb-3">
              <span>Bank</span>
              <strong className="text-[#020818]">Chainrails Bank</strong>
            </div>
            <div className="cr-transfer-detail flex justify-between py-2.5">
              <span>Account number</span>
              <strong className="text-[#020818]">0123456789</strong>
            </div>
            <div className="cr-transfer-detail flex justify-between pt-3">
              <span>Expires In</span>
              <strong className="text-[#020818]">14:32</strong>
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
          <Field
            label="Phone Number"
            value="+254 712 345 678"
            onHover={onHover}
            className="cr-mobile-money-phone-input"
          />
          <Field
            label="Carrier Name"
            value="Select Option⌄"
            onHover={onHover}
            className="cr-mobile-money-carrier-picker"
          />
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
            <div className="cr-mobile-money-processing-ring absolute inset-0 size-full rounded-full border-[3px] border-[#1E5BF1]/30 border-t-[#1E5BF1]" />
            <div className="cr-mobile-money-processing-core size-5 rounded-full bg-[#1E5BF1]" />
          </div>
          <div className="cr-mobile-money-processing-content text-center">
            <h4 className="cr-mobile-money-processing-title text-[20px] text-[#020818]">
              Processing..
            </h4>
            <p className="cr-mobile-money-processing-subtitle mt-1 text-[14px] font-medium text-[#45454599]">
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
              <div className="cr-initiating-loader-svg absolute inset-0 rounded-full border-4 border-[#E6E6E6] border-t-[#1E5BF1]" />
              <div className="cr-initiating-loader-chain absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E5BF1]" />
            </div>
            <div className="space-y-4">
              <div className="space-y-1 px-4 text-center">
                <h4 className="cr-initiating-content-title text-lg text-[#494949]">
                  Complete with Guardarian
                </h4>
                <p className="text-sm text-[#45454599]">
                  Your flow might look something like this, so don’t be alarmed.
                </p>
              </div>
              <div className="cr-payment-flow-display flex items-center justify-between rounded-2xl bg-[#f8f8f8] p-4">
                <span>USD</span>
                <span>→</span>
                <span>USDC</span>
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
        <div className="cr-history-empty flex h-full flex-col items-center justify-center gap-2 rounded-3xl bg-white p-4 text-center">
          <span className="text-sm text-[#49494999]">
            No Recent transactions found
          </span>
          <span className="text-sm text-[#49494999]">
            Make a payment to see your recent transactions
          </span>
        </div>
        <button className="cr-history-load-more mx-auto w-fit rounded-full border border-[#E6E6E6] bg-[#F8F8F8] px-4 py-2 text-sm">
          Load more
        </button>
      </div>
    </>
  );
}
