import Link from "next/link";
import { NavLink } from "./nav-link";
import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

async function getNavMenu(channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	try {
		const result = await executePublicGraphQL(MenuGetBySlugDocument, {
			variables: { slug: "navbar", channel },
			revalidate: 60 * 60,
		});
		return result.ok ? result.data : null;
	} catch {
		return null;
	}
}

export const NavLinks = async ({ channel }: { channel: string }) => {
	const data = await getNavMenu(channel).catch(() => null);

	if (!data) {
		console.warn(`[NavLinks] Failed to fetch navigation for ${channel}`);
		return <NavLink href="/products">All</NavLink>;
	}

	return (
		<>
			<NavLink href="/products">All</NavLink>
			{data.menu?.items?.map((item) => {
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
							{item.category.name}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={item.url} prefetch={false}>
							{item.name}
						</Link>
					);
				}
				return null;
			})}
		</>
	);
};
