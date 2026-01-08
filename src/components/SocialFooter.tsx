"use client"
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SocialFooter() {
  const { data, error, isLoading } = useSWR('/api/social-feed', fetcher, {
    refreshInterval: 5 * 60 * 1000 // 5 min
  })

  const isEmpty = !data?.videos?.length && !data?.instagram?.length

  return (
    <section className="py-12 bg-emerald-50 border-t-8 border-emerald-200">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* YouTube */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            📺 YouTube LDN Brasil
          </h3>
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            {renderCards(data?.videos || [], '/channel/UCDt2EBfMb9YFIyrzdRQ6PIQ', isLoading as boolean, error)}
          </div>
        </div>

        {/* Instagram */}
        <div className="text-center lg:text-left">
          <h3 className="text-4xl font-black mb-6 text-emerald-900">📸 Instagram</h3>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
            {renderIgCards(data?.instagram || [], 'https://instagram.com/linhadiretanewsrj', isLoading as boolean, error)}
          </div>
        </div>
      </div>
    </section>
  )

  function renderCards(items: any[], fallbackUrl: string, loading: boolean, error: any) {
    if (loading) return skeletonCards(3)
    if (error || isEmpty) return errorCards(fallbackUrl)
    return items.map((v, i) => (
      <a key={v.id || i} href={v.link || fallbackUrl} target="_blank" rel="noreferrer" className="group block">
        <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-200" loading="lazy" />
        <p className="text-sm font-bold mt-2 text-gray-700 text-center line-clamp-2">{v.title}</p>
      </a>
    ))
  }

  function renderIgCards(images: string[], url: string, loading: boolean, error: any) {
    if (loading) return skeletonCards(3, true)
    if (error || isEmpty) return errorCards(url, true)
    return images.map((src, i) => (
      <a key={i} href={url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl shadow-lg group">
        <img src={src} alt={`Post ${i + 1}`} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-all">
          <span className="text-white text-xs font-bold">Ver no Insta</span>
        </div>
      </a>
    ))
  }

  function skeletonCards(count: number, square = false) {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="group block animate-pulse">
        <div className={`w-full ${square ? 'h-40' : 'aspect-video'} bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl shadow-lg`} />
      </div>
    ))
  }

  function errorCards(url: string, ig = false) {
    return Array.from({ length: 3 }, (_, i) => (
      <a key={i} href={url} target="_blank" rel="noreferrer" className="group block text-center p-4">
        <div className="w-full aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-4">
          {ig ? <span className="text-3xl">📸</span> : <span className="text-3xl">📺</span>}
          <p className="text-xs text-gray-500 font-medium">Carregando...</p>
          <span className="text-xs text-emerald-700">Clique para ver</span>
        </div>
      </a>
    ))
  }
}
