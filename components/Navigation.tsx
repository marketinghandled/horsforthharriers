'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About the Club', href: '/about' },
      { label: 'How to Join', href: '/how-to-join' },
      { label: 'Membership', href: '/membership' },
      { label: 'Committee', href: '/committee' },
      { label: 'Club Documents', href: '/club-documents' },
      { label: 'Club Kit', href: '/kit' },
      { label: 'Club Records', href: '/records' },
      { label: 'Club Ballot', href: '/ballot' },
    ],
  },
  {
    label: 'Sessions',
    href: '/sessions',
    children: [
      { label: 'Sessions', href: '/sessions' },
      { label: 'Training Matrix', href: '/sessions/matrix' },
      { label: 'Coaches', href: '/sessions/coaches' },
    ],
  },
  {
    label: 'Races',
    children: [
      { label: 'Club Championships', href: '/races/championships' },
      { label: 'PECO Cross Country', href: '/races/peco' },
      { label: 'Relays', href: '/races/relays' },
      { label: 'Yorkshire Vets', href: '/races/yorkshire-vets' },
      { label: 'Apperley Bridge Canter (ABC)', href: '/races/abc' },
    ],
  },
  { label: 'Couch to 5K', href: '/couch-to-5k' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation({ logoUrl }: { logoUrl?: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const setNavHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--nav-h', `${headerRef.current.offsetHeight}px`)
      }
    }
    setNavHeight()
    window.addEventListener('resize', setNavHeight)
    return () => window.removeEventListener('resize', setNavHeight)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  return (
    <header ref={headerRef} className="bg-brand-blue border-b border-brand-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logoUrl ?? '/harriers-logo.png'}
              alt="Horsforth Harriers"
              width={478}
              height={160}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-5 text-white/80 hover:text-white font-medium text-sm transition-colors border-b-2 border-transparent hover:border-white"
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </Link>
                ) : (
                  <span className="flex items-center gap-1 px-4 py-5 text-white/80 hover:text-white font-medium text-sm cursor-default select-none border-b-2 border-transparent hover:border-white transition-colors">
                    {item.label}
                    {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </span>
                )}
                {item.children && openDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 w-52 bg-white shadow-lg border border-gray-200 py-1 z-50"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-brand-light hover:text-brand-blue transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/how-to-join"
              className="ml-4 px-5 py-2 bg-white text-brand-blue font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              Join Us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-dark bg-white">
          <div className="px-4 py-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-2 py-3 text-gray-700 font-medium text-sm hover:text-brand-blue transition-colors group"
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    >
                      <span className="border-b-2 border-transparent group-hover:border-brand-blue transition-colors">{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="pb-2 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-2 py-2 text-sm text-gray-600 hover:text-brand-blue transition-colors group"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="border-b-2 border-transparent group-hover:border-brand-blue transition-colors">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-2 py-3 text-gray-700 font-medium text-sm hover:text-brand-blue transition-colors group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="border-b-2 border-transparent group-hover:border-brand-blue transition-colors">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 pb-2">
              <Link
                href="/how-to-join"
                className="block py-3 bg-brand-blue text-white font-semibold text-sm text-center"
                onClick={() => setMobileOpen(false)}
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
