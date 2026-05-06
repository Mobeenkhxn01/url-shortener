import { z } from "zod";

export const shortenSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must start with http:// or https://"
    ),
  customSlug: z
    .string()
    .min(3, "Custom slug must be at least 3 characters")
    .max(20, "Custom slug must be at most 20 characters")
    .regex(/^[a-zA-Z0-9-_]+$/, "Only letters, numbers, hyphens and underscores allowed")
    .optional()
    .or(z.literal("")),
  expiresIn: z
    .enum(["never", "1h", "24h", "7d", "30d"])
    .default("never"),
});

export type ShortenInput = z.infer<typeof shortenSchema>;
