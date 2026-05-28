import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  size?: number;
  lightBg?: boolean;
  className?: string;
}

/**
 * Square logo slot used inside card headings + tech chip rows. The optional
 * white-plate background is for dark/transparent brand marks that would
 * otherwise vanish on the dark theme.
 */
export function LogoMark({ src, alt = "", size = 20, lightBg, className }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded p-0.5 ${lightBg ? "bg-white" : ""} ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain"
        unoptimized
      />
    </span>
  );
}
