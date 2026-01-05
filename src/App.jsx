import React, { useState, useEffect } from 'react';
import { Menu, Search, X, ChevronRight, Clock, User, Share2, MessageCircle, TrendingUp, Home, Lock, Plus, Save, Trash2, LogOut } from 'lucide-react';

// --- CORES & CONFIG ---
// Verde Primário: #1B5E20 (Tailwind: green-900)
// Dourado: #FFD700 (Tailwind: yellow-400/500)

// --- DADOS INICIAIS (Seed Data) ---
const INITIAL_NEWS = [
  {
    id: 1,
    title: "Brasil assume liderança em acordo comercial no G20",
    excerpt: "Itamaraty destaca a importância estratégica das novas parcerias com o Sul Global para a economia nacional.",
    content: `Em uma movimentação estratégica considerada histórica por analistas de geopolítica, o Brasil consolidou hoje sua posição de liderança nas negociações do G20. O acordo, focado em sustentabilidade e transferência de tecnologia, promete injetar bilhões na economia nos próximos cinco anos.

    O chanceler brasileiro afirmou que "o mundo multipolar exige novas posturas e o Brasil está pronto para ser a ponte entre os mercados emergentes". A repercussão internacional foi imediata, com manchetes nos principais jornais europeus e asiáticos.

    Nos bastidores, a articulação envolveu meses de diplomacia silenciosa, focada em garantir que o agronegócio e a indústria nacional fossem beneficiados sem comprometer as metas climáticas.`,
    category: "Geopolítica",
    author: "Editoria Internacional",
    date: "4 Jan 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000",
    tags: ["G20", "Diplomacia", "Economia"]
  },
  {
    id: 2,
    title: "Reforma Tributária: O impacto direto no setor de serviços",
    excerpt: "Especialistas analisam as novas alíquotas e como elas afetam o pequeno e médio empresário brasileiro.",
    content: `Com a aprovação do texto base, o foco agora se volta para as leis complementares. O setor de serviços, que emprega a maior parte da força de trabalho no país, observa com cautela as mudanças no IVA.`,
    category: "Economia",
    author: "Carla Mendes",
    date: "3 Jan 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1554224155-984063584d85?auto=format&fit=crop&q=80&w=1000",
    tags: ["Impostos", "Brasil", "Serviços"]
  },
  {
    id: 3,
    title: "Eleições no Congresso: A disputa silenciosa pelo comando das casas",
    excerpt: "Nos bastidores de Brasília, partidos já articulam blocos para garantir a presidência da Câmara e do Senado.",
    content: `A temperatura em Brasília está subindo meses antes da votação oficial. O Centrão busca manter sua hegemonia, enquanto a oposição tenta criar uma frente ampla para desestabilizar as alianças governistas.`,
    category: "Política",
    author: "Ricardo Souza",
    date: "2 Jan 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1541872703-74c59636a226?auto=format&fit=crop&q=80&w=1000",
    tags: ["Brasília", "Congresso", "Poder"]
  },
];

const CATEGORIES = ["Todas", "Política", "Geopolítica", "Economia", "Brasil", "Mundo"];

// --- CONFIGURAÇÃO DA LOGO ---
// SUBSTITUA A URL ABAIXO pelo link da imagem que você enviou/hospedou.
// Dica: Para testar, você pode subir a imagem no imgur.com e colar o link direto aqui.
const LOGO_URL = "https://placehold.co/200x200/1B5E20/FFD700?text=LDN"; 

// --- COMPONENTS ---

const Logo = ({ onClick }) => (
  <div className="flex items-center cursor-pointer group" onClick={onClick}>
    {/* Logo Imagem - Redonda com borda dourada */}
    <img 
      src={LOGO_URL} 
      alt="Logo LDN" 
      className="w-12 h-12 rounded-full border-2 border-[#FFD700] shadow-md group-hover:shadow-lg transition-all object-cover"
    />
    <div className="ml-3 flex flex-col">
      <h1 className="text-2xl font-bold text-[#1B5E20] leading-none tracking-tight">
        LINHA DIRETA
      </h1>
      <span className="text-xs font-semibold text-[#FFD700] bg-[#1B5E20] px-1 py-0.5 w-fit mt-1 rounded tracking-widest uppercase">
        NEWS
      </span>
    </div>
  </div>
);

const Header = ({ activeCategory, setActiveCategory, isMenuOpen, setIsMenuOpen, goHome, view }) => (
  <header className="sticky top-0 z-50 bg-white border-b-4 border-[#1B5E20] shadow-md">
    {/* Top Bar with Date/Info */}
    <div className="bg-[#1B5E20] text-white py-1 px-4 text-xs font-medium flex justify-between items-center">
      <span>Linha Direta News Brasil - Análise Política e Geopolítica</span>
      <span>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Logo onClick={goHome} />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {view === 'admin' ? (
             <span className="text-red-600 font-bold flex items-center"><Lock className="w-4 h-4 mr-1"/> MODO ADMINISTRADOR</span>
          ) : (
            CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); goHome(); }}
                className={`px-3 py-2 text-sm font-bold uppercase tracking-wide transition-all border-b-2 ${
                  activeCategory === cat 
                    ? "text-[#1B5E20] border-[#FFD700]" 
                    : "text-gray-600 border-transparent hover:text-[#1B5E20] hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#1B5E20] w-32 transition-all focus:w-48 bg-gray-50"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1B5E20] hover:text-green-800 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isMenuOpen && (
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setIsMenuOpen(false);
                goHome();
              }}
              className={`block w-full text-left px-3 py-2 text-base font-bold uppercase ${
                activeCategory === cat
                  ? "bg-green-50 text-[#1B5E20] border-l-4 border-[#FFD700]"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    )}
  </header>
);

const Hero = ({ article, onClick }) => (
  <div 
    className="relative h-[450px] w-full bg-black overflow-hidden cursor-pointer group mb-12 shadow-xl border-b-4 border-[#FFD700]"
    onClick={() => onClick(article)}
  >
    <img 
      src={article.image} 
      alt={article.title} 
      className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
      <span className="inline-block px-3 py-1 bg-[#FFD700] text-[#1B5E20] text-xs font-black uppercase tracking-wider mb-3 w-fit">
        {article.category}
      </span>
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight max-w-4xl drop-shadow-md">
        {article.title}
      </h2>
      <p className="text-gray-200 text-lg line-clamp-2 max-w-2xl mb-4 hidden sm:block font-light">
        {article.excerpt}
      </p>
      <div className="flex items-center text-[#FFD700] text-sm space-x-4 font-medium">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {article.author}
        </div>
        <div className="flex items-center border-l border-gray-600 pl-4">
          <Clock className="w-4 h-4 mr-1" />
          {article.date}
        </div>
      </div>
    </div>
  </div>
);

const ArticleCard = ({ article, onClick }) => (
  <div 
    className="flex flex-col bg-white border-l-4 border-[#1B5E20] shadow-sm hover:shadow-lg transition-all cursor-pointer group h-full"
    onClick={() => onClick(article)}
  >
    <div className="relative h-48 overflow-hidden bg-gray-200">
      <img 
        src={article.image} 
        alt={article.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD700]"></div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
         <span className="text-xs font-bold text-[#1B5E20] uppercase tracking-wider">
          {article.category}
        </span>
      </div>
     
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-[#1B5E20] transition-colors leading-tight">
        {article.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow font-serif">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
        <span>{article.date}</span>
        <span className="flex items-center text-[#1B5E20] font-bold uppercase text-[10px]">
          Ler Completo <ChevronRight className="w-3 h-3 ml-1" />
        </span>
      </div>
    </div>
  </div>
);

const ArticleDetail = ({ article, onBack }) => (
  <div className="animate-fade-in max-w-4xl mx-auto pt-4 pb-12">
    <button 
      onClick={onBack}
      className="flex items-center text-gray-500 hover:text-[#1B5E20] mb-6 transition-colors font-bold text-sm uppercase tracking-wide"
    >
      <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
      Voltar
    </button>

    <article className="bg-white shadow-lg border-t-8 border-[#1B5E20]">
      <div className="p-8 sm:p-12">
         <div className="flex items-center space-x-2 mb-6">
            <span className="bg-[#1B5E20] text-white px-3 py-1 text-xs font-bold uppercase">{article.category}</span>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-500 text-sm font-medium">{article.date}</span>
         </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>
        
        <p className="text-xl text-gray-600 font-serif leading-relaxed mb-8 border-l-4 border-[#FFD700] pl-4 italic">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-full flex items-center justify-center text-[#FFD700] font-bold mr-3">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Por {article.author}</p>
              <p className="text-xs text-gray-500">Jornalismo LDN</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 hover:bg-[#1B5E20] hover:text-white rounded transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif">
          {article.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          ))}
        </div>

        {/* Banner Publi Simulation */}
        <div className="my-10 bg-gray-50 border border-gray-200 p-8 text-center rounded">
          <p className="text-xs text-gray-400 uppercase mb-2">Publicidade</p>
          <p className="font-bold text-[#1B5E20]">Assine a Newsletter do LDN e receba análises exclusivas.</p>
        </div>
      </div>
    </article>
  </div>
);

// --- ADMIN PANEL COMPONENTS ---

const LoginScreen = ({ onLogin }) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    if (pass === "admin") { // Senha simples para demo
      onLogin();
    } else {
      setError("Senha incorreta. Tente 'admin'.");
    }
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md border-t-4 border-[#1B5E20]">
        <h2 className="text-2xl font-bold text-[#1B5E20] mb-6 flex items-center">
          <Lock className="w-6 h-6 mr-2" /> Área Restrita
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-[#1B5E20]"
              placeholder="Digite a senha..."
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-[#1B5E20] text-white py-2 rounded font-bold hover:bg-green-800 transition-colors">
            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminPanel = ({ news, setNews, onLogout }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Política",
    author: "Redação LDN",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"
  });

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja deletar esta notícia?")) {
      const updatedNews = news.filter(n => n.id !== id);
      setNews(updatedNews);
      localStorage.setItem('ldn-news', JSON.stringify(updatedNews));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime: Math.ceil(formData.content.length / 500) + " min",
      tags: [formData.category]
    };

    const updatedNews = [newArticle, ...news];
    setNews(updatedNews);
    localStorage.setItem('ldn-news', JSON.stringify(updatedNews));
    
    // Reset form
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Política",
      author: "Redação LDN",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"
    });
    alert("Notícia publicada com sucesso!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1B5E20]">Painel de Controle</h2>
        <button onClick={onLogout} className="flex items-center text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded">
          <LogOut className="w-4 h-4 mr-2" /> Sair
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded shadow border-t-4 border-[#FFD700]">
          <h3 className="text-xl font-bold mb-4 flex items-center text-gray-800"><Plus className="w-5 h-5 mr-2"/> Nova Publicação</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Título</label>
              <input 
                required
                className="w-full border p-2 rounded focus:ring-1 focus:ring-[#1B5E20] outline-none"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Resumo (Excerpt)</label>
              <textarea 
                required
                className="w-full border p-2 rounded h-20 focus:ring-1 focus:ring-[#1B5E20] outline-none"
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Conteúdo Completo</label>
              <textarea 
                required
                className="w-full border p-2 rounded h-40 focus:ring-1 focus:ring-[#1B5E20] outline-none font-serif"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Categoria</label>
                <select 
                  className="w-full border p-2 rounded"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.filter(c => c !== "Todas").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Autor</label>
                <input 
                  className="w-full border p-2 rounded"
                  value={formData.author}
                  onChange={e => setFormData({...formData, author: e.target.value})}
                />
              </div>
            </div>
             <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL da Imagem</label>
              <input 
                className="w-full border p-2 rounded text-sm text-gray-500"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full bg-[#1B5E20] hover:bg-green-800 text-white font-bold py-3 rounded flex items-center justify-center">
              <Save className="w-5 h-5 mr-2" /> Publicar Notícia
            </button>
          </form>
        </div>

        {/* List */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Gerenciar Notícias ({news.length})</h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {news.map(item => (
              <div key={item.id} className="flex justify-between items-start border-b pb-4">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.date} • {item.category}</p>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [view, setView] = useState("home"); // home, article, login, admin
  const [news, setNews] = useState([]);

  // --- EFEITO DO FAVICON ---
  // Este código atualiza o ícone da aba do navegador para usar sua LOGO
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpeg'; // Ajuste para image/png se sua logo for PNG
    link.rel = 'shortcut icon';
    link.href = LOGO_URL;
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = "Linha Direta News | LDN"; // Atualiza também o título da aba
  }, []);

  // Load data from LocalStorage or seed
  useEffect(() => {
    const storedNews = localStorage.getItem('ldn-news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    } else {
      setNews(INITIAL_NEWS);
      localStorage.setItem('ldn-news', JSON.stringify(INITIAL_NEWS));
    }
  }, []);

  // Filter logic
  const filteredNews = activeCategory === "Todas" 
    ? news 
    : news.filter(n => n.category === activeCategory);

  const featuredArticle = filteredNews[0];
  const gridArticles = filteredNews.slice(1);

  const handleGoHome = () => {
    setView("home");
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setView("article");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        goHome={handleGoHome}
        view={view}
      />

      <main className="flex-grow">
        {view === 'login' && <LoginScreen onLogin={() => setView('admin')} />}
        
        {view === 'admin' && <AdminPanel news={news} setNews={setNews} onLogout={handleGoHome} />}

        {view === 'article' && selectedArticle && (
          <ArticleDetail article={selectedArticle} onBack={handleGoHome} />
        )}

        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            {featuredArticle && (
              <div className="mb-12 animate-fade-in-up">
                 <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                  <span>LDN</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[#1B5E20]">{activeCategory}</span>
                </div>
                <Hero article={featuredArticle} onClick={handleArticleClick} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* News Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-8 pb-2 border-b-2 border-gray-100">
                   <div className="w-2 h-8 bg-[#1B5E20] mr-3"></div>
                   <h3 className="text-2xl font-bold text-gray-900">
                    Feed de Notícias
                  </h3>
                </div>
                
                {gridArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {gridArticles.map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={handleArticleClick} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded border border-gray-100">
                    <p className="text-gray-500">Nenhuma notícia encontrada nesta categoria.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-8">
                {/* Newsletter Box */}
                <div className="bg-[#1B5E20] p-8 text-center text-white shadow-xl border-t-4 border-[#FFD700]">
                  <h3 className="font-bold text-2xl mb-2">Linha Direta</h3>
                  <p className="text-green-100 text-sm mb-6">Receba nossa análise diária de inteligência geopolítica.</p>
                  <input 
                    type="email" 
                    placeholder="Seu e-mail profissional" 
                    className="w-full px-4 py-3 bg-green-800 border border-green-700 text-white placeholder-green-300 mb-3 focus:outline-none focus:border-[#FFD700] text-sm"
                  />
                  <button className="w-full bg-[#FFD700] hover:bg-yellow-400 text-[#1B5E20] font-bold py-3 uppercase tracking-wide text-sm transition-colors">
                    Assinar Agora
                  </button>
                </div>

                {/* Trending List */}
                <div className="bg-white border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-5 h-5 text-[#1B5E20] mr-2" />
                    <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Mais Lidas</h3>
                  </div>
                  <ul className="space-y-6">
                    {news.slice(0, 3).map((item, i) => (
                      <li key={item.id} onClick={() => handleArticleClick(item)} className="cursor-pointer group">
                        <div className="flex items-start space-x-4">
                          <span className="text-3xl font-black text-gray-200 group-hover:text-[#FFD700] transition-colors leading-none">{i + 1}</span>
                          <p className="text-sm font-medium text-gray-800 group-hover:text-[#1B5E20] leading-snug">
                            {item.title}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f3311] text-white py-12 border-t-4 border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-[#FFD700] mb-4">Linha Direta News</h4>
              <p className="text-green-100 text-sm leading-relaxed">
                Jornalismo independente focado na soberania nacional e análise aprofundada dos fatos que moldam o Brasil e o mundo.
              </p>
            </div>
            <div>
               <h4 className="text-lg font-bold text-[#FFD700] mb-4">Editorial</h4>
               <ul className="space-y-2 text-sm text-green-100">
                 <li><a href="#" className="hover:text-white">Política Nacional</a></li>
                 <li><a href="#" className="hover:text-white">Geopolítica</a></li>
                 <li><a href="#" className="hover:text-white">Economia</a></li>
               </ul>
            </div>
            <div className="text-right">
              <button 
                onClick={() => setView('login')}
                className="text-xs text-green-700 hover:text-[#FFD700] transition-colors flex items-center justify-end w-full"
              >
                <Lock className="w-3 h-3 mr-1" /> Acesso Administrativo
              </button>
            </div>
          </div>
          <div className="border-t border-green-800 pt-8 text-center text-xs text-green-400">
            <p>&copy; 2026 Linha Direta News. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
