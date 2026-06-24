import { Suspense } from "react";
import { ProductListByCollectionDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { ProductList } from "@/ui/components/product-list";
import { HeroBannerCarouselLoader } from "@/ui/components/hero-banner-carousel-loader";
import type { HeroSlide } from "@/ui/components/hero-banner-carousel";
import { CategoryTiles, type CategoryTile } from "@/ui/components/home/category-tiles";
import { ParallaxBand } from "@/ui/components/home/parallax-band";

export const metadata = {
	title: "Node Runner — Bitcoin Hardware & Nodes",
	description: "Sovereign Bitcoin hardware and full-node kits. Engineered to run. Verify, don't trust.",
};

const SLIDES: HeroSlide[] = [
	{
		src: "/banners/carousal-banner-2.png",
		mobileSrc: "/banners/carousal-banner-2-mobile.png",
		wideSrc: "/banners/carousal-banner-2-wide.png",
		alt: "Secure Technologies for a Sovereign Lifestyle",
	},
	{
		src: "/banners/carousal-banner-1.png",
		mobileSrc: "/banners/carousal-banner-1-mobile.png",
		wideSrc: "/banners/carousal-banner-1-wide.png",
		alt: "Secure Technologies for a Sovereign Lifestyle",
	},
];

const TILES: CategoryTile[] = [
	{ name: "Phones", slug: "sovereign-mobile-mesh-devices", sub: "GrapheneOS", tone: "accent" },
	{ name: "Laptops", slug: "modular-laptops", sub: "Framework", tone: "ink" },
	{ name: "Desktops", slug: "desktops-infrastructure", sub: "Modular & mesh", tone: "ink" },
	{ name: "Routers", slug: "secure-routers-access-points", sub: "OpenWrt · WireGuard", tone: "stone" },
	{ name: "Nomad Gear", slug: "nomad-gear", sub: "Keys & shields", tone: "ink" },
	{ name: "Bundles", slug: "bundles", sub: "Ready-to-run kits", tone: "accent" },
	{ name: "Services", slug: "services", sub: "Flash · harden · audit", tone: "ink" },
];

async function getFeaturedProducts(channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.collections, "featured-products");

	const result = await executePublicGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel,
			first: 12,
			sortBy: { field: ProductOrderField.Collection, direction: OrderDirection.Asc },
		},
		revalidate: 300,
	});

	if (!result.ok) {
		console.warn(`[Homepage] Failed to fetch featured products for ${channel}:`, result.error.message);
		return [];
	}

	return result.data.collection?.products?.edges.map(({ node }) => node) ?? [];
}

export default function Page(props: { params: Promise<{ channel: string }> }) {
	return (
		<div className="bg-background">
			<HeroBannerCarouselLoader slides={SLIDES} />

			<CategoryTiles tiles={TILES} />

			<ParallaxBand
				tone="orange"
				eyebrow="GrapheneOS · pre-hardened"
				title="Sovereign Phones"
				ghost="PRIVACY"
				body="Pixel hardware flashed with GrapheneOS and locked down before it ships. Verify, don't trust."
				ctaLabel="Shop Phones"
				ctaHref="/categories/sovereign-mobile-mesh-devices"
			/>

			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">Featured</h2>
					<p className="mt-1 text-sm text-muted-foreground">Hand-picked, ready to run.</p>
				</div>
				<Suspense
					fallback={
						<ul
							role="list"
							data-testid="ProductList"
							className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
						>
							{Array.from({ length: 12 }).map((_, i) => (
								<li key={i} className="animate-pulse">
									<div className="aspect-square overflow-hidden bg-secondary" />
									<div className="mt-2 h-4 w-32 rounded bg-secondary" />
								</li>
							))}
						</ul>
					}
				>
					<FeaturedProducts params={props.params} />
				</Suspense>
			</section>

			<ParallaxBand
				tone="dark"
				eyebrow="Repairable · upgradeable · yours"
				title="Framework Laptops"
				ghost="MODULAR"
				body="Arch and QubesOS-ready machines you can open, upgrade, and actually own."
				ctaLabel="Shop Laptops"
				ctaHref="/categories/modular-laptops"
			/>
		</div>
	);
}

async function FeaturedProducts({ params: paramsPromise }: { params: Promise<{ channel: string }> }) {
	const { channel } = await paramsPromise;
	const products = await getFeaturedProducts(channel);

	return <ProductList products={products} />;
}
