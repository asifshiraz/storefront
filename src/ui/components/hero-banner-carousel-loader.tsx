"use client";

import dynamic from "next/dynamic";
import type { HeroSlide } from "./hero-banner-carousel";

const HeroBannerCarousel = dynamic(
	() => import("./hero-banner-carousel").then((mod) => ({ default: mod.HeroBannerCarousel })),
	{
		ssr: false,
		loading: () => <div className="aspect-square animate-pulse bg-secondary sm:aspect-[5/2]" />,
	},
);

export function HeroBannerCarouselLoader({ slides }: { slides: HeroSlide[] }) {
	return <HeroBannerCarousel slides={slides} />;
}
