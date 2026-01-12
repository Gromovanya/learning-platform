import { z } from "zod";
import { AuthorSchema } from "./user";

export const SessionSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string().nullable().optional(),
    author: AuthorSchema,
    participants_count: z.number().int().default(0),
    is_private: z.boolean().default(false).optional(),
    created_at: z.string(),
    is_member: z.boolean()
});

export const SessionShortSchema = SessionSchema.omit({
    id: true, 
    author: true, 
    created_at: true,
    participants_count: true,
    is_member: true
})

export const SessionsListSchema = z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(SessionSchema),
});

export type Session = z.infer<typeof SessionSchema>
export type SessionsList = z.infer<typeof SessionsListSchema>
export type SessionShort = z.infer<typeof SessionShortSchema>