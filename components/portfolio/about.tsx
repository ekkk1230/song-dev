'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { about } from '@/lib/portfolio-data'

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-about-word]', {
        opacity: 0.08,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-about-copy]',
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      gsap.from('[data-stat]', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-stats]',
          start: 'top 85%',
        },
      })
    },
    { scope: root },
  )

  const words = about.intro.split(' ')

  return (
    <section id="about" ref={root} className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <p className="mb-12 font-mono text-sm tracking-widest text-primary">
          (01) — ABOUT
        </p>

        <div
          data-about-copy
          className="max-w-4xl font-heading text-2xl font-medium leading-snug wrap-break-word text-foreground/55 md:text-4xl"
        >
          {words.map((word, i) => {
            const emphasized = /표준|접근성|UI|다양한|이해관계자/;
            const isEmphasized = emphasized.test(word.replace(/[()]/g, ''));
            return (
              <span
                key={i}
                data-about-word
                className={
                  isEmphasized
                    ? 'inline-block font-semibold text-foreground'
                    : 'inline-block'
                }
              >
                {word}&nbsp;
              </span>
            )
          })}
        </div>

        <div className="mt-8">
          {about.detail.map((line, i) => (
            <p key={i} className="leading-relaxed text-muted-foreground">
              {line}
            </p>
          ))}
        </div>

        <div
          data-stats
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-border pt-12 md:grid-cols-4"
        >
          {about.stats.map((stat) => (
            <div key={stat.label} data-stat>
              <div className="font-heading text-4xl font-semibold text-primary md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 font-mono text-xs tracking-widest text-muted-foreground">
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
