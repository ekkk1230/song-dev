'use client'

import { useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
}

export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const el = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return
    }
    const node = el.current
    if (!node) return

    const xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      xTo(x * 0.4)
      yTo(y * 0.4)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  })

  return (
    <a ref={el} href={href} data-cursor-hover className={`inline-block will-change-transform ${className ?? ''}`}>
      {children}
    </a>
  )
}
