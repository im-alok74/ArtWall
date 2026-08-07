"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageUp, X } from "lucide-react";

import { rooms } from "@/features/preview/rooms";
import { transition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

type Status =
  | { state: "empty" }
  | { state: "ready"; src: string; name: string }
  | { state: "error"; message: string };

/**
 * "See it on a wall" — an artist drops in their own work and watches it hang
 * in a gallery, a museum, a hotel, a café, a home.
 *
 * Why this earns its place: it is the one moment on the site that shows an
 * artist *their own work* treated seriously, rather than telling them we will
 * treat it seriously. That is the difference between a claim and a proof, and
 * it is the thing people screenshot.
 *
 * Privacy and security: the image never leaves the device. It is read into an
 * object URL and rendered locally — there is no upload, no server round-trip,
 * and nothing to breach. That is both the safest design and the fastest one,
 * and it is worth saying out loud in the UI so artists trust it with unreleased
 * work. Type and size are validated before the file is ever read, since a
 * `<input accept>` attribute is a hint to the file picker, not a guarantee.
 *
 * Performance: object URLs are revoked on replace and on unmount, so a visitor
 * cycling through ten paintings does not leak ten decoded bitmaps.
 */
export function ArtworkPreview() {
  const [status, setStatus] = useState<Status>({ state: "empty" });
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string | null>(null);

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0];

  const release = useCallback(() => {
    if (objectUrl.current) {
      URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
    }
  }, []);

  useEffect(() => release, [release]);

  const accept = useCallback(
    (file: File | undefined) => {
      if (!file) return;

      if (!ACCEPTED.includes(file.type)) {
        setStatus({
          state: "error",
          message:
            "That file type isn't supported. Use JPG, PNG, WebP or AVIF.",
        });
        return;
      }

      if (file.size > MAX_BYTES) {
        setStatus({
          state: "error",
          message: "That image is over 12 MB. Try a smaller export.",
        });
        return;
      }

      release();
      const url = URL.createObjectURL(file);
      objectUrl.current = url;
      setStatus({ state: "ready", src: url, name: file.name });
    },
    [release]
  );

  function reset() {
    release();
    setStatus({ state: "empty" });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-6">
      {/* The room */}
      <div
        className="border-border relative aspect-[16/10] w-full overflow-hidden rounded-xl border"
        style={{ background: room.wall }}
      >
        {/* Floor band */}
        <div
          className="absolute inset-x-0 bottom-0 h-[22%]"
          style={{ background: room.floor }}
        />
        {/* Ambient light */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: room.light }}
        />

        {/* The artwork, hung */}
        <div className="absolute inset-0 flex items-center justify-center pb-[10%]">
          <AnimatePresence mode="wait">
            {status.state === "ready" ? (
              <motion.figure
                key={status.src + room.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={transition.moderate}
                className={cn(
                  "relative max-h-[62%] max-w-[52%]",
                  room.frame === "thin-dark" && "bg-[#15161a] p-[1.5%]",
                  room.frame === "wide-light" && "bg-[#E8E1D2] p-[3%]"
                )}
                style={{
                  boxShadow:
                    "0 18px 40px rgb(0 0 0 / 0.4), 0 2px 6px rgb(0 0 0 / 0.3)",
                }}
              >
                {/* Intentionally a plain <img>: the source is a local blob URL,
                    so next/image's optimiser has nothing to optimise and would
                    only add work. Dimensions are unknown until decode, hence
                    max-height/width rather than fixed sizing. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={status.src}
                  alt={`Your artwork previewed in a ${room.label.toLowerCase()} setting`}
                  className="block max-h-full max-w-full object-contain"
                />
              </motion.figure>
            ) : (
              <motion.div
                key="empty-frame"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[52%] w-[42%] items-center justify-center rounded-sm border-2 border-dashed border-black/25"
              >
                <span className="text-small px-4 text-center text-black/45">
                  Your work goes here
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Room switcher */}
      <div
        role="tablist"
        aria-label="Preview setting"
        className="flex flex-wrap gap-2"
      >
        {rooms.map((r) => {
          const selected = r.id === roomId;
          return (
            <button
              key={r.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setRoomId(r.id)}
              className={cn(
                "text-small h-9 rounded-md border px-3.5 transition-colors",
                selected
                  ? "border-ember bg-ember text-wall-black font-medium"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-ink/25"
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <p className="text-muted-foreground text-small">{room.caption}</p>

      {/* Upload control */}
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          accept(event.dataTransfer.files[0]);
        }}
        className={cn(
          "border-border flex flex-col items-start gap-3 rounded-xl border border-dashed p-5 transition-colors sm:flex-row sm:items-center sm:justify-between",
          dragging && "border-ember bg-ember/5"
        )}
      >
        <div>
          <p className="text-body font-medium">Try it with your own work</p>
          <p className="text-muted-foreground text-small mt-0.5">
            Your image stays on your device — nothing is uploaded.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {status.state === "ready" && (
            <button
              type="button"
              onClick={reset}
              className="text-muted-foreground hover:text-foreground text-small inline-flex h-10 items-center gap-1.5 rounded-md px-3 transition-colors"
            >
              <X className="size-4" aria-hidden />
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-ember text-wall-black hover:bg-ember-glow text-small inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-4 font-medium transition-colors"
          >
            <ImageUp className="size-4" aria-hidden />
            {status.state === "ready" ? "Change image" : "Choose an image"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="sr-only"
            onChange={(event) => accept(event.target.files?.[0])}
          />
        </div>
      </div>

      {/* Errors are announced, not just coloured. */}
      <p role="status" aria-live="polite" className="text-small min-h-5">
        {status.state === "error" && (
          <span className="text-destructive">{status.message}</span>
        )}
        {status.state === "ready" && (
          <span className="text-muted-foreground">
            Showing <span className="text-foreground">{status.name}</span> — try
            another room.
          </span>
        )}
      </p>
    </div>
  );
}
