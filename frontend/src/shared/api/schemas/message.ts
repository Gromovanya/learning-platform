import { z } from "zod";
import { UserSchema } from "./user";

export const MessageCardSchema = z.object({
    id: z.number().int(),
    card_id: z.number().int(),
    text: z.string(),
    author: UserSchema,
    created_at: z.coerce.date()
});

export const MessagesCardListSchema = z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(MessageCardSchema),
});

export type MessageCard = z.infer<typeof MessageCardSchema>
export type MessagesCardList = z.infer<typeof MessagesCardListSchema>