import { useEffect, useState } from 'react'

export default function SocialFooter() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UCDt2EBfMb9YFIyrzdRQ6PIQ'))
      .then(r => r.json())
      .then(({items = []}) => {
        const vids = items.slice(0, 3).map(item => ({
          id: item.guid,
          title: item.title,
          thumb: item.thumbnail,
          link: item.link
        }))
        setVideos(vids)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="py-12 bg-emerald-50 border-t-8 border-emerald-200">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* YouTube */}
        <div>
          <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent text-center lg:text-left">
            📺 YouTube LDN Brasil
          </h3>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            {loading ? skeleton(3) : videos.map(v => (
              <a key={v.id} href={v.link} target="_blank" rel="noreferrer" className="group block">
                <img src={v.thumb} alt={v.title} className="w-full aspect-video object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300" loading="lazy" />
                <p className="mt-2 text-sm font-bold text-gray-700 line-clamp-2 text-center">{v.title}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Instagram */}
        <div>
          <h3 className="text-4xl font-black mb-6 text-emerald-900 text-center lg:text-left">📸 Instagram</h3>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
            {igFallback()}
          </div>
        </div>
      </div>
    </section>
  )

  function skeleton(n) {
    return Array(n).fill(0).map((_, i) => (
      <div key={i} className="animate-pulse group block">
        <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shadow-lg" />
      </div>
    ))
  }

  function igFallback() {
    return Array(3).fill(0).map((_, i) => (
      <a key={i} href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="group block p-3 text-center bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
        <span className="text-2xl block mb-1">📸</span>
        <span className="text-xs font-bold text-emerald-700 block">Post {i+1}</span>
        <span className="text-xs text-emerald-600">Ver no Insta</span>
      </a>
    ))
  }
}
