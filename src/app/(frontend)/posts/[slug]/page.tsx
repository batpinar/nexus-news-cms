import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Yazıyı slug ile bul
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    limit: 1,
  })

  const post = posts[0]

  if (!post) {
    notFound()
  }

  // Site ayarlarını al (meta bilgiler için)
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <div className="post-page">
      <header className="site-header">
        <div className="container">
          <Link href="/" className="site-title">
            {siteSettings?.siteName || 'Nexus News'}
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <article className="post-article">
            <header className="post-header">
              <div className="breadcrumb">
                <Link href="/">Ana Sayfa</Link>
                <span> / </span>
                <span>Haber</span>
              </div>
              
              <h1 className="post-title">{post.title}</h1>
              
              <div className="post-meta">
                <div className="meta-info">
                  <span className="date">
                    {new Date(post.publishedDate || post.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {post.excerpt && (
                <div className="post-excerpt">
                  <p>{post.excerpt}</p>
                </div>
              )}
            </header>

            <div className="post-content">
              {/* Payload'ın rich text içeriğini render et */}
              <div dangerouslySetInnerHTML={{ __html: JSON.stringify(post.content) }} />
            </div>

            <footer className="post-footer">
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags">
                  <h4>Etiketler:</h4>
                  <div className="tags-list">
                    {post.tags.map((tag: string, index: number) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </footer>
          </article>

          <div className="post-navigation">
            <Link href="/" className="back-link">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

// Static paths için gerekli function
export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}
