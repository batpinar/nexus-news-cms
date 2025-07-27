import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { SiteHeader } from '@/components/SiteHeader'

import config from '@/payload.config'

// ISR - Revalidate every 5 minutes
export const revalidate = 300

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find post by slug
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

  // Get site settings for meta information
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <div className="newsletter-layout">
      <SiteHeader 
        siteName={siteSettings?.siteName || 'NEWSLETTER'}
        siteDescription={siteSettings?.siteDescription}
      />

      <main className="main-container">
        <div className="content-wrapper">
          <article className="post-article">
            <header className="post-header">
              <div className="breadcrumb">
                <Link href="/">Home</Link>
                <span> / </span>
                <span>Article</span>
              </div>
              
              <h1 className="post-title">{post.title}</h1>
              
              <div className="post-meta">
                <div className="meta-info">
                  <span className="author">By News Team</span>
                  <span className="separator">•</span>
                  <span className="date">
                    {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
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
              <RichTextRenderer content={post.content} />
            </div>

            <footer className="post-footer">
              <div className="back-to-home">
                <Link href="/" className="back-link">
                  ← Back to Homepage
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </main>
    </div>
  )
}

// Generate static paths for ISR
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
