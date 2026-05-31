import cx from "classnames";

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
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded p-0.5",
        { "bg-white": lightBg },
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
