"use client";

import NextImage, { type ImageProps } from "next/image";

/**
 * next/image wrapper that loads product images directly from Saleor.
 *
 * Saleor already serves pre-sized WebP thumbnails (the GraphQL `thumbnail` field
 * bakes the size into the URL), so we mark images `unoptimized`: the browser
 * fetches the Saleor URL directly with no Next.js server-side optimization.
 * That is what avoids the hairpin-NAT problem — the Next.js container never
 * fetches the image, only the browser does.
 */
export function SaleorImage(props: ImageProps) {
	return <NextImage {...props} unoptimized />;
}
