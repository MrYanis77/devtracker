import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "#FFFFFF",
        },
        focus: "var(--secondary)",
      },
    },

    dark: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "#FFFFFF",
        },
      },
    },
  },
});