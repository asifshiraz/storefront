"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/ui/components/ui/carousel";

export type HeroSlide = {
	/** Regular desktop image (~3:1, e.g. 1792×592). */
	src: string;
	/** Mobile / small-width image (square, e.g. 1024×1024). */
	mobileSrc?: string;
	/** Very-wide image (~4:1) for large screens so the hero stays short. */
	wideSrc?: string;
	alt: string;
};

type HeroBannerCarouselProps = {
	slides: HeroSlide[];
};

export function HeroBannerCarousel({ slides }: HeroBannerCarouselProps) {
	const autoplay = useRef(Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }));

	if (slides.length === 0) return null;

	return (
		<Carousel plugins={[autoplay.current]} opts={{ loop: true }} className="w-full" aria-label="Hero banner">
			<CarouselContent className="-ml-0">
				{slides.map((slide, index) => (
					<CarouselItem key={index} className="pl-0">
						{/* Aspect ratio steps with the viewport so each image shows uncropped:
						    square (mobile) → ~3:1 (desktop) → ~4:1 (very wide). Each ratio must
						    match its image's real dimensions. */}
						<div className="relative aspect-square sm:aspect-[1792/592] min-[1800px]:aspect-[2048/512]">
							{/* Mobile (square) */}
							<Image
								src={slide.mobileSrc ?? slide.src}
								alt={slide.alt}
								fill
								className="object-cover sm:hidden"
								priority={false}
								sizes="100vw"
							/>
							{/* Regular desktop (~3:1) */}
							<Image
								src={slide.src}
								alt={slide.alt}
								fill
								className="hidden object-cover sm:block min-[1800px]:hidden"
								priority={index === 0}
								sizes="100vw"
							/>
							{/* Very wide (~4:1) */}
							<Image
								src={slide.wideSrc ?? slide.src}
								alt={slide.alt}
								fill
								className="hidden object-cover min-[1800px]:block"
								priority={false}
								sizes="100vw"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="absolute bottom-4 left-0 right-0 flex justify-center">
				<CarouselDots />
			</div>
		</Carousel>
	);
}
