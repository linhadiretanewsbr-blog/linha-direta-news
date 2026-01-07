import { useEffect, useState } from 'react'

export default function SocialFeed() {
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_x5XG1OV2P6uZZ5FSM9Ttw')
      .then(r => r.json())
      .then(d => setVideos(d.items?.slice(0, 3) || []))
  }, [])
  
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-2xl border-4 border-emerald-200 shadow-2xl mb-12">
      <h3 className="font-black text-3xl bg-gradient-to-r from-emerald-700 to-green-900 bg-clip-text text-transparent mb-8 text-center">
        📺 YouTube LDN
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {videos.map((v, i) => (
          <a key={v.guid} href={v.link} target="_blank" rel="noreferrer" className="group hover:shadow-2xl hover:scale-105">
            <img src={v.thumbnail} alt={v.title} className="w-full h-40 object-cover rounded-2xl group-hover:scale-110" />
            <p className="text-sm font-bold mt-3 line-clamp-2 text-gray-900">{v.title}</p>
          </a>
        ))}
      </div>
      
      {/* Instagram */}
      <div className="mt-8 pt-8 border-t-4 border-emerald-200">
        <h4 className="font-bold text-xl text-emerald-800 mb-4 text-center">📸 @linhadiretanewsrj</h4>
        <a href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block mx-auto max-w-sm">
          <iframe src="https://www.instagram.com/linhadiretanewsrj/embed" className="w-full h-80 rounded-2xl" />
        </a>
      </div>
    </section>
  )
}
