import type { NextRequest } from "next/server";

// Container-to-container URL (from runtime env, set in docker-compose)
const SALEOR_INTERNAL = (process.env.SALEOR_API_URL ?? process.env.NEXT_PUBLIC_SALEOR_API_URL ?? "").replace(
	/\/graphql\/?$/,
	"",
);

// Public-facing Saleor URL (baked in at build time — appears in redirect Location headers)
const SALEOR_PUBLIC = (process.env.NEXT_PUBLIC_SALEOR_API_URL ?? "").replace(/\/graphql\/?$/, "");

export async function GET(_req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
	const { path } = await params;

	if (!SALEOR_INTERNAL) {
		return new Response("SALEOR_API_URL not configured", { status: 500 });
	}

	let url = `${SALEOR_INTERNAL}/${path.join("/")}`;

	// Follow redirects manually, rewriting public-domain Location headers back to the
	// internal container URL so we never leave the Docker network.
	for (let i = 0; i < 5; i++) {
		const res = await fetch(url, { redirect: "manual" });

		if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
			let location = res.headers.get("location") ?? "";
			if (SALEOR_PUBLIC && location.startsWith(SALEOR_PUBLIC)) {
				location = SALEOR_INTERNAL + location.slice(SALEOR_PUBLIC.length);
			}
			url = location;
			continue;
		}

		if (!res.ok || !res.body) {
			return new Response(null, { status: res.status || 502 });
		}

		return new Response(res.body, {
			headers: {
				"content-type": res.headers.get("content-type") ?? "image/webp",
				"cache-control": "public, max-age=31536000, immutable",
			},
		});
	}

	return new Response("Too many redirects", { status: 502 });
}
