// Font page: https://cactus.tistory.com/306 -> Default: Fine Font 300 -> Bold: General Font 400
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1440px",
        xl: "1960px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)"],
      },
      fontSize: {
        // Display
        displayXL: ["5.5rem", "7.15rem"],
        displayLG: ["3.625rem", "4.7125rem"],
        displayMD: ["2.5rem", "3.25rem"],
        displaySM: ["1.75rem", "2.275rem"],
        // Heading
        headingLG: ["2rem", "2.6rem"],
        headingMD: ["1.75rem", "2.275rem"],
        headingSM: ["1.5rem", "1.95rem"],
        headingXS: ["1.125rem", "1.4625rem"],
        // Title
        titleLG: ["1.25rem", "1.625rem"],
        titleMD: ["1rem", "1.3rem"],
        titleSM: ["0.875rem", "1.1375rem"],
        // Label
        labelLG: ["1.25rem", "1.625rem"],
        labelMD: ["0.875rem", "1.1375rem"],
        labelSM: ["0.75rem", "0.975rem"],
        // Body
        bodyLG: ["1rem", "1.6rem"],
        bodyMD: ["0.875rem", "1.4rem"],
        bodySM: ["0.75rem", "1.2rem"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        orange: "#ff5b00",
        white: "#ffffff",
        lightGray: "#f7f7f7",
        midGray: "#b2b2b2",
        darkGray: "#4d4d4d",
        gray: "#e5e5e5",
        jetBlack: "#000000",
        spaceBlack: "#0e0e0e",
        offBlack: "#1c1c1f",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
