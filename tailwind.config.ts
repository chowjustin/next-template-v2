import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1rem",
			screens: {
				xl: "1152px",
			},
		},
		extend: {
			fontFamily: {
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			colors: {
				primary: {
					50: "#fae1e1",
					//* Background
					100: "#f7cccc",
					200: "#f3b3b3",
					//* Complement
					300: "#ee9a9a",
					400: "#ea8080",
					//* Default
					500: "#e66767",
					//* Hovered
					600: "#c05656",
					//* Active
					700: "#994545",
					800: "#733434",
					900: "#4d2222",
					1000: "#2e1515",
				},
				secondary: {
					50: "#f9d6d5",
					//* Background
					100: "#f6bbba",
					200: "#f19a97",
					//* Complement
					300: "#ec7874",
					400: "#e85652",
					//* Default
					500: "#e3342f",
					//* Hovered
					600: "#bd2b27",
					//* Active
					700: "#97231f",
					800: "#721a18",
					900: "#4c1110",
					1000: "#2d0a09",
				},
				"primary-bg": "#dc3545", // bg
				"primary-hover": "#bb2d3b", // hover
				dark: "#212529",
				light: "#ffffff",
				"theme-gray": "#f8f9fa",
			},
			boxShadow: {
				footer: "0px -2px 4px rgba(0, 0, 0, 0.25)",
				"card-menu": "0 4px 18px rgba(0, 0, 0, 0.15)",
			},
		},
	},
	plugins: [],
};
export default config;
