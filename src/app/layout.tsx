import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Oswald } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { rootMetadata } from "@/lib/seo";

// Emphatic display face for headings (highlight bands, section titles)
const display = Oswald({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-display",
	display: "swap",
});
import { localeConfig } from "@/config/locale";

/**
 * Root metadata for the entire site.
 * Configuration is in src/lib/seo/config.ts
 */
export const metadata = rootMetadata;

/**
 * Runs before paint to set the .dark class from localStorage (or fall back
 * to dark — Node Runner is dark-by-default). Prevents the light-flash-on-load.
 */
const themeInitScript = `
(function () {
	try {
		var stored = localStorage.getItem('nr-theme');
		var theme = stored === 'light' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.documentElement.style.colorScheme = theme;
	} catch (_) {
		document.documentElement.classList.add('dark');
		document.documentElement.style.colorScheme = 'dark';
	}
})();
`;

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html
			lang={localeConfig.htmlLang}
			className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} dark min-h-dvh`}
			style={{ colorScheme: "dark" }}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="min-h-dvh font-sans">{children}</body>
		</html>
	);
}
