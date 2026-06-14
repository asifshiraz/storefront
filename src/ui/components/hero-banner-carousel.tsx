"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/ui/components/ui/carousel";

export type HeroSlide = {
	src: string;
	mobileSrc?: string;
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
						<div className="relative aspect-square sm:aspect-[5/2]">
							<Image
								src={slide.src}
								alt={slide.alt}
								fill
								className="hidden object-cover sm:block"
								priority={index === 0}
								sizes="100vw"
							/>
							<Image
								src={slide.mobileSrc ?? slide.src}
								alt={slide.alt}
								fill
								className="object-cover sm:hidden"
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
