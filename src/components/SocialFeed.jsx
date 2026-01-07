import { useEffect, useState } from 'react'

export default function SocialFeed() {
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw')
      .then(r => r.json())
      .then(d => setVideos(d.items?.slice(0, 3) || []))
      .catch(() => setVideos([]))
  }, [])
  
  return (
    <section className="bg-emerald-50 p-6 rounded-xl border-emerald-200 border-2 mb-8">
      <h3 className="font-black text-2xl text-emerald-800 mb-6 text-center">📺 Últimos Vídeos</h3>
      <div className="grid grid-cols-3 gap-4">
        {videos.map(v => (
          <a key={v.guid} href={v.link} target="_blank" rel="noreferrer" className="group hover:shadow-2xl">
            <img src={v.thumbnail} alt={v.title} className="w-full h-32 object-cover rounded-lg group-hover:scale-105" />
            <p className="text-xs mt-2 font-bold line-clamp-2 group-hover:text-emerald-700">{v.title}</p>
          </a>
        ))}
      </div>
      <a href="https://youtube.com/@LinhaDiretaNewsBrasil" target="_blank" rel="noreferrer" className="block text-center mt-4 text-emerald-600 font-bold hover:underline">
        Ver todos →
      </a>
    </section>
  )
}
