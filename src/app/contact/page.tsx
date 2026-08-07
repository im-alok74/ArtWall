import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/shared/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Artist, venue, investor or collaborator — reach the Artwall Labs founding team directly.",
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:+${siteConfig.contact.phoneDigits}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.contact.phone,
    href: siteConfig.social.whatsapp,
  },
] as const;

/**
 * Contact is deliberately the quietest page on the site.
 *
 * By the time someone arrives here they have already heard the story, so there
 * is no pitch and no motion — just the fastest route to a human. These are the
 * founders' real, direct channels rather than a support queue, which is worth
 * something while the company is still small enough to answer personally.
 */
export default function ContactPage() {
  return (
    <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's connect."
        description="Artist, venue, investor, or collaborator — we'd like to hear from you. These reach the founding team directly."
      />

      <ul className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              {...(channel.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group border-border bg-wall-charcoal/40 hover:border-ember/40 flex h-full flex-col gap-3 rounded-xl border p-6 transition-colors"
            >
              <channel.icon
                aria-hidden
                className="text-muted-foreground group-hover:text-ember size-5 transition-colors"
              />
              <span className="text-muted-foreground text-label tracking-wider uppercase">
                {channel.label}
              </span>
              <span className="text-body break-words">{channel.value}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground text-body mt-12 max-w-2xl">
        {siteConfig.legalName} &middot; {siteConfig.credentials.origin}.{" "}
        {siteConfig.credentials.recognition}.
      </p>
    </section>
  );
}
