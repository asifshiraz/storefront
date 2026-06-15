// When NEXT_PUBLIC_SALEOR_MEDIA_PROXY=true (set at build time for container deployments),
// Saleor image URLs are rewritten to go through the Next.js /saleor/ proxy.
// This works around hairpin NAT limitations where the container can't reach the host's
// public domain — the Next.js server fetches from the internal container URL instead.
// Covers both /media/ and /thumbnail/ (and any other Saleor API paths).
const USE_PROXY = process.env.NEXT_PUBLIC_SALEOR_MEDIA_PROXY === "true";
const SALEOR_HOST = process.env.NEXT_PUBLIC_SALEOR_API_URL?.replace(/\/graphql\/?$/, "").replace(/\/$/, "");

export function transformSaleorMediaUrl(url: string | null | undefined): string {
	if (!url || !USE_PROXY || !SALEOR_HOST) return url ?? "";
	if (url.startsWith(SALEOR_HOST + "/")) {
		return "/saleor" + url.slice(SALEOR_HOST.length).replace(/\/$/, "");
	}
	return url;
}
