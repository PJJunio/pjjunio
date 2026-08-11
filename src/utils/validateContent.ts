import { getCollection } from 'astro:content';

/** Fails the build if a project exists in one locale but not the other. */
export async function validateProjectTranslations() {
  const pt = await getCollection('projects-pt');
  const en = await getCollection('projects-en');

  const ptSlugs = new Set(pt.map((p) => p.id));
  const enSlugs = new Set(en.map((p) => p.id));

  const missingInEn = [...ptSlugs].filter((slug) => !enSlugs.has(slug));
  const missingInPt = [...enSlugs].filter((slug) => !ptSlugs.has(slug));

  if (missingInEn.length || missingInPt.length) {
    const messages = [];
    if (missingInEn.length) messages.push(`missing EN translation for: ${missingInEn.join(', ')}`);
    if (missingInPt.length) messages.push(`missing PT translation for: ${missingInPt.join(', ')}`);
    throw new Error(`Project content translation mismatch — ${messages.join('; ')}`);
  }

  return { pt, en };
}
