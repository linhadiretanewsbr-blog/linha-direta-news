import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrsa',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
});

export default async function handler(req, res) {
  const query = `*[_type == "news"] | order(_createdAt desc) { _id, _createdAt }`;
  const news = await client.fetch(query);
  
  const urls = [
    { loc: 'https://seu-site.vercel.app', lastmod: new Date().toISOString().split('T')[0] },
    ...news.map(item => ({
      loc: `https://seu-site.vercel.app/news/${item._id}`,
      lastmod: new Date(item._createdAt).toISOString().split('T')[0]
    }))
  ];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('')}
</urlset>`;
  
  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
}
