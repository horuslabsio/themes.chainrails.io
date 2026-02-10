export type ThemeCategory = "gaming" | "health" | "travel" | "finance" | "education" | "others";

export interface Theme {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: ThemeCategory;
  authorId: string;
  visibility: "public" | "private";
  status: "draft" | "pending" | "approved" | "rejected";
  css: string;
  cssHash: string | null;
  cssSize: number | null;
  cdnUrl: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeFilter {
  search: string;
  category?: ThemeCategory;
  status?: Theme["status"];
  visibility?: Theme["visibility"];
}

export type ThemeModalScreen =
  | "selectMethod"
  | "payToAddress"
  | "payWithWallet"
  | "connectToWallet"
  | "transferToAddress"
  | "transferWithWallet"
  | "addRefundAddress"
  | "initiatingTransfer"
  | "confirmation";
