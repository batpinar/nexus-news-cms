'use client'

import { ThemeToggle } from './ThemeToggle'

interface SiteHeaderProps {
  siteName?: string
  siteDescription?: string
}

export function SiteHeader({ siteName = 'Nexus News', siteDescription }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="site-branding">
            <h1 className="site-title">{siteName}</h1>
            {siteDescription && (
              <p className="site-description">{siteDescription}</p>
            )}
          </div>
          <div className="header-actions">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
