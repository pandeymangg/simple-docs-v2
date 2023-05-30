import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      borderRadius: {
        med: "0.25rem",
      },
    },
    colors: {
      cpRosewater: "var(--rosewater)",
      cpFlamingo: "var(--flamingo)",
      cpPink: "var(--pink)",
      cpMauve: "var(--mauve)",
      cpRed: "var(--red)",
      cpMaroon: "var(--maroon)",
      cpPeach: "var(--peach)",
      cpYellow: "var(--yellow)",
      cpGreen: "var(--green)",
      cpTeal: "var(--teal)",
      cpSky: "var(--sky)",
      cpSapphire: "var(--sapphire)",
      cpBlue: "var(--blue)",
      cpLavender: "var(--lavender)",
      cpText: "var(--text)",
      cpSubtext0: "var(--subtext0)",
      cpSubtext1: "var(--subtext1)",
      cpSubtext2: "var(--subtext2)",
      cpOverlay0: "var(--overlay0)",
      cpOverlay1: "var(--overlay1)",
      cpOverlay2: "var(--overlay2)",
      cpSurface0: "var(--surface0)",
      cpSurface1: "var(--surface1)",
      cpSurface2: "var(--surface2)",
      cpBase: "var(--base)",
      cpCrust: "var(--crust)",
      cpMantle: "var(--mantle)",
    },
  },
  daisyui: {
    themes: [
      {
        "catppuccin-latte": {
          primary: "#dd7878",
        },
        "catppuccin-frappe": { primary: "#eebebe" },
        "catppuccin-macchiato": { primary: "#f0c6c6" },
        "catppuccin-mocha": { primary: "#f2cdcd" },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
