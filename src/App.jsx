import React, { useState, useEffect } from 'react';
import { Menu, Search, X, ChevronRight, Clock, User, Share2, MessageCircle, TrendingUp, Home, Lock, Plus, Save, Edit, Trash2, LogOut, RefreshCw, AlertCircle, WifiOff, XCircle } from 'lucide-react';

// --- CONFIGURAÇÃO SANITY ---
const PROJECT_ID = 'hun2hrsa';
const DATASET = 'production';
const API_VERSION = '2024-03-01';

// URL Pública para LEITURA (Não precisa de token)
const QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;
// URL para ESCRITA (Precisa de token)
const MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

// --- DADOS DE FALLBACK (Para quando a API falhar/CORS) ---
const FALLBACK_NEWS = [
  {
    id: 'local-1',
    title: "Brasil assume liderança estratégica em acordo comercial (Modo Demo)",
    excerpt: "Este é um dado local exibido porque a conexão com o Sanity falhou. Configure o CORS no seu painel Sanity para ver dados reais.",
    content: "Conteúdo de demonstração ativo. A conexão com a API falhou, provavelmente devido a restrições de CORS (Cross-Origin Resource Sharing). Para corrigir: Vá ao painel do Sanity > API > CORS Origins e adicione a URL do seu site.",
    category: "Geopolítica",
    author: "Sistema Local",
    date: new Date().toLocaleDateString('pt-BR'),
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 'local-2',
    title: "Mercados reagem positivamente às novas diretrizes econômicas",
    excerpt: "Exemplo de notícia de economia carregada localmente para preservar o layout.",
    content: "Texto simulado para preenchimento de layout.",
    category: "Economia",
    author: "Redação LDN",
    date: new Date().toLocaleDateString('pt-BR'),
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 'local-3',
    title: "Avanços na legislação digital prometem mais segurança",
    excerpt: "Política de tecnologia em foco no congresso nacional.",
    content: "Texto simulado para preenchimento de layout.",
    category: "Política",
    author: "Brasília Repórter",
    date: new Date().toLocaleDateString('pt-BR'),
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
  }
];

// --- CORES & LOGO ---
const LOGO_URL = "https://placehold.co/200x200/1B5E20/FFD700?text=LDN"; 
const CATEGORIES = ["Todas", "Política", "Geopolítica", "Economia", "Brasil", "Mundo"];

// --- HELPERS DA API SANITY ---

// 1. Buscar Notícias (Leitura)
const fetchSanityNews
  = async () => {
  const query = `*[_type == "news"] | order(_createdAt desc) {
    _id,
    title,
    excerpt,
    content,
    category,
    author,
imageUrl: image,
    ,
    "date": _createdAt
  }`;

  try {
    const response = await fetch(`${QUERY_URL}?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.result) {
      return data.result.map(item => ({
        ...item,
        id: item._id, // Mapear _id do Sanity para id local
        date: new Date(item.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
      }));
    }
    return [];
  } catch (error) {
    console.warn("Aviso: Não foi possível conectar ao Sanity (Provável bloqueio de CORS ou API Indisponível).", error.message);
    throw error;
  }
};

// 2. Salvar Notícia (Criação ou Edição)
const saveSanityNews = async (article, token) => {
  const isEdit = article.id && !article.id.toString().startsWith('local-');

  const mutations = {
    mutations: [
      isEdit ? {
        patch: {
          id: article.id,
          set: {
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            author: article.author,
imageUrl              : article.image
          }
        }
      } : {
        create: {
          _type: 'news',
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          author: article.author,
          60
            : article.image
        }
      }
    ]
  };

  const response = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(mutations)
  });

  if (!response.ok) {
    throw new Error('Falha ao salvar no Sanity. Verifique seu Token e CORS.');
  }
  
  return await response.json();
};

// 3. Deletar Notícia
const deleteSanityNews = async (id, token) => {
  const mutations = {
    mutations: [
      { delete: { id: id } }
    ]
  };

  await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(mutations)
  });
};

// --- COMPONENTES ---

const Logo = ({ onClick }) => (
  <div className="flex items-center cursor-pointer group" onClick={onClick}>
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
    <div className="bg-[#1B5E20] text-white py-1 px-4 text-xs font-medium flex justify-between items-center">
      <span>Linha Direta News Brasil - Análise Política e Geopolítica</span>
      <span>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Logo onClick={goHome} />

        <nav className="hidden md:flex space-x-6">
          {view === 'admin' ? (
             <span className="text-red-600 font-bold flex items-center"><Lock className="w-4 h-4 mr-1"/> MODO ADMINISTRADOR (SANITY)</span>
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

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input type="text" placeholder="Pesquisar..." className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#1B5E20] w-32 transition-all focus:w-48 bg-gray-50" />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1B5E20] hover:text-green-800 focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>

    {isMenuOpen && (
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setIsMenuOpen(false); goHome(); }} className={`block w-full text-left px-3 py-2 text-base font-bold uppercase ${activeCategory === cat ? "bg-green-50 text-[#1B5E20] border-l-4 border-[#FFD700]" : "text-gray-700 hover:bg-gray-50"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    )}
  </header>
);

const Hero = ({ article, onClick }) => (
  <div className="relative h-[450px] w-full bg-black overflow-hidden cursor-pointer group mb-12 shadow-xl border-b-4 border-[#FFD700]" onClick={() => onClick(article)}>
    <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60" onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Sem+Imagem'} />
    <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-transparent to-transparent flex flex-col justify-end p-6 sm:p-10">
      <span className="inline-block px-3 py-1 bg-[#FFD700] text-[#1B5E20] text-xs font-black uppercase tracking-wider mb-3 w-fit">{article.category}</span>
      <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight max-w-4xl drop-shadow-md">{article.title}</h2>
      <p className="text-gray-200 text-lg line-clamp-2 max-w-2xl mb-4 hidden sm:block font-light">{article.excerpt}</p>
      <div className="flex items-center text-[#FFD700] text-sm space-x-4 font-medium">
        <div className="flex items-center"><User className="w-4 h-4 mr-1" /> {article.author}</div>
        <div className="flex items-center border-l border-gray-600 pl-4"><Clock className="w-4 h-4 mr-1" /> {article.date}</div>
      </div>
    </div>
  </div>
);

const ArticleCard = ({ article, onClick }) => (
  <div className="flex flex-col bg-white border-l-4 border-[#1B5E20] shadow-sm hover:shadow-lg transition-all cursor-pointer group h-full" onClick={() => onClick(article)}>
    <div className="relative h-48 overflow-hidden bg-gray-200">
      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Sem+Imagem'} />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD700]"></div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-[#1B5E20] uppercase tracking-wider">{article.category}</span></div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-3 group-hover:text-[#1B5E20] transition-colors leading-tight">{article.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow font-serif">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
        <span>{article.date}</span>
        <span className="flex items-center text-[#1B5E20] font-bold uppercase text-[10px]">Ler Completo <ChevronRight className="w-3 h-3 ml-1" /></span>
      </div>
    </div>
  </div>
);

const ArticleDetail = ({ article, onBack }) => (
  <div className="animate-fade-in max-w-4xl mx-auto pt-4 pb-12">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#1B5E20] mb-6 transition-colors font-bold text-sm uppercase tracking-wide">
      <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Voltar
    </button>
    <article className="bg-white shadow-lg border-t-8 border-[#1B5E20]">
      <div className="p-8 sm:p-12">
         <div className="flex items-center space-x-2 mb-6">
            <span className="bg-[#1B5E20] text-white px-3 py-1 text-xs font-bold uppercase">{article.category}</span>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-500 text-sm font-medium">{article.date}</span>
         </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{article.title}</h1>
        <p className="text-xl text-gray-600 font-serif leading-relaxed mb-8 border-l-4 border-[#FFD700] pl-4 italic">{article.excerpt}</p>
        <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#1B5E20] rounded-full flex items-center justify-center text-[#FFD700] font-bold mr-3">{article.author ? article.author.charAt(0) : 'L'}</div>
            <div><p className="font-bold text-gray-900 text-sm">Por {article.author}</p><p className="text-xs text-gray-500">Jornalismo LDN</p></div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 hover:bg-[#1B5E20] hover:text-white rounded transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-serif">
          {article.content ? article.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          )) : <p>Conteúdo indisponível.</p>}
        </div>
      </div>
    </article>
  </div>
);

// --- PAINEL ADMIN ---

const LoginScreen = ({ onLogin }) => {
  const [token, setToken] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (token.length > 20) {
      onLogin(token);
    } else {
      alert("Por favor, insira um Token de API do Sanity válido.");
    }
  };

  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md border-t-4 border-[#1B5E20]">
        <h2 className="text-2xl font-bold text-[#1B5E20] mb-2 flex items-center">
          <Lock className="w-6 h-6 mr-2" /> Admin Sanity
        </h2>
        <p className="text-gray-500 text-sm mb-6">Conecte-se ao Dataset <strong>production</strong> do projeto <strong>{PROJECT_ID}</strong>.</p>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sanity API Write Token</label>
            <input 
              type="password" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-[#1B5E20] text-sm font-mono"
              placeholder="ex: sk..."
            />
            <button type="button" onClick={() => setShowHelp(!showHelp)} className="text-xs text-blue-600 mt-2 hover:underline flex items-center">
              <AlertCircle className="w-3 h-3 mr-1"/> Onde pego isso?
            </button>
          </div>
          
          {showHelp && (
            <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-100">
              1. Vá para <a href="https://sanity.io/manage" target="_blank" className="underline font-bold">sanity.io/manage</a><br/>
              2. Selecione o projeto <strong>hun2hrsa</strong><br/>
              3. Vá em <strong>API</strong> &gt; <strong>Tokens</strong><br/>
              4. Crie um token com permissão <strong>Editor</strong>.<br/>
              5. Cole aqui.
            </div>
          )}

          <button type="submit" className="w-full bg-[#1B5E20] text-white py-2 rounded font-bold hover:bg-green-800 transition-colors">
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminPanel = ({ news, setNews, token, onLogout, refreshNews }) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Política",
    author: "Redação LDN",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveSanityNews(formData, token);
      await refreshNews();
      alert(formData.id ? "Notícia atualizada com sucesso!" : "Notícia publicada com sucesso!");
      // Limpa o formulário apenas se for criação, ou reseta tudo se for edição concluída
      setFormData({title: "", excerpt: "", content: "", category: "Política", author: "Redação LDN", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"});
    } catch (err) {
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (id.toString().startsWith('local-')) {
        alert("Não é possível deletar dados de demonstração (Locais).");
        return;
    }
    if (confirm("Tem certeza? Isso apagará o documento do Sanity permanentemente.")) {
      setLoading(true);
      try {
        await deleteSanityNews(id, token);
        await refreshNews();
      } catch (err) {
        alert("Erro ao deletar: " + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({title: "", excerpt: "", content: "", category: "Política", author: "Redação LDN", image: "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&q=80&w=1000"});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1B5E20]">Painel de Controle</h2>
        <button onClick={onLogout} className="flex items-center text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded">
          <LogOut className="w-4 h-4 mr-2" /> Sair
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FORMULÁRIO */}
        <div className={`bg-white p-6 rounded shadow border-t-4 transition-colors duration-300 ${formData.id ? 'border-blue-600' : 'border-[#FFD700]'}`}>
          <h3 className={`text-xl font-bold mb-4 flex items-center ${formData.id ? 'text-blue-700' : 'text-gray-800'}`}>
             {formData.id ? <Edit className="w-5 h-5 mr-2"/> : <Plus className="w-5 h-5 mr-2"/>}
             {formData.id ? "Editando Notícia" : "Publicar Nova Notícia"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Título</label>
              <input required className="w-full border p-2 rounded focus:ring-1 focus:ring-[#1B5E20] outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Resumo</label>
              <textarea required className="w-full border p-2 rounded h-20 focus:ring-1 focus:ring-[#1B5E20] outline-none" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Conteúdo Completo</label>
              <textarea required className="w-full border p-2 rounded h-40 focus:ring-1 focus:ring-[#1B5E20] outline-none font-serif" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Categoria</label>
                <select className="w-full border p-2 rounded" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {CATEGORIES.filter(c => c !== "Todas").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Autor</label>
                <input className="w-full border p-2 rounded" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>
            </div>
             <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL da Imagem</label>
              <input className="w-full border p-2 rounded text-sm text-gray-500" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
            </div>
            
            <div className="flex gap-2">
                <button disabled={loading} type="submit" className={`w-full text-white font-bold py-3 rounded flex items-center justify-center ${loading ? 'bg-gray-400' : (formData.id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#1B5E20] hover:bg-green-800')}`}>
                    {loading ? 'Processando...' : <><Save className="w-5 h-5 mr-2" /> {formData.id ? "Salvar Alterações" : "Publicar Notícia"}</>}
                </button>
                {formData.id && (
                    <button type="button" onClick={handleCancelEdit} className="px-4 border border-red-200 text-red-600 rounded hover:bg-red-50 font-medium flex items-center">
                        <XCircle className="w-4 h-4 mr-1"/> Cancelar
                    </button>
                )}
            </div>
          </form>
        </div>

        {/* LISTAGEM */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-gray-800">No Ar ({news.length})</h3>
             <button onClick={refreshNews} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"><RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /></button>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {news.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start border-b pb-4">
                <div className="mb-2 sm:mb-0">
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-1 flex items-center">
                    {item.id.toString().startsWith('local-') && <span className="bg-yellow-200 text-yellow-800 text-[10px] px-1 rounded mr-2">DEMO</span>}
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500">{item.date} • {item.category}</p>
                </div>
                {!item.id.toString().startsWith('local-') && (
                    <div className="flex items-center space-x-1">
                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded text-xs font-bold flex items-center" title="Editar este post">
                            <Edit className="w-3 h-3 mr-1" /> Editar
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 px-3 py-1 bg-red-50 hover:bg-red-100 rounded text-xs font-bold flex items-center" disabled={loading} title="Excluir este post">
                            <Trash2 className="w-3 h-3 mr-1" /> Excluir
                        </button>
                    </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [view, setView] = useState("home"); 
  
  // Estado de Dados
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  
  // Estado de Autenticação (Token Sanity)
  const [adminToken, setAdminToken] = useState(null);

  // Favicon Effect
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/jpeg';
    link.rel = 'shortcut icon';
    link.href = LOGO_URL;
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = "Linha Direta News | LDN";
  }, []);

  // Fetch Inicial (Carrega ao abrir o site)
  const loadNews = async () => {
    setLoading(true);
    setUsingFallback(false);
    try {
      const data = await fetchSanityNews();
      setNews(data);
    } catch (err) {
      console.warn("Falha ao carregar API Sanity. Usando dados locais de fallback.");
      setNews(FALLBACK_NEWS);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Handlers
  const handleGoHome = () => {
    setView("home");
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (token) => {
    setAdminToken(token);
    setView("admin");
  };

  const filteredNews = activeCategory === "Todas" ? news : news.filter(n => n.category === activeCategory);
  const featuredArticle = filteredNews[0];
  const gridArticles = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
      {/* Aviso de Modo Fallback/Offline */}
      {usingFallback && (
        <div className="bg-yellow-500 text-white text-xs font-bold text-center py-2 px-4 flex justify-center items-center">
            <WifiOff className="w-4 h-4 mr-2" />
            MODO DEMONSTRAÇÃO: Não foi possível conectar ao Sanity (Verifique CORS). Exibindo dados locais.
        </div>
      )}

      <Header 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        goHome={handleGoHome}
        view={view}
      />

      <main className="flex-grow">
        {view === 'login' && <LoginScreen onLogin={handleAdminLogin} />}
        
        {view === 'admin' && (
          <AdminPanel 
            news={news} 
            setNews={setNews} 
            token={adminToken} 
            onLogout={() => { setAdminToken(null); handleGoHome(); }} 
            refreshNews={loadNews}
          />
        )}

        {view === 'article' && selectedArticle && (
          <ArticleDetail article={selectedArticle} onBack={handleGoHome} />
        )}

        {view === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="flex justify-center py-20"><RefreshCw className="w-10 h-10 text-[#1B5E20] animate-spin" /></div>
            ) : (
              <>
                {featuredArticle ? (
                  <div className="mb-12 animate-fade-in-up">
                     <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                      <span>LDN</span>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-[#1B5E20]">{activeCategory}</span>
                    </div>
                    <Hero article={featuredArticle} onClick={(article) => { setSelectedArticle(article); setView("article"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded mb-8">
                    <p className="text-gray-500 font-medium">Nenhuma notícia encontrada.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-8 pb-2 border-b-2 border-gray-100">
                       <div className="w-2 h-8 bg-[#1B5E20] mr-3"></div>
                       <h3 className="text-2xl font-bold text-gray-900">Feed de Notícias</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {gridArticles.map(article => (
                        <ArticleCard 
                          key={article.id} 
                          article={article} 
                          onClick={(article) => { setSelectedArticle(article); setView("article"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                        />
                      ))}
                    </div>
                  </div>

                  <aside className="hidden lg:block space-y-8">
                    <div className="bg-[#1B5E20] p-8 text-center text-white shadow-xl border-t-4 border-[#FFD700]">
                      <h3 className="font-bold text-2xl mb-2">Linha Direta</h3>
                      <p className="text-green-100 text-sm mb-6">Receba nossa análise diária de inteligência geopolítica.</p>
                      <input type="email" placeholder="Seu e-mail profissional" className="w-full px-4 py-3 bg-green-800 border border-green-700 text-white placeholder-green-300 mb-3 focus:outline-none focus:border-[#FFD700] text-sm" />
                      <button className="w-full bg-[#FFD700] hover:bg-yellow-400 text-[#1B5E20] font-bold py-3 uppercase tracking-wide text-sm transition-colors">Assinar Agora</button>
                    </div>
                    <div className="bg-white border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center mb-6"><TrendingUp className="w-5 h-5 text-[#1B5E20] mr-2" /><h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm">Mais Lidas</h3></div>
                      <ul className="space-y-6">
                        {news.slice(0, 3).map((item, i) => (
                          <li key={item.id} onClick={() => { setSelectedArticle(item); setView("article"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer group">
                            <div className="flex items-start space-x-4">
                              <span className="text-3xl font-black text-gray-200 group-hover:text-[#FFD700] transition-colors leading-none">{i + 1}</span>
                              <p className="text-sm font-medium text-gray-800 group-hover:text-[#1B5E20] leading-snug">{item.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="bg-[#0f3311] text-white py-12 border-t-4 border-[#FFD700]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div><h4 className="text-lg font-bold text-[#FFD700] mb-4">Linha Direta News</h4><p className="text-green-100 text-sm leading-relaxed">Jornalismo independente focado na soberania nacional.</p></div>
            <div><h4 className="text-lg font-bold text-[#FFD700] mb-4">Editorial</h4><ul className="space-y-2 text-sm text-green-100"><li>Política Nacional</li><li>Geopolítica</li></ul></div>
            <div className="text-right">
              <button onClick={() => setView('login')} className="text-xs text-green-700 hover:text-[#FFD700] transition-colors flex items-center justify-end w-full">
                <Lock className="w-3 h-3 mr-1" /> Acesso Administrativo
              </button>
            </div>
          </div>
          <div className="border-t border-green-800 pt-8 text-center text-xs text-green-400"><p>&copy; 2026 Linha Direta News.</p></div>
        </div>
      </footer>
    </div>
  );
}


