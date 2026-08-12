'use client'
import React from 'react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { WavyBackground } from '../ui/wavy-background'
import { TextHoverEffect } from '../ui/text-hover-effect'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // 요소들이 아래에서 위로 부드럽게 떠오르는 애니메이션
    gsap.fromTo(
      containerRef.current?.children || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    )
  }, { scope: containerRef })

  return (
    <WavyBackground className="w-full mx-auto px-4 py-24 text-center">
      {/* 애니메이션을 적용할 자식들을 감싸는 컨테이너 */}
      <div ref={containerRef} className="flex flex-col items-center justify-center">
        {/* 작은 서브 타이틀 */}
        <p className="font-mono text-[1.6rem] md:text-[2.8rem] tracking-widest text-primary mb-2">
          FRONTEND DEVELOPER & CREATOR
        </p>

        <div className="h-auto md:h-[20rem] w-full flex items-center justify-center">
          <TextHoverEffect text="EUNKYUNG" />
        </div>

        <p className="mt-4 md:text-[2rem] text-[1.6rem]">
          디테일한 인터랙션과 몰입감 있는 웹 경험을 만듭니다.
        </p>

        {/* 바로가기 버튼 */}
        <div className="mt-[4rem] flex flex-wrap items-center justify-center gap-4">
          {/* 1. 이력서 버튼 */}
          <a
            href="https://ginger-comet-f17.notion.site/8727841545124ee384048b9a45cb72d1?source=copy_link" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 font-mono text-[1.4rem] font-bold backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105 shadow-lg"
          >
            <span>View Resume</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>

          {/* 2. 경력기술서 버튼 */}
          <a
            href="https://ginger-comet-f17.notion.site/38ef16aab3998034bd6be220a115ccfa?source=copy_link" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 font-mono text-[1.4rem] font-bold backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-primary hover:scale-105 shadow-lg"
          >
            <span>Career Description</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>

        </div>
      </div>
    </WavyBackground>
  )
}