"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

import { joinWaitlist } from "@/features/waitlist/actions";
import { FounderCertificate } from "@/features/waitlist/founder-certificate";
import {
  practices,
  type WaitlistInput,
  type WaitlistState,
} from "@/features/waitlist/schema";
import { cn } from "@/lib/utils";

const initialState: WaitlistState = { status: "idle" };

function fieldError(state: WaitlistState, field: keyof WaitlistInput) {
  return state.status === "error" ? state.fieldErrors?.[field] : undefined;
}

function SubmitButton() {
  // Reads the parent form's pending state — no extra state to keep in sync.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-ember text-wall-black hover:bg-ember-glow text-body inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 font-medium transition-colors disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Taking your place…
        </>
      ) : (
        <>
          Take my place
          <ArrowRight className="size-4" aria-hidden />
        </>
      )}
    </button>
  );
}

/**
 * Joining, as a ceremony rather than a form submission.
 *
 * The success state does not say "thanks, we'll be in touch" — it hands over a
 * number. Becoming Founding Artist #1 is a thing you *are*, where a confirmed
 * email address is a thing you gave away. That difference is the entire reason
 * this section exists.
 *
 * Architecture: `useActionState` posts to a Server Action, so the form works
 * before hydration — a real progressive-enhancement win on the mid-range
 * Android phones that make up most of this audience.
 *
 * Accessibility: every input has a real label; errors are tied to their field
 * with `aria-describedby` and `aria-invalid`; the result region is a polite
 * live region so success and failure are announced, not just recoloured.
 */
export function WaitlistForm() {
  const [state, formAction] = useActionState(joinWaitlist, initialState);

  if (state.status === "success") {
    return (
      <FounderCertificate name={state.name} number={state.founderNumber} />
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {/* Honeypot: off-screen, unfocusable, never announced. */}
      <div aria-hidden className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-label text-muted-foreground mb-1 tracking-wider uppercase">
          I am here as
        </legend>
        <div className="flex gap-3">
          {(
            [
              { value: "artist", label: "An artist" },
              { value: "collector", label: "A collector" },
            ] as const
          ).map((option, index) => (
            <label
              key={option.value}
              className="border-border has-checked:border-ember has-checked:bg-ember/10 text-small flex h-11 flex-1 cursor-pointer items-center justify-center rounded-md border transition-colors"
            >
              <input
                type="radio"
                name="role"
                value={option.value}
                defaultChecked={index === 0}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id="name"
        name="name"
        label="Your name"
        autoComplete="name"
        required
        error={fieldError(state, "name")}
      />

      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        error={fieldError(state, "email")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="practice"
            className="text-label text-muted-foreground tracking-wider uppercase"
          >
            What you make
          </label>
          <select
            id="practice"
            name="practice"
            defaultValue=""
            className="border-border bg-background text-body h-11 rounded-md border px-3"
          >
            <option value="">Prefer not to say</option>
            {practices.map((practice) => (
              <option key={practice} value={practice}>
                {practice}
              </option>
            ))}
          </select>
        </div>

        <Field
          id="city"
          name="city"
          label="City"
          autoComplete="address-level2"
          error={fieldError(state, "city")}
        />
      </div>

      <SubmitButton />

      <div aria-live="polite" role="status" className="min-h-5">
        <AnimatePresence>
          {state.status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-destructive text-small"
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="text-muted-foreground text-caption">
        We use your details to hold your place and tell you when we open.
        Nothing else, and never sold.
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  error,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-label text-muted-foreground tracking-wider uppercase"
      >
        {label}
        {required && <span className="text-ember ml-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "border-border bg-background text-body h-11 rounded-md border px-3",
          error && "border-destructive"
        )}
      />
      {error && (
        <p id={errorId} className="text-destructive text-small">
          {error}
        </p>
      )}
    </div>
  );
}
