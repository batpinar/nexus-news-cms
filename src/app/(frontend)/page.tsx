import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { DailyQuote } from '@/components/DailyQuote'
import { DynamicFeaturedNews } from '@/components/DynamicFeaturedNews'

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

  // Get published posts with category information
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 6,
    depth: 2, // Include category information
  })

  // Get categories for navigation
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 6,
    sort: 'name',
  })

  return (
    <div className="newsletter-layout">
      <SiteHeader 
        siteName={siteSettings?.siteName || 'NEWSLETTER'}
        siteDescription={siteSettings?.siteDescription}
      />

      <main className="main-container">
        <div className="content-wrapper">
          {/* Navigation Bar */}
          <nav className="main-navigation">
            <ul className="nav-menu">
              <li><Link href="/" className="nav-item active">All News</Link></li>
              {categories.map((category: any) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="nav-item">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="layout-grid">
            {/* Left Column - Featured & Latest News */}
            <div className="left-column">
              {/* Dynamic Featured Breaking News */}
              <DynamicFeaturedNews />

              {/* Latest News Grid */}
              <section className="latest-news-section">
                <h2 className="section-title">Latest News</h2>
                <div className="news-grid">
                  {posts.slice(1, 7).map((post: any) => (
                    <article key={post.id} className="news-card">
                      {post.featuredImage && typeof post.featuredImage === 'object' && (
                        <div className="news-image">
                          <img
                            src={post.featuredImage.url || ''}
                            alt={post.featuredImage.alt || post.title}
                          />
                        </div>
                      )}
                      <div className="news-content">
                        <div className="news-meta">
                          {post.category && typeof post.category === 'object' && (
                            <Link href={`/category/${post.category.slug}`} className="news-category">
                              {post.category.name}
                            </Link>
                          )}
                          <span className="news-date">
                            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="news-title">
                          <Link href={`/posts/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        {post.excerpt && (
                          <p className="news-excerpt">{post.excerpt}</p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="right-sidebar">
              {/* Günün Sözü */}
              <DailyQuote />

              {/* Trending Headlines */}
              <section className="trending-section">
                <h3 className="sidebar-title">Trending Headlines</h3>
                <div className="trending-list">
                  {posts.slice(0, 6).map((post: any, index: number) => (
                    <article key={post.id} className="trending-item">
                      <div className="trending-image">
                        {post.featuredImage && typeof post.featuredImage === 'object' && (
                          <img
                            src={post.featuredImage.url || ''}
                            alt={post.featuredImage.alt || post.title}
                          />
                        )}
                      </div>
                      <div className="trending-content">
                        <h4 className="trending-title">
                          <Link href={`/posts/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <div className="trending-meta">
                          <span className="trending-date">
                            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {/* Newsletter Footer */}
      <footer className="newsletter-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NEWSLETTER</h3>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/copyright">Copyright Policy</a>
            </div>
            <div className="footer-column">
              <a href="/our-policy">Our Policy</a>
              <a href="/accessibility">Accessibility</a>
              <a href="/help">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
