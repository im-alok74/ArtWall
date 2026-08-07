import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small tracked label above the title — the gallery-placard cue. */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * The consistent opening of every section.
 *
 * Exists so section headers cannot drift apart in size, rhythm, or wording
 * style as the page grows — the eyebrow/title/description shape is the site's
 * equivalent of a museum wall label, and it should feel identical everywhere.
 *
 * Server Component: pure presentation, no JavaScript shipped.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <p className="text-ember text-label tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-h2 lg:text-h1 max-w-3xl tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-body-lg max-w-2xl text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
