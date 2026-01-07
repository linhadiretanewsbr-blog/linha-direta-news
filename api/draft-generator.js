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
    .slice(0, 80);

  const suffix = (article?.publishedAt || '')
    .toString()
    .replace(/[^0-9]/g, '')
    .slice(0, 12);

  const base = cleaned || `auto-${Date.now()}`;
  return suffix ? `${base}-${suffix}` : base;
}

// _key precisa ser único dentro do array
function key() {
  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;
}

function toPortableText(text) {
  const contentText = String(text || '').trim();

  return [
    {
      _key: key(),
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{ _key: key(), _type: 'span', text: contentText, marks: [] }],
    },
  ];
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed (use GET)' });
  }

  const { secret } = req.query;

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
    // Parâmetros ajustáveis via URL
    const q =
      req.query.q ||
      'geopolítica OR soberania OR "soberania nacional" OR "segurança nacional" OR China OR EUA OR Rússia';
    const lang = req.query.lang || 'pt';
    const country = req.query.country || 'br';

    const maxRaw = req.query.max ?? '5';
    const max = Math.max(1, Math.min(10, parseInt(String(maxRaw), 10) || 5));

    const author = req.query.author || 'Redação LDN';
    const category = req.query.category || 'Geopolítica';

    // Endpoint de search do GNews com q/lang/country/max/apikey [web:1]
    const url = new URL('https://gnews.io/api/v4/search');
    url.search = new URLSearchParams({
      q: String(q),
      lang: String(lang),
      country: String(country),
      max: String(max),
      apikey: String(gnewsKey),
    }).toString();

    const response = await fetch(url.toString());
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Erro ao buscar notícias no GNews', details: text });
    }

    const data = await response.json();
    const articles = data.articles || [];

    if (!articles.length) {
      return res.status(200).json({ message: 'Nenhuma notícia encontrada' });
    }

    const createdDocs = [];

    for (const article of articles) {
      if (!article?.title || !article?.url) continue;

      const title = String(article.title).trim();
      if (!title) continue;

      const excerpt = String(article.description || '').trim();
      const sourceUrl = String(article.url).trim();
      const sourceName = String(article.source?.name || '').trim() || undefined;
      const publishedAt = String(article.publishedAt || new Date().toISOString());

      // ID de draft (prefixo drafts.)
      // Obs: criar drafts com prefixo drafts. é o padrão do Sanity. [web:226][web:9]
      const baseId = makeBaseId({ url: sourceUrl, title, publishedAt });
      const draftId = `drafts.news-${baseId}`;

      // Corpo inicial (editável no Studio)
      const bodyText =
        (excerpt ? `${excerpt}\n\n` : '') +
        `Fonte: ${sourceUrl}\n` +
        (sourceName ? `Veículo: ${sourceName}\n` : '') +
        `Publicado em: ${publishedAt}`;

      const doc = {
        _id: draftId,
        _type: 'news',

        title,
        slug: { _type: 'slug', current: makeBaseId({ title }) },

        excerpt: excerpt || undefined,
        author,
        category,

        sourceUrl,
        sourceName,
        publishedAt,

        // Portable Text com _key para evitar "Missing keys"
        body: toPortableText(bodyText),
      };

      const createdDoc = await client.createIfNotExists(doc);
      createdDocs.push({ _id: createdDoc._id, title, url: sourceUrl });
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
