import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '7d6vxzye',
  dataset: 'production',
  apiVersion: '2024-02-22',
  useCdn: false,
  token: 'skbSkKI6ltP13yAx7nHvHW0uQ60A5bUn3oWrhrUOzKpvoRMptnJRZf4x0yz0LzmGxV7x0YlLTKbdHkZCZmvd9ouJ4Pio10VjEeVwPcbjVU8ZXmKllNDqoTVWZjyEnbSr3Pmc7XcSrauclokkMOWQC0UjpQxxehw8VP9mfAw9Y9KVgTcPX1YY',
});

async function diagnostic() {
  console.log('--- All Categories (including drafts) ---');
  const categories = await client.fetch('*[_type == "projectCategory"]{_id, name, "slug": slug.current, order}');
  categories.forEach(c => console.log(`ID: ${c._id}, Name: ${c.name}, Slug: ${c.slug}, Order: ${c.order}`));

  console.log('\n--- Projects (including drafts) ---');
  const projects = await client.fetch('*[_type == "project"]{_id, title, "categoryRef": category._ref, "categorySlug": category->slug.current}');
  projects.forEach(p => {
    console.log(`Title: ${p.title}, ID: ${p._id}, CategoryRef: ${p.categoryRef}, CategorySlug: ${p.categorySlug}`);
  });
}

diagnostic().catch(console.error);
