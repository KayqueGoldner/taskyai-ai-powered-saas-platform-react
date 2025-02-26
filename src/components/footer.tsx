/**
 * components
 */
import { Separator } from "@/components/ui/separator";

/**
 * constants
 */
import { SOCIAL_LINKS } from "@/constants";

export const Footer = () => {
  return (
    <footer className="p-4 pb-0">
      <div className="container flex min-h-16 flex-col items-center gap-3 rounded-t-xl border border-b-0 bg-background py-4 lg:flex-row lg:justify-between">
        <p className="text-center text-sm">&copy; 2025 Kayque Goldner</p>

        <ul className="flex flex-wrap items-center">
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li key={label} className="flex items-center">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {label}
              </a>

              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator orientation="vertical" className="mx-3 h-3" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
