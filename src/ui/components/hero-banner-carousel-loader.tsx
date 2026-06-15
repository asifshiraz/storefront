"use client";

import { useSyncExternalStore } from "react";
import { HeroBannerCarousel } from "./hero-banner-carousel";
import type { HeroSlide } from "./hero-banner-carousel";

// useSyncExternalStore returns getServerSnapshot() during SSR and initial hydration,
// then switches to getSnapshot() after — guaranteeing server/client HTML matches.
const useIsClient = () =>
	useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

export function HeroBannerCarouselLoader({ slides }: { slides: HeroSlide[] }) {
	const isClient = useIsClient();

	if (!isClient) {
		return <div className="aspect-square animate-pulse bg-secondary sm:aspect-[5/2]" />;
	}

	return <HeroBannerCarousel slides={slides} />;
}
