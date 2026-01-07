export default function SocialFooter() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-green-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* YouTube Horizontal */}
        <div>
          <h4 className="text-2xl font-black text-white mb-8 text-center md:text-left">
            📺 YouTube LDN Brasil
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {/* 3 thumbnails — carrega dinâmico via RSS */}
            <a href="#" className="group hover:scale-105">
              <div className="w-full aspect-video bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-2xl group-hover:shadow-emerald-500/50"></div>
              <p className="text-white text-xs mt-2 font-bold text-center">Análise Geopolítica</p>
            </a>
            <a href="#" className="group hover:scale-105">
              <div className="w-full aspect-video bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-2xl group-hover:shadow-emerald-500/50"></div>
              <p className="text-white text-xs mt-2 font-bold text-center">Reforma Tributária</p>
            </a>
            <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" className="group hover:scale-105">
              <div className="w-full aspect-video bg-gradient-to-br from-red-400 to-pink-500 rounded-xl shadow-2xl group-hover:shadow-emerald-500/50 flex items-center justify-center">
                <span className="text-xl font-black text-white">➕</span>
              </div>
              <p className="text-white text-xs mt-2 font-bold text-center">Mais vídeos</p>
            </a>
          </div>
        </div>
        
        {/* Instagram */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-black text-white mb-6">📸 Instagram</h4>
          <a href="https://instagram.com/linhadiretanewsrj" target="_blank" className="block mx-auto max-w-md">
            <iframe src="https://www.instagram.com/linhadiretanewsrj/embed" className="w-full h-96 rounded-2xl shadow-2xl" />
          </a>
        </div>
      </div>
    </footer>
  )
}
