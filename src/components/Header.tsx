import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="container-default w-container">
        <div className="header-content-wrapper">
          <div className="header-logo-wrapper">
            <Link href="/" className="header-logo-link">
              <Image src="/qgp-logo.svg" alt="QGP Logo" className="header-logo" width={74} height={74} />
            </Link>
          </div>
          <div className="header-nav-menu-wrapper middle">
            <nav className="header-nav-menu-list middle w-list-unstyled" role="list">
              <div className="header-nav-list-item middle">
                <Link href="/blog" className="header-nav-link w-nav-link">
                  <div className="text-300 bold">Blog</div>
                </Link>
              </div>
              <div className="header-nav-list-item middle">
                <Link href="https://calendar.app.google/SNxZ6k3fbLaj17Jk9" target="_blank" className="header-nav-link w-nav-link">
                  <div className="text-300 bold">Let&apos;s Talk</div>
                </Link>
              </div>
              <div className="header-nav-list-item middle">
                <Link href="https://www.linkedin.com/in/jameserichardson/" target="_blank" className="social-icon-square no-bg w-inline-block">
                  <div className="social-icon-font">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 