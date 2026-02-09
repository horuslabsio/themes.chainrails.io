export interface Theme {
  id: string;
  slug: string;
  name: string;
  description: string;
  author: string;
  authorAvatar?: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  visibility: "public" | "private";
  css: string;
  previewImage?: string;
  users: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface ThemeFilter {
  search: string;
  tags: string[];
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
