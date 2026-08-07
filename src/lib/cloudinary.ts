import "server-only";

import { createHash } from "node:crypto";

export class CloudinaryNotConfiguredError extends Error {
  constructor() {
    super("Cloudinary environment variables are not set.");
    this.name = "CloudinaryNotConfiguredError";
  }
}

/**
 * Signed direct uploads, without the Cloudinary SDK.
 *
 * Why signed and not an unsigned preset: an unsigned preset is a public write
 * token. Anyone who views source can push arbitrary files into your account
 * until it is disabled. Signing costs one short server round-trip and means
 * only requests our server blessed will be accepted.
 *
 * Why direct-to-Cloudinary and not through our own route: a multi-megabyte
 * photo would otherwise occupy a serverless function for the whole upload,
 * burning execution time and hitting body-size limits. The browser talks to
 * Cloudinary; our server only ever handles a small JSON signature.
 *
 * No SDK dependency: the signature is a SHA-1 of sorted params plus the secret.
 * That is the entire algorithm, and `node:crypto` already ships it — pulling in
 * the SDK for this would be an unjustified dependency.
 */
export interface UploadSignature {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

function requireEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new CloudinaryNotConfiguredError();
  }
  return { cloudName, apiKey, apiSecret };
}

export function createUploadSignature(folder: string): UploadSignature {
  const { cloudName, apiKey, apiSecret } = requireEnv();
  const timestamp = Math.floor(Date.now() / 1000);

  // Cloudinary signs the alphabetically sorted, &-joined param string.
  // Every param sent with the upload must be included here or it is rejected.
  const params: Record<string, string> = {
    folder,
    timestamp: String(timestamp),
  };

  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  const signature = createHash("sha1")
    .update(`${toSign}${apiSecret}`)
    .digest("hex");

  return { signature, timestamp, apiKey, cloudName, folder };
}

/**
 * Remove an asset. Used when a tile is taken down, so hidden images do not sit
 * in the account indefinitely — and so a takedown request can be honoured
 * properly rather than merely hidden from the UI.
 */
export async function destroyAsset(publicId: string): Promise<void> {
  const { cloudName, apiKey, apiSecret } = requireEnv();
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = createHash("sha1")
    .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    { method: "POST", body, signal: AbortSignal.timeout(10_000) }
  );

  if (!response.ok) {
    throw new Error(`Cloudinary destroy failed: ${response.status}`);
  }
}
