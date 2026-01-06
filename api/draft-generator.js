import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrsa',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-01',
});

function makeBaseId(article) {
  const raw = (article?.url || article?.title || '').toString().toLowerCase();
  const cleaned = raw
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

  return cleaned || `auto-${Date.now()}`;
}

export default async function handler(req, res) {
  const { secret } = req.query;

  // Verificar se o secret está correto
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Buscar notícias da NewsAPI
    const newsApiKey = process.env.NEWS_API_KEY;
    if (!newsApiKey) {
      return res.status(500).json({ error: 'NEWS_API_KEY não configurada' });
    }

    const response = await fetch(
      'https://newsapi.org/v2/everything?q=geopolitica+brasil&sortBy=publishedAt&language=pt&pageSize=5',
      { headers: { 'X-Api-Key': newsApiKey } } // header suportado pela NewsAPI [web:141]
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar notícias' });
    }

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      return res.status(200).json({ message: 'Nenhuma notícia encontrada' });
    }

    // Criar rascunhos no Sanity (drafts.)
    const createdDocs = [];

    for (const article of articles) {
      if (!article?.title) continue;

      const baseId = makeBaseId(article);
      const draftId = `drafts.news-${baseId}`;

      const doc = {
        _id: draftId,
        _type: 'news',
        title: article.title,
        excerpt: article.description || article.content || 'Notícia interessante',
        content:
          `Fonte: ${article.url || ''}\n\n` +
          (article.content || article.description || ''),
        category: 'Brasil',
        author: article.author || 'Agência de Notícias',
        source: article.source?.name || 'Fonte externa',
        imageUrl: article.urlToImage || '',
        publishedAt: article.publishedAt,
      };

      try {
        const createdDoc = await client.createIfNotExists(doc);
        createdDocs.push(createdDoc);
      } catch (err) {
        console.error('Erro ao criar documento:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: `${createdDocs.length} rascunho(s) criado(s)`,
      articles: createdDocs,
    });
  } catch (error) {
    console.error('Erro no draft generator:', error);
    return res.status(500).json({ error: error.message });
  }
}
