export default async function handler(req, res) {
  try {
    // YouTube RSS oficial (estável)
    const ytRss = `https://www.youtube.com/feeds/videos.xml?channel_id=UCDt2EBfMb9YFIyrzdRQ6PIQ`
    const ytUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ytRss)}`
    const ytRes = await fetch(ytUrl)
    const ytData = await ytRes.json()
    const videos = (ytData.items || []).slice(0, 3).map(item => ({
      id: item.guid,
      title: item.title,
      thumbnail: item.thumbnail,
      link: item.link
    }))

    // Instagram via RSSHub (cache para estabilidade)
    const igRss = 'https://rsshub.app/instagram/user/linhadiretanewsrj'
    const igUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(igRss)}`
    const igRes = await fetch(igUrl)
    const igData = await igRes.json()
    const igImages = (igData.items || [])
      .slice(0, 3)
      .map(item => {
        const html = item.description || ''
        const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
        return match ? match[1] : null
      })
      .filter(Boolean)

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).send(JSON.stringify({ videos, instagram: igImages }))
  } catch (error) {
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).send(JSON.stringify({ videos: [], instagram: [] }))
  }
}
