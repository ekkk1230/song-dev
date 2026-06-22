'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { profile } from '@/lib/portfolio-data'
import { MagneticButton } from './magnetic-button'

export function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('[data-hero-eyebrow]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          '[data-hero-line] [data-word]',
          {
            yPercent: 120,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          '-=0.3',
        )
        .from(
          '[data-hero-tagline]',
          { opacity: 0, y: 24, duration: 0.9 },
          '-=0.6',
        )
        .from(
          '[data-hero-meta] > *',
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 },
          '-=0.5',
        )

      // Ambient drifting glow
      gsap.to('[data-hero-glow]', {
        opacity: 0.55,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Parallax on scroll
      gsap.to('[data-hero-inner]', {
        yPercent: 28,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Scroll cue bob
      gsap.to('[data-scroll-cue]', {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: root },
  )

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden px-6"
    >
      <div
        data-hero-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/20 opacity-25 blur-[120px]"
      />
      <div data-hero-inner className="mx-auto w-full max-w-6xl">
        <p
          data-hero-eyebrow
          className="mb-6 font-mono text-sm tracking-widest text-primary"
        >
          {profile.location} · {profile.status}
        </p>

        <h1 className="font-heading text-[clamp(2.75rem,11vw,9rem)] font-bold leading-[0.88] tracking-tight text-balance">
          {profile.roleLine.map((line, lineIdx) => (
            <span
              key={lineIdx}
              data-hero-line
              className="block overflow-hidden pb-2"
            >
              <span
                data-word
                className={
                  lineIdx === 0
                    ? 'inline-block text-foreground/30'
                    : 'inline-block text-foreground'
                }
              >
                {line}
                {lineIdx === profile.roleLine.length - 1 && (
                  <span className="text-primary">.</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <span className="font-heading text-2xl text-primary md:text-3xl">
            {profile.name}
          </span>
          <span className="font-mono text-sm tracking-widest text-muted-foreground">
            {profile.nameEn.toUpperCase()}
          </span>
        </div>

        <p
          data-hero-tagline
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {profile.tagline}
        </p>

        <div data-hero-meta className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#work"
            className="rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground"
          >
            프로젝트 보기
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="rounded-full border border-border px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            연락하기
          </MagneticButton>
        </div>
      </div>

      <div
        data-scroll-cue
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-muted-foreground"
      >
        SCROLL
      </div>
    </section>
  )
}
