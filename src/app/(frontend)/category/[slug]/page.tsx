import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { RichTextRenderer } from '@/components/RichTextRenderer'

import config from '@/payload.config'

// ISR - Revalidate every 3 minutes
export const revalidate = 180

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find category by slug
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    notFound()
  }

  // Find posts for this category
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      category: {
        equals: category.id,
      },
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 20,
  })

  // Get site settings
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Get categories for navigation
  const { docs: allCategories } = await payload.find({
    collection: 'categories',
    limit: 6,
    sort: 'name',
  })

  // Separate featured post and regular posts
  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

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
              <li><Link href="/" className="nav-item">All News</Link></li>
              {allCategories.map((cat: any) => (
                <li key={cat.id}>
                  <Link 
                    href={`/category/${cat.slug}`} 
                    className={`nav-item ${cat.slug === category.slug ? 'active' : ''}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Category Header */}
          <section className="category-header" style={{
            backgroundImage: (category.image && typeof category.image === 'object' && category.image.url)
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${category.image.url})` 
              : 'linear-gradient(135deg, var(--orange-500), var(--orange-600))',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span> / </span>
              <span>Category</span>
              <span> / </span>
              <span>{category.name}</span>
            </div>
            
            <h1 className="category-title">{category.name}</h1>
            
            {category.description && (
              <p className="category-description">{category.description}</p>
            )}
            
            <div className="posts-count">
              <span>{posts.length} articles found</span>
            </div>
          </section>

          {/* Featured Post for Category */}
          {featuredPost && (
            <section className="category-featured">
              <div className="featured-card">
                <div className="featured-content">
                  <div className="featured-meta">
                    <span className="featured-category">{category.name}</span>
                    <span className="featured-date">
                      {new Date(featuredPost.publishedDate || featuredPost.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="featured-title">
                    <Link href={`/posts/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  )}
                  <Link href={`/posts/${featuredPost.slug}`} className="read-more">
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <section className="category-posts">
              <h3 className="section-title">More from {category.name}</h3>
              <div className="news-grid">
                {regularPosts.map((post: any) => (
                  <article key={post.id} className="news-card">
                    <div className="news-image">
                      {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url ? (
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt || post.title}
                        />
                      ) : (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, var(--orange-500), var(--orange-600))',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '3rem'
                        }}>
                          📰
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="card-category">{category.name}</span>
                        <span className="card-date">
                          {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h4 className="card-title">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      {post.excerpt && (
                        <p className="card-excerpt">{post.excerpt}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* No Posts Message */}
          {posts.length === 0 && (
            <section className="no-posts">
              <div className="empty-state">
                <h3>No articles in this category yet</h3>
                <p>Check back later for new content.</p>
                <Link href="/" className="back-link">
                  ← Back to Homepage
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

// Static paths için gerekli function
export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  return categories.map((category: any) => ({
    slug: category.slug,
  }))
}
