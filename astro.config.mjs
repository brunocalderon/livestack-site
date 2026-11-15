import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
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
