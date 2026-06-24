import { Suspense } from "react";
import { Logo } from "./logo";
import { NavLinks } from "./nav/components/nav-links";
import { CartNavItem } from "./nav/components/cart-nav-item";
import { UserMenuContainer } from "./nav/components/user-menu/user-menu-container";
import { MobileMenu } from "./nav/components/mobile-menu";
import { SearchBar } from "./nav/components/search-bar";
import { ThemeToggle } from "./theme-toggle";

function SearchBarSkeleton() {
	return <div className="h-10 w-full animate-pulse rounded-lg bg-secondary" />;
}

function NavLinksSkeleton() {
	return (
		<>
			<li className="inline-flex">
				<span className="h-3 w-12 animate-pulse rounded bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-3 w-16 animate-pulse rounded bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-3 w-14 animate-pulse rounded bg-muted" />
			</li>
		</>
	);
}

export async function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background">
			{/* Utility / brand row — logo centered */}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between gap-4">
					{/* Left cluster: mobile menu (below lg) */}
					<div className="flex flex-1 items-center gap-2">
						<Suspense>
							<MobileMenu>
								<Suspense fallback={<SearchBarSkeleton />}>
									<SearchBar channel={channel} />
								</Suspense>
								<Suspense fallback={<NavLinksSkeleton />}>
									<NavLinks channel={channel} />
								</Suspense>
							</MobileMenu>
						</Suspense>
					</div>

					{/* Center: logo, absolutely centered regardless of side widths */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<Logo />
					</div>

					{/* Right cluster: actions */}
					<div className="flex flex-1 items-center justify-end gap-1">
						<ThemeToggle />
						<Suspense fallback={<div className="h-10 w-10" />}>
							<UserMenuContainer />
						</Suspense>
						<Suspense fallback={<div className="h-10 w-10" />}>
							<CartNavItem channel={channel} />
						</Suspense>
					</div>
				</div>
			</div>

			{/* Category nav row — centered, uppercase (lg+) */}
			<div className="hidden border-t border-border lg:block">
				<nav aria-label="Primary" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<ul className="flex h-12 items-center justify-center gap-8">
						<Suspense fallback={<NavLinksSkeleton />}>
							<NavLinks channel={channel} />
						</Suspense>
					</ul>
				</nav>
			</div>
		</header>
	);
}
