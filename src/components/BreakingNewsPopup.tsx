'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface BreakingNews {
  id: string
  title: string
  slug: string
  category: {
    name: string
    slug: string
  }
  publishedDate: string
}

export function BreakingNewsPopup() {
  const [breakingNews, setBreakingNews] = useState<BreakingNews | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [lastNewsId, setLastNewsId] = useState<string | null>(null)

  // Fetch breaking news
  const fetchBreakingNews = async () => {
    try {
      const response = await fetch('/api/breaking-news')
      if (response.ok) {
        const data = await response.json()
        if (data && data.id !== lastNewsId) {
          setBreakingNews(data)
          setLastNewsId(data.id)
          setIsVisible(true)
          setIsDismissed(false)
        }
      }
    } catch (error) {
      console.error('Failed to fetch breaking news:', error)
    }
  }

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchBreakingNews()
    
    // Fetch new breaking news every 2 minutes
    const interval = setInterval(fetchBreakingNews, 120000)
    
    return () => clearInterval(interval)
  }, [lastNewsId])

  // Auto-hide after 30 seconds
  useEffect(() => {
    if (isVisible && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 30000)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, isDismissed])

  // Handle scroll to hide
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      }
      
      lastScrollY = currentScrollY
    }

    if (isVisible && !isDismissed) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, isDismissed])

  // Reset visibility on page refresh/navigation
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && breakingNews && !isDismissed) {
        setIsVisible(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [breakingNews, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // Store dismissed news ID in localStorage to prevent showing again
    if (breakingNews) {
      localStorage.setItem('dismissedBreakingNews', breakingNews.id)
    }
  }

  if (!breakingNews || isDismissed) return null

  return (
    <div className={`breaking-news-popup ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="breaking-news-content">
        <div className="breaking-badge">
          <span className="breaking-text">BREAKING</span>
          <span className="pulse-dot"></span>
        </div>
        
        <div className="breaking-news-info">
          <div className="breaking-category">
            {breakingNews.category.name}
          </div>
          <Link href={`/posts/${breakingNews.slug}`} className="breaking-title">
            {breakingNews.title}
          </Link>
          <div className="breaking-time">
            {new Date(breakingNews.publishedDate).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        
        <button 
          onClick={handleDismiss}
          className="breaking-dismiss"
          aria-label="Dismiss breaking news"
        >
          ×
        </button>
      </div>
    </div>
  )
}
