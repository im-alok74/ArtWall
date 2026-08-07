"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { navItems, primaryCta, secondaryNavItems } from "@/config/nav";
import { duration, ease, transition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/shared/magnetic";

/**
 * Primary navigation.
 *
 * Behaviour: transparent over the hero so nothing competes with the first
 * five seconds, then settles into a glass surface once the wall scrolls
 * underneath it (Phase 2 §14, micro-interaction #22).
 *
 * Accessibility: a real <nav> with a labelled landmark; the mobile menu is a
 * modal dialog that traps nothing but manages focus properly — focus moves to
 * the panel on open and returns to the trigger on close, Escape dismisses it,
 * and background scroll is locked while it is open.
 *
 * Performance: the only client state is a boolean for "scrolled" and one for
 * the mobile panel. Scroll is read through Framer's `useScroll` (rAF-batched,
 * passive) rather than a raw scroll listener, so it never thrashes layout.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Escape closes the panel; scroll stays locked while it is open.
  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Move focus into the panel on open, and back to the trigger on close.
  useEffect(() => {
    if (menuOpen) {
      panelRef.current?.focus();
    } else if (document.activeElement === document.body) {
      triggerRef.current?.focus();
    }
  }, [menuOpen]);

  // A route change must never leave the mobile panel covering the new page.
  // Adjusted during render (React's documented pattern for state derived from
  // a changing value) rather than in an effect: it avoids a cascading render,
  // and unlike an onClick handler it also covers browser back/forward.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 transition-colors duration-300",
        scrolled
          ? "border-border bg-background/80 border-b backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="max-w-wall mx-auto flex h-16 items-center justify-between px-5 md:px-12 lg:px-16">
        <Link href="/" className="rounded-sm" aria-label="ArtWall — home">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group text-small relative transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {/* Underline draws in on hover; stays put on the current page. */}
                    <span
                      aria-hidden
                      className={cn(
                        "bg-ember absolute -bottom-1.5 left-0 h-px transition-[width] duration-200 ease-out",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden md:inline-block">
            <Link
              href={primaryCta.href}
              className="bg-ember text-wall-black hover:bg-ember-glow text-small inline-flex h-9 items-center rounded-md px-4 font-medium transition-colors"
            >
              {primaryCta.label}
            </Link>
          </Magnetic>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="text-foreground -mr-2 inline-flex size-11 items-center justify-center rounded-md md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: duration.moderate, ease: ease.standard }}
            className="bg-background fixed inset-0 z-400 flex flex-col px-5 pt-5 md:hidden"
          >
            <div className="flex h-16 items-center justify-between">
              <span className="font-heading text-h4">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-foreground -mr-2 inline-flex size-11 items-center justify-center rounded-md"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8">
              <ul className="flex flex-col gap-2">
                {[...navItems, ...secondaryNavItems].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...transition.base,
                      delay: 0.04 * index + 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="font-heading text-h3 block py-3 tracking-tight"
                    >
                      {item.label}
                      <span className="text-muted-foreground text-small mt-1 block font-sans tracking-normal">
                        {item.description}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <Link
              href={primaryCta.href}
              className="bg-ember text-wall-black text-body mt-auto mb-8 inline-flex h-12 items-center justify-center rounded-md font-medium"
            >
              {primaryCta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
