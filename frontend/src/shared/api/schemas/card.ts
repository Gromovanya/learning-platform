import { z } from "zod";

export const CardSchema = z.object({
    id: z.number().int(),
    session_id: z.number().int(),
    title: z.string(),
    description: z.string().nullable(),
    created_at: z.string(),
    is_opened: z.boolean().default(false),
    answer: z.string()
});

export const CardListSchema = z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(CardSchema),
});

export type Card = z.infer<typeof CardSchema>
export type CardList = z.infer<typeof CardListSchema>