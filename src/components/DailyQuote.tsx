'use client'

import { useState, useEffect } from 'react'

interface Quote {
  text: string
  author: string
}

interface DailyQuoteProps {
  className?: string
}

export function DailyQuote({ className = '' }: DailyQuoteProps) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDailyQuote()
  }, [])

  const fetchDailyQuote = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/daily-quote')
      const data = await response.json()
      
      if (data.success && data.quote) {
        setQuote(data.quote)
      } else {
        throw new Error('Quote fetch failed')
      }
    } catch (err) {
      console.error('Daily quote fetch error:', err)
      setError('Günün sözü yüklenemedi')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`daily-quote ${className}`}>
        <div className="quote-header">
          <h2>Günün Sözü</h2>
        </div>
        <div className="quote-content loading">
          <div className="loading-skeleton"></div>
        </div>
      </div>
    )
  }

  if (error || !quote) {
    return null // Hata durumunda component'i gizle
  }

  return (
    <div className={`daily-quote ${className}`}>
      <div className="quote-header">
        <h2>Günün Sözü</h2>
      </div>
      <blockquote className="quote-content">
        <p className="quote-text">"{quote.text}"</p>
        <cite className="quote-author">— {quote.author}</cite>
      </blockquote>
    </div>
  )
}
