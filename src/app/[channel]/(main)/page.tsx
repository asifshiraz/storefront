import { Suspense } from "react";
import { ProductListByCollectionDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { ProductList } from "@/ui/components/product-list";
import { HeroBannerCarouselLoader } from "@/ui/components/hero-banner-carousel-loader";
import type { HeroSlide } from "@/ui/components/hero-banner-carousel";

export const metadata = {
	title: "Node Runner — Bitcoin Hardware & Nodes",
	description: "Sovereign Bitcoin hardware and full-node kits. Engineered to run. Verify, don't trust.",
};

const SLIDES: HeroSlide[] = [
	{
		src: "/banners/carousal-banner-1.png",
		mobileSrc: "/banners/carousal-banner-1-mobile.png",
		alt: "Secure Technologies for a Sovereign Lifestyle",
	},
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
		<div className="bg-foreground">
			<div className="mx-auto max-w-7xl bg-background">
				<HeroBannerCarouselLoader slides={SLIDES} />
				<section className="px-8 pb-16">
					<div className="mt-8" />
					<h2 className="sr-only">Product list</h2>
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
										<div className="mt-2 flex justify-between">
											<div>
												<div className="mt-1 h-4 w-32 rounded bg-secondary" />
												<div className="mt-1 h-4 w-20 rounded bg-secondary" />
											</div>
											<div className="mt-1 h-4 w-16 rounded bg-secondary" />
										</div>
									</li>
								))}
							</ul>
						}
					>
						<FeaturedProducts params={props.params} />
					</Suspense>
				</section>
			</div>
		</div>
	);
}

async function FeaturedProducts({ params: paramsPromise }: { params: Promise<{ channel: string }> }) {
	const { channel } = await paramsPromise;
	const products = await getFeaturedProducts(channel);

	return <ProductList products={products} />;
}
