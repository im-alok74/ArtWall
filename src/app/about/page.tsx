import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArtWallLogo } from "@/components/brand/artwall-logo";
import { primaryCta } from "@/config/nav";
import { lifecycle, markElements, products } from "@/config/products";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/shared/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Artwall Labs builds the platform where artists exhibit, certify, and sell their work — physical exhibitions, tamper-proof provenance, and a fair marketplace.",
};

export default function AboutPage() {
  const launching = products.filter((product) => product.atLaunch);
  const later = products.filter((product) => !product.atLaunch);

  return (
    <>
      <section className="section-y max-w-wall mx-auto px-5 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="About us"
          title="The platform behind every wall."
          description="Artwall Labs builds the place where artists exhibit, certify, and sell. We connect creators with audiences through physical exhibitions, tamper-proof provenance, and a marketplace that pays the maker properly — in one system rather than five."
        />
      </section>

      {/* The mark, explained. */}
      <section className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="The mark"
          title="Four things, holding each other in place."
        />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
          <div className="border-border bg-wall-charcoal/40 flex items-center justify-center rounded-xl border p-12">
            <ArtWallLogo className="size-40" titled />
          </div>

          <dl className="flex flex-col gap-8">
            {markElements.map((element) => (
              <div key={element.name} className="flex flex-col gap-1.5">
                <dt className="font-heading text-h4 tracking-tight">
                  {element.name}
                </dt>
                <dd className="text-muted-foreground text-body">
                  {element.line}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="The lifecycle"
          title="The wall to exhibit. The ledger to prove."
          description="Five stages an artwork moves through in the ArtWall system."
        />

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {lifecycle.map((stage, index) => (
            <li key={stage.step} className="flex flex-col gap-3">
              <span className="text-ember text-label tracking-wider tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-heading text-h4 tracking-tight">
                {stage.step}
              </span>
              <span className="text-muted-foreground text-small">
                {stage.line}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Products */}
      <section className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16">
        <SectionHeading
          eyebrow="What we're building"
          title="Nine products, one system."
          description="Everything below shares one artist account, one certificate standard, and one marketplace."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {launching.map((product) => (
            <li
              key={product.name}
              className="border-border bg-wall-charcoal/40 flex flex-col gap-2 rounded-xl border p-6"
            >
              <span className="text-ember text-caption tracking-wider uppercase">
                {product.audience}
              </span>
              <span className="font-heading text-h4 tracking-tight">
                {product.name}
              </span>
              <span className="text-muted-foreground text-small">
                {product.line}
              </span>
            </li>
          ))}
        </ul>

        {later.length > 0 && (
          <>
            <h3 className="text-muted-foreground text-label mt-12 tracking-wider uppercase">
              After launch
            </h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {later.map((product) => (
                <li
                  key={product.name}
                  className="border-border flex flex-col gap-1.5 rounded-xl border border-dashed p-6"
                >
                  <span className="font-heading text-h4 tracking-tight">
                    {product.name}
                  </span>
                  <span className="text-muted-foreground text-small">
                    {product.line}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {/* Company */}
      <section className="section-y border-border max-w-wall mx-auto border-t px-5 md:px-12 lg:px-16">
        <SectionHeading eyebrow="The company" title={siteConfig.legalName} />

        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground text-label tracking-wider uppercase">
              Recognition
            </dt>
            <dd className="text-body mt-2">
              {siteConfig.credentials.recognition}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-label tracking-wider uppercase">
              Origin
            </dt>
            <dd className="text-body mt-2">{siteConfig.credentials.origin}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-label tracking-wider uppercase">
              Technology partner
            </dt>
            <dd className="text-body mt-2">
              <a
                href={siteConfig.techPartner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ember underline underline-offset-4 transition-colors"
              >
                {siteConfig.techPartner.name}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-label tracking-wider uppercase">
              Reach us
            </dt>
            <dd className="text-body mt-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-ember underline underline-offset-4 transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </dd>
          </div>
        </dl>

        <Link
          href={primaryCta.href}
          className="bg-ember text-wall-black hover:bg-ember-glow text-body mt-12 inline-flex h-12 items-center gap-2 rounded-md px-6 font-medium transition-colors"
        >
          {primaryCta.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>
    </>
  );
}
