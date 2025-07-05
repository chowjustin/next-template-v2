import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Providers from "@/app/providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteConfig = {
	title: "Next Template",
	description:
		"A Next.js 15 starter template with TypeScript, Tailwind CSS v4, and built-in tools for efficient development.",
	url: process.env.SITE_URL || "https://example.com",
};

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.title}`,
	},
	description: siteConfig.description,
	twitter: {
		card: "summary_large_image",
	},
	robots: { index: true, follow: true },
	authors: [
		{
			name: siteConfig.title,
			url: siteConfig.url,
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<meta name="apple-mobile-web-app-title" content={siteConfig.title} />
			</Head>
			{process.env.NEXT_PUBLIC_RUN_MODE === "production" && <GoogleAnalytics />}
			<body className={`${inter.className}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
