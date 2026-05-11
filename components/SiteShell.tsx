'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

interface Props {
  children: React.ReactNode
  footer: React.ReactNode
  logoUrl: string | null
}

export default function SiteShell({ children, footer, logoUrl }: Props) {
  const pathname = usePathname()

  if (pathname.startsWith('/studio')) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation logoUrl={logoUrl} />
      <main>{children}</main>
      {footer}
    </>
  )
}
