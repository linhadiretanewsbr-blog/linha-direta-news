import React, { useState } from 'react';

const App = () => {
  const [articles] = useState([
    {
      id: 1,
      title: 'Trump vs Maduro: Tensões Geopoliticamente',
      date: '2025-01-15',
      category: 'Política',
      image: 'https://via.placeholder.com/400x250',
      content: 'Conflito entre Estados Unidos e Venezuela continua escalando com novas sanções...',
      author: 'João Silva'
    },
    {
      id: 2,
      title: 'Zelensky e Putin: Guerra na Ucrânia Persiste',
      date: '2025-01-14',
      category: 'Internacional',
      image: 'https://via.placeholder.com/400x250',
      content: 'Conflito entre Ucrânia e Rússia mostra novos desdobramentos milita...',
      author: 'Maria Santos'
    },
    {
      id: 3,
      title: 'Lula vs Bolsonaro: Política Brasileira em Foco',
      date: '2025-01-13',
      category: 'Brasil',
      image: 'https://via.placeholder.com/400x250',
      content: 'Debate político intenso no Brasil com novo julgamento do STF...',
      author: 'Carlos Costa'
    }
  ]);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{
        backgroundColor: '#1a1a1a',
        color: '#d4af37',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>📰 Linha Direta News</h1>
        <p>Notícias em Tempo Real</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {articles.map(article => (
            <article key={article.id} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <img 
                src={article.image} 
                alt={article.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <span style={{
                  backgroundColor: '#d4af37',
                  color: '#1a1a1a',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '0.8em',
                  fontWeight: 'bold'
                }}>
                  {article.category}
                </span>
                <h2 style={{ marginTop: '10px', color: '#1a1a1a' }}>{article.title}</h2>
                <p style={{ color: '#666', fontSize: '0.9em', margin: '10px 0' }}>{article.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#999', fontSize: '0.8em' }}>
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer style={{
        backgroundColor: '#1a1a1a',
        color: '#d4af37',
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px'
      }}>
        <p>&copy; 2025 Linha Direta News. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
