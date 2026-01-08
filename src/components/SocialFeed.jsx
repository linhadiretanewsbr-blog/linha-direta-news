import { useEffect, useState } from 'react'

export default function SocialFeed() {
  const [videos, setVideos] = useState([])
  const CHANNEL_ID = 'UCDt2EBfMb9YFIyrzdRQ6PIQ'

  useEffect(() => {
    const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`

    fetch(url)
      .then((r) => r.json())
      .then((d) => setVideos(d.items?.slice(0, 3) || []))
      .catch((err) => {
        console.warn('Erro ao carregar YouTube:', err)
        setVideos([])
      })
  }, [])

  return (
    <section className="bg-emerald-50 p-6 rounded-2xl border-emerald-200 border-2 mb-8">
      <h3 className="font-black text-3xl text-emerald-800 mb-6 text-center">📺 Últimos Vídeos</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {videos.length
          ? videos.map((v) => (
              <a
                key={v.guid}
                href={v.link}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-xl shadow hover:shadow-2xl transition-transform transform hover:-translate-y-1"
              >
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-40 md:h-48 object-cover"
                  onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
                />
                <p className="text-sm font-bold mt-3 px-2 line-clamp-2 text-gray-800 group-hover:text-emerald-700">{v.title}</p>
              </a>
            ))
          : [1, 2, 3].map((i) => (
              <a
                key={i}
                href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-xl shadow transition-all"
              >
                <div className="w-full h-40 md:h-48 bg-gray-200 flex items-center justify-center rounded-xl"></div>
              </a>
            ))}
      </div>

      <a
        href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
        target="_blank"
        rel="noreferrer"
        className="block text-center mt-4 text-emerald-600 font-bold hover:underline"
      >
        Ver canal →
      </a>
    </section>
  )
}
