'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ScrollableFeaturedContentProps {
  featuredPost: any
  category: any
}

export function ScrollableFeaturedContent({ featuredPost, category }: ScrollableFeaturedContentProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Handle scroll to show/hide featured content
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down - hide featured content
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show featured content
        setIsVisible(true)
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={`category-featured ${isVisible ? 'visible' : 'hidden'}`}>
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
  )
}
