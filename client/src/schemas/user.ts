import { PromptCardProps } from "@/components/prompt/PromptCard";

export interface User {
  userid : string
  username: string;
  email: string;
  role: string;
  posts: [any];
  reputation: number;
  premiumUntil: Date;
  createdAt: Date;
};

export const normalizeUser = (user: any): User => {
  return {
    ...user,
    premiumUntil: user.premiumUntil ? new Date(user.premiumUntil) : null,
    createdAt: user.createdAt ? new Date(user.createdAt) : null,
  };
};