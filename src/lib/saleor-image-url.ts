// When NEXT_PUBLIC_SALEOR_MEDIA_PROXY=true (set at build time for container deployments),
// Saleor media URLs are rewritten to go through the Next.js /saleor-media/ proxy.
// This works around hairpin NAT limitations where the container can't reach the host's
// public domain — the Next.js server fetches from the internal container URL instead.
const USE_PROXY = process.env.NEXT_PUBLIC_SALEOR_MEDIA_PROXY === "true";

export function transformSaleorMediaUrl(url: string | null | undefined): string {
	if (!url || !USE_PROXY) return url ?? "";
	return url.replace(/^https?:\/\/[^/]+\/media\//, "/saleor-media/");
}
