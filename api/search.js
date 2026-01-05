import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrsa',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
});

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  const query = `*[_type == "news" && (title match "*${q}*" || excerpt match "*${q}*")] | order(_createdAt desc) { _id, title, excerpt, _createdAt, category }`;
  
  try {
    const results = await client.fetch(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
