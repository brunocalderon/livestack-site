import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const makeImageSchema = <T extends z.ZodTypeAny>(url: T) =>
  z.object({
    url,
    alt: z.string(),
  });

const customers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/customers" }),
  schema: ({ image }) =>
    z.object({
      customer: z.string(),
      ctaTitle: z.string().optional(),
      testimonial: z.string().optional(),
      partnership: z.string().optional(),
      challengesAndSolutions: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
        })
      ),
      results: z.array(z.string()),
      about: z.string(),
      details: z.record(z.string(), z.string()),
      logo: makeImageSchema(image()),
    }),
});

const integrations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/integrations" }),
  schema: ({ image }) =>
    z.object({
      email: z.string(),
      integration: z.string(),
      description: z.string(),
      permissions: z.array(z.string()),
      details: z.array(
        z.object({
          title: z.string(),
          value: z.string(),
          url: z.string().optional(),
        })
      ),
      logo: makeImageSchema(image()),
      tags: z.array(z.string()),
    }),
});

const helpcenter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/helpcenter" }),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    category: z.string(),
    order: z.number().default(0),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/changelog" }),
  schema: z.object({
    page: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

const infopages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/infopages" }),
  schema: z.object({
    page: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string().optional(),
      role: z.string().optional(),
      image: makeImageSchema(image()),
      socials: z
        .object({
          twitter: z.string().optional(),
          website: z.string().optional(),
          linkedin: z.string().optional(),
          email: z.string().optional(),
        })
        .optional(),
    }),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      team: z.string(),
      image: makeImageSchema(image()),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  team,
  customers,
  changelog,
  infopages,
  helpcenter,
  posts: postsCollection,
  integrations,
};
