import { auth } from "../../../lib/lucia";
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
	const body = await request.json();
	const authtoken = request.headers.get("Authorization");
	const userid = body.user.id;

	try {
		await auth.validateSession(authtoken!);
	} catch (err) {
		return new Response(
			JSON.stringify({
				message: "Invalid token",
			}),
			{ status: 400 },
		);
	}

	if (!userid) {
		return new Response(
			JSON.stringify({
				message: "Missing required fields",
			}),
			{ status: 400 },
		);
	}
	// Do something with the data, then return a success response
	return new Response(
		JSON.stringify({
			message: "Success!",
		}),
		{ status: 200 },
	);
};
