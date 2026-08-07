import { z } from "zod";

/**
 * Practices an artist can identify with. A closed list rather than free text
 * so the founding roster stays groupable (by medium, by region) later without
 * a data-cleaning exercise.
 */
export const practices = [
  "Painting",
  "Sculpture",
  "Photography",
  "Textile",
  "Printmaking",
  "Digital",
  "Folk & traditional",
  "Something else",
] as const;

export const roles = ["artist", "collector"] as const;

/**
 * The single source of truth for waitlist input, shared by the client form and
 * the server action.
 *
 * It is defined once and validated *again* on the server — client validation is
 * a UX affordance, never a security control, since anyone can POST directly to
 * the action endpoint.
 */
export const waitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please tell us your name.")
    .max(80, "That name is longer than we can store."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "That email address is too long.")
    .pipe(z.email("That doesn't look like an email address.")),
  role: z.enum(roles),
  practice: z.enum(practices).optional(),
  city: z
    .string()
    .trim()
    .max(80, "That city name is too long.")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   * Named innocuously because scrapers skip fields called "honeypot".
   */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; founderNumber: number; name: string }
  | {
      status: "error";
      message: string;
      /** Field-level messages, keyed by field name. */
      fieldErrors?: Partial<Record<keyof WaitlistInput, string>>;
    };
