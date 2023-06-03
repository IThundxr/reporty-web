import { auth, discordAuth } from "../../../lib/lucia";
import type { APIRoute } from "astro";

export const get: APIRoute = async (context) => {
	const authRequest = auth.handleRequest(context);
	const code = context.url.searchParams.get("code");
	const state = context.url.searchParams.get("state");
	const storedState = context.cookies.get("oauth_state").value;
	if (storedState !== state || !code || !state)
		throw new Response(null, { status: 401 });
	try {
		const { existingUser, providerUser, createUser } =
			await discordAuth.validateCallback(code);
		const user =
			existingUser ??
			(await createUser({
				username: providerUser.username,
				admin: false
			}));
		const session = await auth.createSession(user.userId);
		authRequest.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				location: "/"
			}
		});
	} catch (err) {
		console.error(err)
		return new Response(null, {
			status: 500
		});
	}
};
