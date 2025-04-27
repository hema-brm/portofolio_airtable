import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        foreground: '#FFFFFF',
        accent: '#3D7EFF',
      },
    },
  },
  plugins: [],
}

export default config
