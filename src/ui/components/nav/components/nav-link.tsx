"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import useSelectedPathname from "@/hooks/use-selected-pathname";

export function NavLink({ href, children }: { href: string; children: ReactElement | string }) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="inline-flex">
			<LinkWithChannel
				href={href}
				prefetch={false}
				className={clsx(
					"relative inline-flex items-center py-1 text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
					isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
				)}
			>
				{children}
				<span
					className={clsx(
						"absolute -bottom-1 left-0 h-0.5 w-full bg-foreground transition-opacity",
						isActive ? "opacity-100" : "opacity-0",
					)}
					aria-hidden
				/>
			</LinkWithChannel>
		</li>
	);
}
