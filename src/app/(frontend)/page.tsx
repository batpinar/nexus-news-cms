import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { DailyQuote } from '@/components/DailyQuote'

import config from '@/payload.config'
import './styles.css'

// ISR - Her 60 saniyede bir yeniden oluştur (updated)
export const revalidate = 60

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Site ayarlarını al
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Son yayınlanan yazıları al
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 6,
  })

  return (
    <div className="home">
      <SiteHeader 
        siteName={siteSettings?.siteName || 'Nexus News'}
        siteDescription={siteSettings?.siteDescription}
      />

      <main className="main-content">
        <div className="container">
          {/* Günün Sözü */}
          <DailyQuote />

          {/* Günün Sözü - Site Settings */}
          {siteSettings?.dailyQuote?.enabled && siteSettings.dailyQuote.quote && (
            <section className="daily-quote">
              <h2>Günün Sözü (Site Ayarları)</h2>
              <blockquote>
                <p className="quote-text">"{siteSettings.dailyQuote.quote}"</p>
                {siteSettings.dailyQuote.author && (
                  <cite className="quote-author">— {siteSettings.dailyQuote.author}</cite>
                )}
              </blockquote>
            </section>
          )}

          {/* Son Yazılar */}
          <section className="latest-posts">
            <h2>Son Haberler</h2>
            <div className="posts-grid">
              {posts.map((post: any) => (
                <article key={post.id} className="post-card">
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="date">
                        {new Date(post.publishedDate || post.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <h3 className="post-title">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="post-excerpt">{post.excerpt}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {posts.length === 0 && (
            <div className="no-posts">
              <p>Henüz yayınlanmış haber bulunmuyor.</p>
              <Link href="/admin" className="admin-link">
                Admin panelden haber ekleyebilirsiniz
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
