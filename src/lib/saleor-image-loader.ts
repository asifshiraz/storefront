// Custom next/image loader that serves product images directly from Saleor's
// own thumbnail service (browser -> Saleor), instead of proxying them through
// the Next.js server.
//
// Saleor pre-generates resized thumbnails at /thumbnail/<mediaId>/<size>/<format>,
// so we map the requested render width to the nearest supported size and request
// WebP. Because the browser fetches the public Saleor domain directly, this avoids
// the hairpin-NAT limitation (the Next.js container cannot reach the public API
// FQDN) that previously required a server-side proxy route.
const SALEOR_THUMB_SIZES = [128, 256, 512, 1024, 2048, 4096];

export function saleorImageLoader({ src, width }: { src: string; width: number }): string {
	// Match Saleor thumbnail URLs: .../thumbnail/<mediaId>/<size>[/<format>][/]
	const match = src.match(/^(.*\/thumbnail\/[^/]+)\/\d+(?:\/[a-zA-Z]+)?\/?$/);
	if (!match) {
		// Not a Saleor thumbnail URL (e.g. a local asset) — serve unchanged.
		return src;
	}
	const size =
		SALEOR_THUMB_SIZES.find((s) => s >= width) ?? SALEOR_THUMB_SIZES[SALEOR_THUMB_SIZES.length - 1];
	return `${match[1]}/${size}/webp`;
}
