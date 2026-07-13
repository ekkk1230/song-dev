'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { profile } from '@/lib/portfolio-data'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      })
    },
    { scope: navRef },
  )

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.name.split(' ')[0]}
          <span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full border border-primary/40 px-4 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          연락하기
        </a>
      </nav>
    </header>
  )
}
