"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";

import { archetypes, type ArchetypeId } from "@/features/archetype/archetypes";
import { questions } from "@/features/archetype/questions";
import { primaryCta } from "@/config/nav";
import { transition } from "@/lib/motion";

/** Tally the answers; ties break toward the earliest answer given. */
function resolve(answers: ArchetypeId[]): ArchetypeId {
  const tally = new Map<ArchetypeId, number>();
  for (const answer of answers) {
    tally.set(answer, (tally.get(answer) ?? 0) + 1);
  }

  let best = answers[0];
  let bestCount = 0;
  for (const answer of answers) {
    const count = tally.get(answer) ?? 0;
    if (count > bestCount) {
      best = answer;
      bestCount = count;
    }
  }
  return best;
}

/**
 * The Artist Archetype.
 *
 * Why it earns its place: it is the only part of the site that tells an artist
 * something about *themselves*. That is what makes a result worth sharing —
 * people post identity, not advertising. The share text names the archetype and
 * not the product, because a card that reads like a campaign gets posted by
 * nobody.
 *
 * The questions describe situations rather than asking for self-assessment, and
 * every result names a weakness alongside a strength. A quiz that only flatters
 * is forgettable; recognition is what creates attachment.
 *
 * Accessibility: one question per screen as a real radio-style button group,
 * fully keyboard operable. Progress is announced through a labelled
 * `progressbar`, and the result is delivered in a live region so a screen
 * reader hears it rather than only seeing the transition.
 */
export function ArchetypeQuiz() {
  const [answers, setAnswers] = useState<ArchetypeId[]>([]);

  const step = answers.length;
  const finished = step >= questions.length;
  const result = finished ? archetypes[resolve(answers)] : null;

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition.slow}
        role="status"
        aria-live="polite"
        className="border-border bg-wall-charcoal/50 flex flex-col gap-6 rounded-xl border p-8 sm:p-12"
      >
        <p className="text-ember text-label tracking-[0.18em] uppercase">
          You are
        </p>
        <h2 className="font-heading text-h1 lg:text-display-s tracking-tight">
          {result.name}
        </h2>
        <p className="font-heading text-h4 text-balance">{result.line}</p>
        <p className="text-muted-foreground text-body-lg max-w-2xl">
          {result.body}
        </p>

        <p className="text-muted-foreground border-border text-small border-t pt-6">
          <span className="text-foreground">Kindred practices — </span>
          {result.kinship}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href={primaryCta.href}
            className="bg-ember text-wall-black hover:bg-ember-glow text-body inline-flex h-12 items-center gap-2 rounded-md px-6 font-medium transition-colors"
          >
            Take your place on the wall
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setAnswers([])}
            className="border-border text-muted-foreground hover:text-foreground hover:border-ink/30 text-body inline-flex h-12 items-center gap-2 rounded-md border px-5 transition-colors"
          >
            <RotateCcw className="size-4" aria-hidden />
            Start again
          </button>
        </div>
      </motion.div>
    );
  }

  const question = questions[step];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-label tracking-[0.18em] uppercase">
          Question {step + 1} of {questions.length}
        </p>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={step}
          aria-label="Quiz progress"
          className="bg-border h-px w-full overflow-hidden"
        >
          <motion.div
            className="bg-ember h-full"
            initial={false}
            animate={{ width: `${(step / questions.length) * 100}%` }}
            transition={transition.moderate}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={transition.base}
          className="flex flex-col gap-6"
        >
          <h2 className="font-heading text-h2 lg:text-h1 max-w-3xl tracking-tight text-balance">
            {question.prompt}
          </h2>

          <ul className="flex flex-col gap-3">
            {question.choices.map((choice) => (
              <li key={choice.text}>
                <button
                  type="button"
                  onClick={() =>
                    setAnswers((previous) => [...previous, choice.archetype])
                  }
                  className="border-border hover:border-ember/50 hover:bg-ember/5 text-body w-full rounded-lg border p-4 text-left transition-colors sm:p-5"
                >
                  {choice.text}
                </button>
              </li>
            ))}
          </ul>

          {step > 0 && (
            <button
              type="button"
              onClick={() => setAnswers((previous) => previous.slice(0, -1))}
              className="text-muted-foreground hover:text-foreground text-small self-start transition-colors"
            >
              &larr; Back
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
