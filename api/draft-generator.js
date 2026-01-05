import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'hun2hrso',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-03-01',
});

export default async function handler(req, res) {
  const { secret } = req.query;

  // Verificar se o secret está correto
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Buscar notícias da NewsAPI
    const newsApiKey = process.env.NEWS_API_KEY;
    if (!newsApiKey) {
      return res.status(500).json({ error: 'NEWS_API_KEY não configurada' });
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=geopolitica+brasil&sortBy=publishedAt&language=pt&pageSize=5`,
      {
        headers: { 'X-API-Key': newsApiKey },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar notícias' });
    }

    const data = await response.json();
    const articles = data.articles || [];

    if (articles.length === 0) {
      return res.status(200).json({ message: 'Nenhuma notícia encontrada' });
    }

    // Criar rascunhos no Sanity
    const createdDocs = [];
    for (const article of articles) {
      const doc = {
        _type: 'news',
        title: article.title,
        excerpt: article.description || article.content || 'Noticia interessante',
        content: article.content || article.description || '',
        category: 'Brasil',
        publishedAt: article.publishedAt,
        author: article.author || 'Agencia de Noticias',
        source: article.source?.name || 'Fonte externa',
        _rev: undefined,
      };

      try {
        const createdDoc = await client.create(doc);
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
