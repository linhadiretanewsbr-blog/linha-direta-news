(async () => {
  try {
    const CHANNEL_ID = 'UCDt2EBfMb9YFIyrzdRQ6PIQ'
    const ytRss = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    const ytUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ytRss)}`
    const ytRes = await fetch(ytUrl)
    const ytData = await ytRes.json()
    const videos = (ytData.items || []).slice(0,3).map(i=>({id:i.guid, title:i.title, thumbnail:i.thumbnail, link:i.link}))

    const igRss = 'https://rsshub.app/instagram/user/linhadiretanewsrj'
    const igUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(igRss)}`
    const igRes = await fetch(igUrl)
    const igData = await igRes.json()
    const igImages = (igData.items || []).slice(0,3).map(item=>{
      const html = item.description || ''
      const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
      return m ? m[1] : null
    }).filter(Boolean)

    console.log(JSON.stringify({videos, instagram: igImages}, null, 2))
  } catch (err) {
    console.error('Erro:', err.message)
    process.exit(1)
  }
})()
