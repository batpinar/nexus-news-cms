'use client'

import { ThemeToggle } from './ThemeToggle'

interface SiteHeaderProps {
  siteName?: string
  siteDescription?: string
}

export function SiteHeader({ siteName = 'NEWSLETTER', siteDescription }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="site-branding">
          <h1 className="site-title">{siteName}</h1>
          {siteDescription && (
            <p className="site-description">{siteDescription}</p>
          )}
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="search-input"
            />
            <button className="search-button">SEARCH</button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
