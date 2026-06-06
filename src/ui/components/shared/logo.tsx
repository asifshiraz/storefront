/**
 * Shared Logo Component — Node Runner
 *
 * Single source of truth for the storefront logo. Renders the round
 * Node Runner mark plus a wordmark beside it. The mark is a raster
 * image (the generated logo art); the wordmark is text so it stays
 * crisp at every zoom level and theme.
 *
 * The image lives at `/public/node-runner-logo-banner.png`. Replace that
 * file to update the artwork — no code changes needed.
 *
 * @example
 * <Logo className="h-9 w-auto" />                  // Header
 * <Logo className="h-10 w-auto" inverted />       // Footer (dark bg)
 * <Logo markOnly className="h-12 w-12" />          // Square contexts
 */

interface LogoProps {
	className?: string;
	/** Accessible label for the logo */
	ariaLabel?: string;
	/** Invert wordmark color (useful on the always-dark footer in light theme) */
	inverted?: boolean;
	/** Hide the wordmark text and show only the circular mark */
	markOnly?: boolean;
}

const MARK_SRC = "/node-runner-logo-banner.png";

export const Logo = ({
	className,
	ariaLabel = "Node Runner — Bitcoin Hardware & Nodes",
	inverted = false,
	markOnly = false,
}: LogoProps) => {
	const wordmarkColor = inverted
		? "text-background dark:text-foreground"
		: "text-foreground dark:text-foreground";

	return (
		<span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} aria-label={ariaLabel}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={MARK_SRC}
				alt=""
				width={64}
				height={64}
				className="aspect-square h-full w-auto select-none rounded-full"
				draggable={false}
			/>
			{!markOnly && (
				<span className={`flex flex-col leading-none ${wordmarkColor}`}>
					<span className="text-[15px] font-bold uppercase tracking-[0.14em] sm:text-base">
						<span className="text-brand-orange">Node</span> Runner
					</span>
					<span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
						Bitcoin Hardware &amp; Nodes
					</span>
				</span>
			)}
		</span>
	);
};
