import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // YouTube RSS oficial (estável)
    const ytRss = `https://www.youtube.com/feeds/videos.xml?channel_id=UCDt2EBfMb9YFIyrzdRQ6PIQ`
    const ytUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(ytRss)}`
    const ytRes = await fetch(ytUrl, { next: { revalidate: 300 } }) // 5 min cache
    const ytData = await ytRes.json()
    const videos = (ytData.items || []).slice(0, 3).map((item: any) => ({
      id: item.guid,
      title: item.title,
      thumbnail: item.thumbnail,
      link: item.link
    }))

    // Instagram via RSSHub (cache para estabilidade)
    const igRss = 'https://rsshub.app/instagram/user/linhadiretanewsrj'
    const igUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(igRss)}`
    const igRes = await fetch(igUrl, { next: { revalidate: 600 } }) // 10 min
    const igData = await igRes.json()
    const igImages = (igData.items || [])
      .slice(0, 3)
      .map((item: any) => {
        const html = item.description || ''
        const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
        return match ? match[1] : null
      })
      .filter(Boolean)

    return NextResponse.json({ videos, instagram: igImages }, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate' }
    })
  } catch (error) {
    return NextResponse.json({ videos: [], instagram: [] }, { status: 200 })
  }
}
