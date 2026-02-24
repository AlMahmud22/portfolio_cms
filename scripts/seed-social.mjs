/**
 * seed-social.mjs
 * Creates/updates social link documents and wires them into
 * both `about-singleton` and `contact-singleton`.
 *
 * Usage: node scripts/seed-social.mjs
 */
import { createClient } from '@sanity/client';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load .env
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf-8');
const envVars = Object.fromEntries(
  envContent
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((l) => l.split('=').map((p) => p.trim()))
    .filter(([k]) => k)
    .map(([k, ...rest]) => [k, rest.join('=').replace(/^["']|["']$/g, '')])
);

const client = createClient({
  projectId: envVars.SANITY_PROJECT_ID || '7d6vxzye',
  dataset: envVars.SANITY_DATASET || 'production',
  token: envVars.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ─── Social link documents ───────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    _id: 'social-github',
    _type: 'socialLink',
    platform: 'GitHub',
    url: 'https://github.com/AlMahmud22',
    icon: 'Github',
    order: 1,
  },
  {
    _id: 'social-linkedin',
    _type: 'socialLink',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/almahmud22',
    icon: 'Linkedin',
    order: 2,
  },
  {
    _id: 'social-twitter',
    _type: 'socialLink',
    platform: 'Twitter',
    url: 'https://twitter.com/almahmud22',
    icon: 'Twitter',
    order: 3,
  },
  {
    _id: 'social-email',
    _type: 'socialLink',
    platform: 'Email',
    url: 'mailto:contact@almahmud.dev',
    icon: 'Mail',
    order: 4,
  },
];

// Sanity reference helper
const ref = (id) => ({ _type: 'reference', _ref: id, _key: id });

async function main() {
  console.log('\n🔗  Seeding social links...\n');

  // 1. Create / update social link documents
  for (const link of SOCIAL_LINKS) {
    await client.createOrReplace(link);
    console.log(`  ✅  ${link.platform} → ${link.url}`);
  }

  // 2. Check which singletons exist
  const [about, contact] = await Promise.all([
    client.fetch(`*[_id == "about-singleton"][0]{ _id }`),
    client.fetch(`*[_id == "contact-singleton"][0]{ _id }`),
  ]);

  // 3. Wire all 4 links into about-singleton
  if (about?._id) {
    await client
      .patch('about-singleton')
      .set({ socialLinks: SOCIAL_LINKS.map((l) => ref(l._id)) })
      .commit();
    console.log('\n  ✅  about-singleton → socialLinks wired (GitHub, LinkedIn, Twitter, Email)');
  } else {
    console.warn('\n  ⚠️  about-singleton not found — run fix-singletons.mjs first');
  }

  // 4. Wire github + linkedin + twitter into contact-singleton (email is shown separately)
  if (contact?._id) {
    const contactRefs = SOCIAL_LINKS.filter((l) => l._id !== 'social-email').map((l) => ref(l._id));
    await client
      .patch('contact-singleton')
      .set({ socialLinks: contactRefs })
      .commit();
    console.log('  ✅  contact-singleton → socialLinks wired (GitHub, LinkedIn, Twitter)');
  } else {
    console.warn('  ⚠️  contact-singleton not found — run fix-singletons.mjs first');
  }

  console.log('\n🎉  Done!\n');
}

main().catch((err) => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
