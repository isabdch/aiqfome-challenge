import Image from "next/image";

type BannerProps = {
  alt: string;
  image: string;
  height?: "sm" | "md" | "lg";
};

export default function Banner({ image, height = "sm", alt }: BannerProps) {
  const heightVariants = {
    sm: "h-[130px]",
    md: "h-[195px]",
    lg: "h-[250px]",
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${heightVariants[height]}`}
    >
      <Image
        fill
        src={image}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
