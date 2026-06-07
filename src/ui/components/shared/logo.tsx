interface LogoProps {
	className?: string;
	ariaLabel?: string;
}

const BANNER_SRC = "/node-runner-logo-banner.png";

export const Logo = ({ className, ariaLabel = "Node Runner — Bitcoin Hardware & Nodes" }: LogoProps) => {
	return (
		<span className={`inline-flex items-center ${className ?? ""}`} aria-label={ariaLabel}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={BANNER_SRC}
				alt=""
				width={1513}
				height={285}
				className="h-full w-auto select-none"
				draggable={false}
			/>
		</span>
	);
};
