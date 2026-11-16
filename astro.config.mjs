import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";

// Astro config runs before Vite loads `.env`; mirror values into `process.env` for `env.schema`.
const viteEnv = {
  ...loadEnv("development", process.cwd(), ""),
  ...loadEnv("production", process.cwd(), ""),
};
for (const [key, value] of Object.entries(viteEnv)) {
  if (process.env[key] === undefined) process.env[key] = value;
}

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      FORMGONG_ACCESS_KEY: envField.string({
        context: "server",
        access: "public",
      }),
    },
    validateSecrets: true,
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["zod", "astro"],
    },
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "poimandres",
    },
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: "https://withlivestack.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/og-capture"),
    }),
    mdx(),
  ],
});
