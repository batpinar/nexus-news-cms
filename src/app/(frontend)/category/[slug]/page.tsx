import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Kategoriyi slug ile bul
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    notFound()
  }

  // Bu kategoriye ait yazıları bul
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

  // Site ayarlarını al
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <div className="category-page">
      <header className="site-header">
        <div className="container">
          <Link href="/" className="site-title">
            {siteSettings?.siteName || 'Nexus News'}
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <div className="breadcrumb">
              <Link href="/">Ana Sayfa</Link>
              <span> / </span>
              <span>Kategori</span>
              <span> / </span>
              <span>{category.name}</span>
            </div>
            
            <h1 className="page-title">
              Kategori: {category.name}
            </h1>
            
            {category.description && (
              <p className="category-description">{category.description}</p>
            )}
          </div>

          <section className="category-posts">
            <div className="posts-count">
              <p>{posts.length} haber bulundu</p>
            </div>
            
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

            {posts.length === 0 && (
              <div className="no-posts">
                <p>Bu kategoride henüz haber bulunmuyor.</p>
                <Link href="/" className="back-link">
                  Ana Sayfaya Dön
                </Link>
              </div>
            )}
          </section>
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
