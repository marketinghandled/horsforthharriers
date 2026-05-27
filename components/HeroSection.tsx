'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Calendar, Trophy, MapPin } from 'lucide-react'

const stats = [
  { icon: Users, label: '200+ Members', sub: 'All abilities' },
  { icon: Calendar, label: 'Two Sessions', sub: 'Tue & Thu evenings' },
  { icon: Trophy, label: 'Est. 1985', sub: '40+ years of running' },
  { icon: MapPin, label: 'Horsforth', sub: 'North West Leeds' },
]

interface HeroSectionProps {
  headline?: string | null
  subtext?: string | null
  imageUrl?: string | null
}

export default function HeroSection({ headline, subtext, imageUrl }: HeroSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Only apply parallax on larger screens where it looks good
      if (imgRef.current && window.innerWidth >= 768) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      } else if (imgRef.current) {
        imgRef.current.style.transform = 'none'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative flex flex-col bg-brand-dark overflow-hidden min-h-[60vh] md:min-h-[calc(100vh-85px)]"
    >
      <div
        ref={imgRef}
        className="absolute will-change-transform"
        style={{ inset: '-10% 0 0' }}
      >
        <Image
          src={imageUrl ?? '/harriers-group.jpg'}
          alt="Horsforth Harriers"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-top opacity-50"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-end w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16 pt-16 md:pt-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
            {headline ?? 'Welcome to Horsforth Harriers'}
          </h1>
          {subtext && (
            <p className="text-blue-100 text-lg mb-5">{subtext}</p>
          )}
          <div className={`flex flex-wrap gap-3 ${subtext ? '' : 'mt-5'}`}>
            <Link
              href="/sessions"
              className="px-7 py-3 bg-white text-brand-blue font-bold hover:bg-blue-50 transition-colors"
            >
              Our Sessions
            </Link>
            <Link
              href="/membership"
              className="px-7 py-3 border border-white text-white font-bold hover:bg-white/10 transition-colors"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/20">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-blue-200 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
