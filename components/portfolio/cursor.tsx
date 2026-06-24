'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.15, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.15, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e: PointerEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const grow = () =>
      gsap.to(ring.current, { scale: 2.2, opacity: 0.5, duration: 0.3, ease: 'power3.out' })
    const shrink = () =>
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' })

    window.addEventListener('pointermove', move)

    const interactive = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactive.forEach((el) => {
      el.addEventListener('pointerenter', grow)
      el.addEventListener('pointerleave', shrink)
    })

    gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 })

    return () => {
      window.removeEventListener('pointermove', move)
      interactive.forEach((el) => {
        el.removeEventListener('pointerenter', grow)
        el.removeEventListener('pointerleave', shrink)
      })
    }
  })

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary opacity-0"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0"
      />
    </div>
  )
}
