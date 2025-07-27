'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BreakingNews {
  id: string
  title: string
  slug: string
  excerpt?: string
  category: {
    name: string
    slug: string
  }
  publishedDate: string
  featuredImage?: {
    url: string
    alt: string
  }
}

export function DynamicFeaturedNews() {
  const [breakingNews, setBreakingNews] = useState<BreakingNews | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastNewsId, setLastNewsId] = useState<string | null>(null)

  // Fetch breaking news
  const fetchBreakingNews = async () => {
    try {
      const response = await fetch('/api/featured-breaking-news')
      if (response.ok) {
        const data = await response.json()
        if (data && data.id !== lastNewsId) {
          setBreakingNews(data)
          setLastNewsId(data.id)
          setIsVisible(true)
        }
      }
    } catch (error) {
      console.error('Failed to fetch breaking news:', error)
    }
  }

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchBreakingNews()
    
    // Fetch new breaking news every 5 minutes
    const interval = setInterval(fetchBreakingNews, 300000)
    
    return () => clearInterval(interval)
  }, [lastNewsId])

  // Handle scroll to hide
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down - hide featured news
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY && currentScrollY < 100) {
        // Scrolling up - show featured news
        setIsVisible(true)
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset visibility on page refresh/navigation
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && breakingNews) {
        fetchBreakingNews() // Fetch new news when page becomes visible
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (!breakingNews) return null

  return (
    <section className={`hero-section dynamic-featured ${isVisible ? 'visible' : 'hidden'}`}>
      <article className="featured-article">
        {breakingNews.featuredImage && (
          <div className="featured-image">
            <img
              src={breakingNews.featuredImage.url}
              alt={breakingNews.featuredImage.alt || breakingNews.title}
            />
            <div className="image-overlay">
              <div className="breaking-badge-hero">
                <span className="breaking-text">BREAKING NEWS</span>
                <span className="pulse-indicator"></span>
              </div>
              <div className="article-category">
                {breakingNews.category.name}
              </div>
            </div>
          </div>
        )}
        <div className="featured-content">
          <div className="breaking-timestamp">
            <span className="live-indicator">● LIVE</span>
            <span className="update-time">
              Updated {new Date(breakingNews.publishedDate).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <h1 className="featured-title breaking-title">
            <Link href={`/posts/${breakingNews.slug}`}>
              {breakingNews.title}
            </Link>
          </h1>
          
          {breakingNews.excerpt && (
            <p className="featured-excerpt">
              {breakingNews.excerpt}
            </p>
          )}
          
          <div className="article-meta">
            <span className="author">Breaking News Team</span>
            <span className="date">
              {new Date(breakingNews.publishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          <Link href={`/posts/${breakingNews.slug}`} className="read-breaking-news">
            Read Full Story →
          </Link>
        </div>
      </article>
    </section>
  )
}
