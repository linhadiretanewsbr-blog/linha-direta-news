import { useEffect, useState } from 'react'

export default function SocialFooter() {
  const [videos, setVideos] = useState([])
  const [igImages, setIgImages] = useState([])
  const CHANNEL_ID = 'UCDt2EBfMb9YFIyrzdRQ6PIQ'

  useEffect(() => {
    const ytRss = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    const ytUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ytRss)}`

    fetch(ytUrl)
      .then((r) => r.json())
      .then((d) => setVideos(d.items?.slice(0, 3) || []))
      .catch(() => setVideos([]))

    const igRss = encodeURIComponent('https://rsshub.app/instagram/user/linhadiretanewsrj')
    const igUrl = `https://api.rss2json.com/v1/api.json?rss_url=${igRss}`
    fetch(igUrl)
      .then((r) => r.json())
      .then((d) => {
        const imgs = (d.items || [])
          .slice(0, 3)
          .map((item) => {
            const html = item.description || item.content || ''
            const m = html.match(/<img[^>]+src=\"([^\"]+)\"/i)
            return m ? m[1] : null
          })
          .filter(Boolean)
        setIgImages(imgs)
      })
      .catch(() => setIgImages([]))
  }, [])

  return (
    <section className="py-12 bg-emerald-50 border-t-8 border-emerald-200">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* YouTube */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            📺 YouTube LDN Brasil
          </h3>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            {videos.length ? (
              videos.map((v) => (
                <a key={v.guid} href={v.link} target="_blank" rel="noreferrer" className="group block">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-40 object-cover rounded-2xl shadow-lg" />
                  <p className="text-sm font-bold mt-2 text-gray-700 text-center line-clamp-2">{v.title}</p>
                </a>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <a key={i} href={`https://www.youtube.com/channel/${CHANNEL_ID}`} target="_blank" rel="noreferrer" className="group block">
                  <div className="aspect-[16/9] bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center"></div>
                </a>
              ))
            )}
          </div>
        </div>

        {/* Instagram 3x1 */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-6 text-emerald-900">📸 Instagram</h3>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
            {igImages.length ? (
              igImages.map((src, i) => (
                <a key={i} href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg">
                  <img src={src} alt={`IG ${i + 1}`} className="w-full h-40 object-cover" />
                </a>
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <a key={i} href="https://instagram.com/linhadiretanewsrj" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg">
                  <img src={`https://placehold.co/600x400?text=IG+${i}`} alt={`IG ${i}`} className="w-full h-40 object-cover" />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
