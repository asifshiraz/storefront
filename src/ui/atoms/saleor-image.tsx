"use client";

import NextImage, { type ImageProps } from "next/image";
import { saleorImageLoader } from "@/lib/saleor-image-loader";

/**
 * next/image wrapper that loads images directly from Saleor's thumbnail service
 * via {@link saleorImageLoader}.
 *
 * Must be a Client Component: a custom `loader` is a function prop, and functions
 * cannot cross the Server -> Client boundary. Server Components can still render
 * <SaleorImage> because only serializable props (src, width, alt, …) are passed in.
 */
export function SaleorImage(props: ImageProps) {
	return <NextImage {...props} loader={saleorImageLoader} />;
}
