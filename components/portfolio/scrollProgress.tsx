'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
    ScrollTrigger.refresh()
  })

  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent">
      <div ref={bar} className="h-full w-full bg-primary" />
    </div>
  )
}
