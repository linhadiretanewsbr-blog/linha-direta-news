import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrsa',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
});

export default async function handler(req, res) {
  const query = `*[_type == "news"] | order(_createdAt desc) { title, excerpt, _createdAt, _id }`;
  
  const news = await client.fetch(query);
  
  const xml = `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>Linha Direta News</title>
    <link>https://seu-site.vercel.app</link>
    <description>Notícias sobre política e geopolítica.</description>
    ${news.map(item => `
    <item>
      <title>${item.title}</title>
      <description>${item.excerpt}</description>
      <link>https://seu-site.vercel.app/news/${item._id}</link>
      <pubDate>${new Date(item._createdAt).toUTCString()}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;
  
  res.setHeader('Content-Type', 'text/xml');
  res.send(xml);
}
