import { klassed } from "./../utils.ts";

export const Button = klassed(
  "button",
  {
    base: [
      "inline-flex items-center justify-center gap-2 outline-none",
      "border",
      "focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-90 disabled:pointer-events-none",
    ],
    variants: {
      color: {
        neutral: [
          "bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-5 text-neutral-11",
          "border-neutral-6",
          "focus-visible:ring-neutral-8 focus-visible:ring-offset-neutral-1",
          "disabled:bg-neutral-4 disabled:text-neutral-8 disabled:border-neutral-5",
        ],
        primary: [
          "bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-11",
          "border-primary-6",
          "focus-visible:ring-primary-8 focus-visible:ring-offset-primary-1",
          "disabled:bg-primary-4 disabled:text-primary-8 disabled:border-primary-5",
        ],
      },
      size: {
        sm: "px-3 h-7 text-sm font-normal rounded-md",
        md: "px-4 h-9 text-base font-medium rounded-lg",
        lg: "px-5 h-11 text-lg font-medium rounded-xl",
      },
    },
    defaults: {
      color: "neutral",
      size: "md",
    },
  },
  {
    dp: {
      type: "button",
    },
  }
);

if (import.meta.env.DEV) Button.displayName = "Button";
