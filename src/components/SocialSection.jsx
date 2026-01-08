import React from 'react';
import { Youtube, Instagram, ChevronRight, ExternalLink } from 'lucide-react';

const LOGO_URL = "https://placehold.co/200x200/1B5E20/FFD700?text=LDN"; 

const SocialSection = () => {
  // --- CONFIGURAÇÃO DO YOUTUBE ---
  const youtubeChannelId = "UCDt2EBfMb9YFIyrzdRQ6PIQ";
  
  // LÓGICA AUTOMÁTICA: Pega o ID do canal (UC...) e troca por (UU...) para pegar a lista de envios.
  // SE NÃO APARECER NADA: Crie uma playlist manual no YouTube, pegue o ID dela (PL...) e cole abaixo.
  const youtubePlaylistId = "UUDt2EBfMb9YFIyrzdRQ6PIQ"; 

  // --- CONFIGURAÇÃO DO INSTAGRAM ---
  const instagramHandle = "linhadiretanewsrj";
  
  // Imagens estáticas para garantir que o layout nunca quebre (API do Instagram bloqueia feeds externos frequentemente)
  // Substitua estas URLs pelas fotos reais dos seus melhores posts para atrair cliques
  const instagramImages = [
    "https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&w=400&q=80", // Foto Política
    "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&w=400&q=80", // Foto Economia
    "https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=400&q=80"  // Foto Geral
  ];

  return (
    <section className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1B5E20] mb-2 uppercase tracking-wide">
            Siga a Linha Direta
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Análises em vídeo e cobertura em tempo real nas nossas redes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- CARTÃO YOUTUBE --- */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow flex flex-col h-full">
            {/* Header Vermelho */}
            <div className="bg-[#FF0000] p-4 flex justify-between items-center text-white">
              <div className="flex items-center font-bold text-lg">
                <Youtube className="w-6 h-6 mr-2 fill-current" /> 
                Canal Oficial
              </div>
              <a 
                href={`https://www.youtube.com/channel/${youtubeChannelId}?sub_confirmation=1`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-[#FF0000] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Inscrever-se
              </a>
            </div>

            {/* Player de Vídeo (Embed da Playlist) */}
            <div className="aspect-w-16 aspect-h-9 w-full bg-black relative pt-[56.25%]">
               <iframe 
                 className="absolute top-0 left-0 w-full h-full"
                 src={`https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}`}
                 title="Feed do YouTube"
                 frameBorder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               ></iframe>
            </div>

            {/* Rodapé do Cartão */}
            <div className="p-6 mt-auto">
              <h3 className="font-bold text-gray-800 text-lg mb-2">Vídeos & Análises</h3>
              <p className="text-gray-500 text-sm mb-4">
                Assista às últimas análises geopolíticas e entrevistas exclusivas.
              </p>
              <a 
                href={`https://www.youtube.com/channel/${youtubeChannelId}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-[#FF0000] font-bold hover:underline"
              >
                Ver todos os vídeos <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* --- CARTÃO INSTAGRAM --- */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow flex flex-col h-full">
            {/* Header Gradiente */}
            <div className="bg-gradient-to-r from-purple-600 to-orange-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center font-bold text-lg">
                <Instagram className="w-6 h-6 mr-2" /> 
                @{instagramHandle}
              </div>
              <a 
                href={`https://instagram.com/${instagramHandle}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors"
              >
                Seguir
              </a>
            </div>
            
            <div className="p-6 flex-grow flex flex-col justify-center">
               {/* Perfil Info */}
               <div className="flex items-center mb-6">
                 <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-purple-600 flex-shrink-0">
                    <img src={LOGO_URL} className="w-full h-full rounded-full border-2 border-white object-cover" alt="LDN" />
                 </div>
                 <div className="ml-4">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">Linha Direta News</h3>
                    <p className="text-gray-500 text-xs mt-1">Bastidores, cobertura em tempo real e enquetes.</p>
                 </div>
               </div>
               
               {/* Grid de Fotos (Linkável) */}
               <a 
                 href={`https://instagram.com/${instagramHandle}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="grid grid-cols-3 gap-2 mb-6"
               >
                  {instagramImages.map((imgSrc, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group/img cursor-pointer">
                       <img 
                         src={imgSrc} 
                         alt="Post do Instagram" 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" 
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                         <Instagram className="text-white opacity-0 group-hover/img:opacity-100 w-6 h-6 transition-opacity" />
                       </div>
                    </div>
                  ))}
               </a>

               {/* Botão de Ação */}
               <a 
                 href={`https://instagram.com/${instagramHandle}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="w-full block text-center bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold py-3 rounded-lg transition-colors flex items-center justify-center mt-auto"
               >
                 <ExternalLink className="w-4 h-4 mr-2" /> Acessar Perfil Completo
               </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialSection;
