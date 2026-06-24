"use client";

import { useEffect, useRef, useState } from "react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

type Tone = "dark" | "orange" | "light";

type ParallaxBandProps = {
	eyebrow?: string;
	title: string;
	/** Oversized word that drifts behind the content on scroll. */
	ghost: string;
	body?: string;
	ctaLabel: string;
	ctaHref: string;
	tone?: Tone;
};

const TONES: Record<Tone, { wrap: string; cta: string }> = {
	dark: { wrap: "bg-foreground text-background", cta: "bg-primary text-primary-foreground hover:opacity-90" },
	orange: {
		wrap: "bg-primary text-primary-foreground",
		cta: "bg-foreground text-background hover:opacity-90",
	},
	light: { wrap: "bg-secondary text-foreground", cta: "bg-primary text-primary-foreground hover:opacity-90" },
};

export function ParallaxBand({
	eyebrow,
	title,
	ghost,
	body,
	ctaLabel,
	ctaHref,
	tone = "dark",
}: ParallaxBandProps) {
	const ref = useRef<HTMLElement>(null);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		let raf = 0;
		const update = () => {
			const el = ref.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const vh = window.innerHeight || 1;
			// -1 (below) → 0 (centered) → 1 (above) as the band passes through the viewport
			const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
			setOffset(progress);
		};
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			cancelAnimationFrame(raf);
		};
	}, []);

	const t = TONES[tone];

	return (
		<section ref={ref} className={`relative overflow-hidden ${t.wrap}`}>
			{/* Parallax ghost word */}
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 flex items-center justify-center"
				style={{ transform: `translate3d(0, ${offset * 80}px, 0)` }}
			>
				<span className="select-none whitespace-nowrap font-display text-[24vw] font-bold uppercase leading-none tracking-tighter opacity-[0.07]">
					{ghost}
				</span>
			</span>

			{/* Content */}
			<div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
				{eyebrow && (
					<span className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">{eyebrow}</span>
				)}
				<h2 className="max-w-3xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
					{title}
				</h2>
				{body && <p className="max-w-xl text-base opacity-80">{body}</p>}
				<LinkWithChannel
					href={ctaHref}
					className={`mt-1 inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity ${t.cta}`}
				>
					{ctaLabel}
					<span aria-hidden>&rarr;</span>
				</LinkWithChannel>
			</div>
		</section>
	);
}
