import { z } from "zod";

export const CreateProfileSchema = z.object({
  title: z.string().min(2, "Headline / Title must be at least 2 characters"),
  bio: z.string().max(1000).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).default([]),
});

export type CreateProfileInput = z.infer<typeof CreateProfileSchema>;

export const UpdateProfileSchema = CreateProfileSchema.partial();

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const ProfileResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
  linkedinUrl: z.string().nullable().optional(),
  skills: z.array(z.string()),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
