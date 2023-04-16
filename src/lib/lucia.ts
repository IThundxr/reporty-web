// src/lib/lucia.ts
import lucia from "lucia-auth";
import { astro } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

import { discord } from "@lucia-auth/oauth/providers";

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			admin: userData.admin
		};
	},
	middleware: astro()
});

export const discordAuth = discord(auth, {
	clientId: import.meta.env.DISCORD_CLIENT_ID,
	clientSecret: import.meta.env.DISCORD_CLIENT_SECRET,
	scope: ["identify"],
    redirectUri: import.meta.env.DISCORD_REDIRECT_URI,
});

export type Auth = typeof auth;
