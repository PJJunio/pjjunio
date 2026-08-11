import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectSchema = z.object({
  title: z.string(),
  badge: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  status: z.enum(['private', 'public']),
  repoUrl: z.string().url().optional(),
  image: z.string(),
  detailImage: z.string().optional(),
  order: z.number(),
});

const projectsPt = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects/pt' }),
  schema: projectSchema,
});

const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects/en' }),
  schema: projectSchema,
});

export const collections = {
  'projects-pt': projectsPt,
  'projects-en': projectsEn,
};
