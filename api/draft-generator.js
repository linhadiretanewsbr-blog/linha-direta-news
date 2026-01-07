import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrsa',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2026-01-07',
});

function makeBaseId(article) {
  const raw = (article?.url || article?.title || '').toString().toLowerCase();
  const cleaned = raw
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

  return cleaned || `auto-${Date.now()}`;
}

export default async function handler(req, res) {
  const { secret } = req.query;

  // Proteção do endpoint (mantém)
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const gnewsKey = process.env.GNEWS_API_KEY;
  if (!gnewsKey) {
    return res.status(500).json({ error: 'GNEWS_API_KEY não configurada' });
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return res.status(500).json({ error: 'SANITY_API_WRITE_TOKEN não configurada' });
  }

  try {
    // Parâmetros (opcional, dá pra ajustar pela URL)
    const q =
      req.query.q ||
      'geopolítica OR soberania OR "soberania nacional" OR "segurança nacional" OR China OR EUA OR Rússia';
    const lang = req.query.lang || 'pt';
    const country = req.query.country || 'br';
    const max = req.query.max || '5';

    const author = req.query.author || 'Redação LDN';
    const category = req.query.category || 'Geopolítica';

    const gnewsUrl =
      `https://gnews.io/api/v4/search?` +
      `q=${encodeURIComponent(q)}` +
      `&lang=${encodeURIComponent(lang)}` +
      `&country=${encodeURIComponent(country)}` +
      `&max=${encodeURIComponent(max)}` +
      `&token=${encodeURIComponent(gnewsKey)}`;

    const response = await fetch(gnewsUrl);

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Erro ao buscar notícias no GNews', details: text });
    }

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      return res.status(200).json({ message: 'Nenhuma notícia encontrada' });
    }

    const createdDocs = [];

    for (const article of articles) {
      if (!article?.title || !article?.url) continue;

      const baseId = makeBaseId(article);
      const draftId = `drafts.news-${baseId}`;

      const description = (article.description || '').trim();
      const sourceName = article.source?.name ? `Veículo: ${article.source.name}\n` : '';
      const publishedAt = article.publishedAt ? `Publicado em: ${article.publishedAt}\n` : '';

      const content =
        `${description || article.title}\n\n` +
        `Fonte: ${article.url}\n` +
        publishedAt +
        sourceName;

      // Seu schema real (pelo Vision) tem author/category/content
      const doc = {
        _id: draftId,
        _type: 'news',
        author,
        category,
        content,
      };

      const createdDoc = await client.createIfNotExists(doc);
      createdDocs.push({ _id: createdDoc._id, title: article.title, url: article.url });
    }

    return res.status(200).json({
      success: true,
      message: `${createdDocs.length} rascunho(s) criado(s)`,
      drafts: createdDocs,
    });
  } catch (error) {
    return res.status(500).json({ error: String(error?.message || error) });
  }
}
