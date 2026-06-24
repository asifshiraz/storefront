import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export type CategoryTile = {
	name: string;
	slug: string;
	sub: string;
	/** accent = orange, ink = black/dark, stone = light gray */
	tone: "accent" | "ink" | "stone";
};

const TONES: Record<CategoryTile["tone"], string> = {
	accent: "bg-primary text-primary-foreground",
	ink: "bg-foreground text-background",
	stone: "bg-secondary text-foreground",
};

export function CategoryTiles({ tiles }: { tiles: CategoryTile[] }) {
	return (
		<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mb-8">
				<h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
					Shop by category
				</h2>
				<p className="mt-1 text-sm text-muted-foreground">Sovereign hardware, sorted.</p>
			</div>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
				{tiles.map((t) => (
					<LinkWithChannel
						key={t.slug}
						href={`/categories/${t.slug}`}
						className={`group relative flex aspect-square flex-col justify-between overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1 ${
							TONES[t.tone]
						}`}
					>
						<span className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">{t.sub}</span>
						<span className="font-display text-2xl font-bold uppercase leading-[0.95] tracking-tight sm:text-3xl">
							{t.name}
							<span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
								&rarr;
							</span>
						</span>
					</LinkWithChannel>
				))}
			</div>
		</section>
	);
}
