"use client";

import { useEffect, useState } from "react";

/**
 * Sun / moon toggle that flips the .dark class on <html> and persists
 * the choice in localStorage under `nr-theme`. The initial value is set
 * by the inline script in app/layout.tsx (no flash on load).
 */
export function ThemeToggle() {
	const [isDark, setIsDark] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Read the theme class set by the inline script in app/layout.tsx. The
		// server can't know which theme the user prefers, so we gate the icon
		// behind `mounted` to avoid a hydration mismatch — this is the one
		// scenario where setState-in-effect is intentional.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
		 
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !isDark;
		setIsDark(next);
		document.documentElement.classList.toggle("dark", next);
		document.documentElement.style.colorScheme = next ? "dark" : "light";
		try {
			localStorage.setItem("nr-theme", next ? "dark" : "light");
		} catch {
			/* ignore storage errors */
		}
	};

	// Render a stable placeholder until mounted to avoid hydration mismatch.
	if (!mounted) {
		return <div className="h-10 w-10" aria-hidden="true" />;
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Switch to light mode" : "Switch to dark mode"}
			className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary hover:text-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			{isDark ? (
				// Sun
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2" />
					<path d="M12 20v2" />
					<path d="m4.93 4.93 1.41 1.41" />
					<path d="m17.66 17.66 1.41 1.41" />
					<path d="M2 12h2" />
					<path d="M20 12h2" />
					<path d="m6.34 17.66-1.41 1.41" />
					<path d="m19.07 4.93-1.41 1.41" />
				</svg>
			) : (
				// Moon
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			)}
		</button>
	);
}
