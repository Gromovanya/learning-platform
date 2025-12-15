import type { TokenObtainPair } from "../api/generated";

export type LoginRequest =  Omit<TokenObtainPair, 'access' | 'refresh'>;