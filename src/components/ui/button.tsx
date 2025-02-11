// className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
// className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-dark text-white  px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
// const buttonShimmer = `bg-gradient-to-r from-slate-800 to-slate-900 bg-[length:200%_100%] animate-shimmer`;

import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  primary: `bg-dark text-white border border-dark hover:bg-dark/80`,
  secondary: `bg-white text-dark border border-dark hover:bg-gray-100`,
  outline: `bg-transparent text-dark border border-dark hover:bg-dark hover:text-white`,
};

const sizes = {
  xs: `h-8 px-4`,
  sm: `h-10 px-5`,
  md: `h-10 px-6`,
  lg: `h-14 px-7`,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizes;
  variant?: keyof typeof buttonVariants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, size = "md", variant = "primary", ...props }, ref) => {
  return <button ref={ref} className={cn("inline-flex w-fit items-center cursor-pointer justify-center gap-x-3 rounded-sm font-medium transition-colors focus:outline-none", sizes[size], buttonVariants[variant], className)} {...props} />;
});
Button.displayName = "Button";

export { Button };
