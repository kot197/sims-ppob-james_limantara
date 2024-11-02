import type { Config } from "tailwindcss";
import tailwindForms from '@tailwindcss/forms'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Roboto', 'sans-serif'],
        body: ['Roboto', 'sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        '18': '4.5rem',  // Add this custom width
      },
    },
  },
  plugins: [
    tailwindForms,
  ],
};
export default config;
