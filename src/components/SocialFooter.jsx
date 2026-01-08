export default function SocialFooter() {
  return (
    <footer className="bg-gradient-to-r from-emerald-900 to-green-900 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* YouTube Horizontal */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-8 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            📺 YouTube LDN Brasil
          </h3>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" rel="noreferrer" className="group hover:scale-110">
              <div className="aspect-[16/9] bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl shadow-2xl overflow-hidden hover:shadow-red-500/50 transition-all">
                <div className="h-full flex items-center justify-center p-4">
                  <span className="text-3xl font-black text-white drop-shadow-2xl">▶</span>
                </div>
              </div>
              <p className="text-sm font-bold mt-3 text-gray-700 text-center">Canal LDN</p>
            </a>
            <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" rel="noreferrer" className="group hover:scale-110">
              <div className="aspect-[16/9] bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-3xl shadow-2xl overflow-hidden hover:shadow-emerald-500/50 transition-all">
                <div className="h-full flex items-center justify-center p-4">
                  <span className="text-3xl font-black text-white drop-shadow-2xl">▶</span>
                </div>
              </div>
              <p className="text-sm font-bold mt-3 text-gray-700 text-center">Análises</p>
            </a>
            <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" rel="noreferrer" className="group hover:scale-110">
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-600 to-indigo-500 rounded-3xl shadow-2xl overflow-hidden hover:shadow-blue-500/50 transition-all flex items-center justify-center">
                <span className="text-3xl font-black text-white">➕</span>
              </div>
              <p className="text-sm font-bold mt-3 text-gray-700 text-center">Mais vídeos</p>
            </a>
          </div>
        </div>
        
        {/* Instagram */}
        {/* Instagram 3x1 */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-6 text-emerald-900">📸 Instagram</h3>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
            <a href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg">
              <img src="https://placehold.co/600x400?text=IG+1" alt="Instagram 1" className="w-full h-40 object-cover" />
            </a>
            <a href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg">
              <img src="https://placehold.co/600x400?text=IG+2" alt="Instagram 2" className="w-full h-40 object-cover" />
            </a>
            <a href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg">
              <img src="https://placehold.co/600x400?text=IG+3" alt="Instagram 3" className="w-full h-40 object-cover" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
