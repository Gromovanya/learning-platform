import { z } from "zod";

export const UserSchema = z.object({
    id: z.number().int(),
    username: z.string(),
    
    nickname: z.string().nullable().optional(), 
    avatar: z.string().nullable().optional(),
    
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    settings: z.record(z.string(), z.any().default({}))
});

export const AuthorSchema = UserSchema.omit({
    first_name: true,
    last_name: true,
    settings: true
});

export const LoginRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type User = z.infer<typeof UserSchema>
export type Author = z.infer<typeof AuthorSchema>
export type LoginRequest = z.infer<typeof LoginRequestSchema>