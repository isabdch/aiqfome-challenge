import Image from "next/image";

type BannerProps = {
  image: string;
  height?: "sm" | "md" | "lg";
};

export default function Banner({ image, height = "sm" }: BannerProps) {
  const heightVariants = {
    sm: "h-[130px]",
    md: "h-[195px]",
    lg: "h-[250px]",
  };

  return (
    <div className={`relative w-full ${heightVariants[height]}`}>
      <Image
        fill
        src={image}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
