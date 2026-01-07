// src/components/SocialFeed.jsx
import { useEffect, useState } from 'react'

export default function SocialFeed() {
  const [youtubeVideos, setYoutubeVideos] = useState([])
  const channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw" // LinhaDiretaNewsBrasil ✅
  
  useEffect(() => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)
      .then(res => res.json())
      .then(data => setYoutubeVideos(data.items?.slice(0, 4) || []))
      .catch(console.error)
  }, [])
  
  return (
    <aside className="space-y-6 p-6 bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-xl shadow-sm sticky top-24">
      <h3 className="font-black text-xl bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent mb-6 text-center">
        📱 Siga LDN
      </h3>
      
      {/* YouTube */}
      <div>
        <h4 className="font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
          📺 YouTube
        </h4>
        <div className="grid gap-3 max-h-80 overflow-y-auto scrollbar-thin">
          {youtubeVideos.length ? (
            youtubeVideos.map(video => (
              <a 
                key={video.guid} 
                href={video.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 border border-slate-200 rounded-lg hover:shadow-lg hover:border-emerald-300 transition-all group"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-32 object-cover rounded mb-2 group-hover:scale-105 transition-transform"
                />
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-700">
                  {video.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{video.pubDate}</p>
              </a>
            ))
          ) : (
            <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" className="block text-center py-12 text-emerald-600 hover:underline">
              📺 Seguir Canal →
            </a>
          )}
        </div>
      </div>
      
      {/* Instagram */}
      <div>
        <h4 className="font-bold text-lg text-emerald-800 mb-4 flex items-center gap-2">
          📸 @linhadiretanewsrj
        </h4>
        <a 
          href="https://www.instagram.com/linhadiretanewsrj/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
            <iframe 
              src="https://www.instagram.com/linhadiretanewsrj/embed" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              className="rounded-xl"
              title="Instagram @linhadiretanewsrj"
              loading="lazy"
            />
          </div>
        </a>
      </div>
    </aside>
  )
}
