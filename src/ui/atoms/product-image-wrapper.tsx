import NextImage, { type ImageProps } from "next/image";
import clsx from "clsx";
import { transformSaleorMediaUrl } from "@/lib/saleor-image-url";

interface ProductImageWrapperProps extends ImageProps {
	containerClassName?: string;
}

export const ProductImageWrapper = ({
	containerClassName,
	className,
	...props
}: ProductImageWrapperProps) => {
	const src = typeof props.src === "string" ? transformSaleorMediaUrl(props.src) : props.src;
	return (
		<div className={clsx("aspect-square overflow-hidden bg-secondary", containerClassName)}>
			<NextImage
				{...props}
				src={src}
				className={clsx("h-full w-full object-cover object-center", className)}
			/>
		</div>
	);
};
