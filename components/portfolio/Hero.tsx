'use client'
import React from 'react';
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
        <p className="font-mono text-[2.8rem] tracking-widest text-primary mb-2">
          FRONTEND DEVELOPER & CREATOR
        </p>

        <div className="h-[20rem] w-full flex items-center justify-center">
          <TextHoverEffect text="EUNKYUNG" />
        </div>

        <p className="mt-4 md:text-[2rem]">
          디테일한 인터랙션과 몰입감 있는 웹 경험을 만듭니다.
        </p>
      </div>
    </WavyBackground>
  )
}