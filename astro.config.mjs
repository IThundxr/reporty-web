import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
	output: "server",
	adapter: vercel(),
	integrations: [tailwind(), sitemap(), robotsTxt()],
});
