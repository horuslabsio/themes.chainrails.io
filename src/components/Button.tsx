import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "brand" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({ children, variant = "primary", size = "sm", className, disabled, ...props }: ButtonProps) => {
  const baseClasses = "flex cursor-pointer items-center justify-center gap-1 font-normal transition-all duration-200 rounded-lg";

  const variants = {
    primary: "bg-[#2B2B2B] text-white focus:ring-gray-500",
    secondary:
      "bg-gradient-to-b from-white to-[#F8F8F8] border border-[#EDEDED] text-[#4F4F4F] hover:from-[#F8F8F8] hover:to-[#EDEDED]",
    brand: "bg-gradient-to-b from-[#5A42DE] to-[#4A35C7] text-white hover:from-[#6B52E8] hover:to-[#5B46D1] focus:ring-blue-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
  };

  const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], disabled && disabledClasses, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
