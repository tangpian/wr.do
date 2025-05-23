"use client";

import type React from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Icons } from "../shared/icons";
import { Button } from "../ui/button";

export const PricingSection = () => {
  return (
    <section className="relative overflow-hidden bg-zinc-50 text-zinc-800 selection:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-200 dark:selection:bg-zinc-600">
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,rgba(245,245,245,0.8),rgba(240,240,240,1))] dark:bg-[radial-gradient(100%_100%_at_50%_0%,rgba(13,13,17,1),rgba(9,9,11,1))]"></div>
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8">
        <div className="mb-12 space-y-3">
          <h2 className="text-center text-xl font-semibold leading-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
            Pricing
          </h2>
          <p className="text-center text-base text-zinc-600 dark:text-zinc-400 md:text-lg">
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PriceCard
            tier="Free"
            price="$0/mo"
            bestFor="For hobbyists and individuals looking to manage their links"
            CTA={
              <Button className="w-full" variant={"default"}>
                Get started free
              </Button>
            }
            benefits={[
              {
                text: "100K tracked clicks",
                checked: true,
                icon: <Icons.mousePointerClick className="size-4" />,
              },
              {
                text: "1k new links",
                checked: true,
                icon: <Icons.link className="size-4" />,
              },
              {
                text: "180-day analytics retention",
                checked: true,
                icon: <Icons.calendar className="size-4" />,
              },
              {
                text: "1k emails addresses",
                checked: true,
                icon: <Icons.calendar className="size-4" />,
              },
              {
                text: "One domain",
                checked: true,
                icon: <Icons.globe className="size-4" />,
              },
              {
                text: "Advanced analytics",
                checked: true,
                icon: <Icons.lineChart className="size-4" />,
              },
              {
                text: "Basic support",
                checked: true,
                icon: <Icons.help className="size-4" />,
              },
              {
                text: "API Access",
                checked: true,
                icon: <Icons.unplug className="size-4" />,
              },
            ]}
          />
          {/* <PriceCard
            tier="Pro"
            price="$79/mo"
            bestFor="Best for 5-50 users"
            CTA={
              <GhostButton className="w-full bg-zinc-800 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:hover:text-zinc-900">
                14-day free trial
              </GhostButton>
            }
            benefits={[
              { text: "Five workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "7 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          /> */}
          <PriceCard
            tier="Enterprise"
            price="Contact us"
            bestFor="For large organizations with custom needs"
            CTA={
              <Button className="w-full" variant={"outline"}>
                Contact us
              </Button>
            }
            benefits={[
              {
                text: "Unlimited tracked clicks/mo",
                checked: true,
                icon: <Icons.mousePointerClick className="size-4" />,
              },
              {
                text: "Unlimited new links",
                checked: true,
                icon: <Icons.link className="size-4" />,
              },
              {
                text: "1-year analytics retention",
                checked: true,
                icon: <Icons.calendar className="size-4" />,
              },
              {
                text: "1k emails addresses",
                checked: true,
                icon: <Icons.calendar className="size-4" />,
              },
              {
                text: "Three domain",
                checked: true,
                icon: <Icons.globe className="size-4" />,
              },
              {
                text: "Advanced analytics",
                checked: true,
                icon: <Icons.lineChart className="size-4" />,
              },
              {
                text: "Basic support",
                checked: true,
                icon: <Icons.help className="size-4" />,
              },
              {
                text: "API Access",
                checked: true,
                icon: <Icons.unplug className="size-4" />,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({ tier, price, bestFor, CTA, benefits }: PriceCardProps) => {
  return (
    <Card>
      <div className="flex flex-col items-center border-b border-zinc-200 pb-6 dark:border-zinc-700">
        <span className="mb-6 inline-block text-zinc-800 dark:text-zinc-50">
          {tier}
        </span>
        <span className="mb-3 inline-block text-4xl font-medium text-zinc-900 dark:text-zinc-100">
          {price}
        </span>
        <span className="bg-gradient-to-br from-zinc-700 to-zinc-900 bg-clip-text text-center text-transparent dark:from-zinc-200 dark:to-zinc-500">
          {bestFor}
        </span>
      </div>

      <div className="space-y-3 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  );
};

const Benefit = ({ text, checked, icon }: BenefitType) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center">{icon}</span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-200 text-sm text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          <X className="h-3 w-3" />
        </span>
      )}
      <span className="text-sm text-neutral-600 dark:text-zinc-300">
        {text}
      </span>
    </div>
  );
};

const Card = ({ className, children, style = {} }: CardProps) => {
  return (
    <motion.div
      initial={{
        filter: "blur(2px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      style={style}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50/50 to-zinc-100/80 p-6 dark:border-zinc-700 dark:from-zinc-950/50 dark:to-zinc-900/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

type PriceCardProps = {
  tier: string;
  price: string;
  bestFor: string;
  CTA: ReactNode;
  benefits: BenefitType[];
};

type CardProps = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

type BenefitType = {
  text: string;
  checked: boolean;
  icon: ReactNode;
};

type GhostButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
