'use client'

import { useState, useRef } from 'react'
import { profile } from '@/lib/portfolio-data';
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Outro() {
    const sectionRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const email = profile.email;

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useGSAP(() => {
        const elements = sectionRef.current?.querySelectorAll('.outro-animate');
        if (!elements) return;

        gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <Section id="contact" ref={sectionRef}>
            <div className="content-wrap space-y-[3rem] md:space-y-[4rem]">
                
                {/* 1. 상단 타이틀 레이블 (다른 섹션과 동일한 포맷) */}
                <div className="outro-animate">
                    <SectionTitle 
                        number="04"
                        category="CONTACT"
                        title="Let's build exceptional"
                        subtitle="experiences together."
                    />
                </div>

                {/* 2. 메인 콘텐츠 그리드 (좌측 소개 문구 / 우측 인터랙티브 액션 카드) */}
                <div className="outro-animate grid grid-cols-1 md:grid-cols-2 gap-[2rem] md:gap-[3rem] items-center">
                    
                    {/* 좌측: 콜투액션 설명 카드 */}
                    <div className="bg-neutral-900/30 p-[2.4rem] sm:p-[3rem] md:p-[3.6rem] rounded-[1.6rem] border border-l-[0.4rem] border-l-primary border-neutral-800 space-y-[1.2rem] md:space-y-[1.5rem]">
                        <div className="inline-flex items-center gap-[0.5rem] rounded-full border border-border bg-card px-[1rem] py-[0.4rem] font-mono text-[0.8rem] sm:text-[0.85rem] text-primary">
                            <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-primary animate-pulse" />
                            AVAILABLE FOR OPPORTUNITIES
                        </div>
                        <p className="text-white text-[1.4rem] sm:text-[1.5rem] md:text-[1.8rem] font-medium leading-[1.6] break-keep">
                            사용자에게 매끄러운 경험을 주는 프론트엔드 아키텍처와 인터랙션에 진심입니다. 새로운 가치를 함께 만들어갈 연락을 기다립니다.
                        </p>
                    </div>

                    {/* 우측: 액션 카드들 (이메일 복사 & GitHub) */}
                    <div className="flex flex-col gap-[1.2rem] md:gap-[1.5rem] w-full">
                        
                        {/* 이메일 복사 버튼 카드 */}
                        <button
                            onClick={handleCopyEmail}
                            className="group relative flex items-center justify-between gap-[1.5rem] rounded-[1.6rem] border border-neutral-800 bg-neutral-900/20 p-[2rem] md:p-[2.4rem] text-left hover:border-primary/60 transition-all duration-300 shadow-lg cursor-pointer"
                        >
                            <div className="overflow-hidden">
                                <span className="font-mono text-[1rem] md:text-[1.1rem] text-neutral-400 block mb-[0.2rem]">Direct Email</span>
                                <span className="font-heading text-[1.2rem] sm:text-[1.3rem] md:text-[1.5rem] font-bold text-white group-hover:text-primary transition-colors truncate block">
                                    {email}
                                </span>
                            </div>
                            <span className="rounded-full border border-neutral-700 bg-neutral-900 px-[1.2rem] py-[0.6rem] font-mono text-[0.9rem] sm:text-[1rem] text-white shrink-0">
                                {copied ? "Copied! ✨" : "Copy"}
                            </span>
                        </button>

                        {/* GitHub 링크 카드 */}
                        <a
                            href={profile.socials[0].href || "https://github.com/ekkk1230"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-[1.5rem] rounded-[1.6rem] border border-neutral-800 bg-neutral-900/20 p-[2rem] md:p-[2.4rem] text-left hover:border-primary/60 transition-all duration-300 shadow-lg"
                        >
                            <div className="overflow-hidden">
                                <span className="font-mono text-[1rem] md:text-[1.1rem] text-neutral-400 block mb-[0.2rem]">GitHub Repository</span>
                                <span className="font-heading text-[1.2rem] sm:text-[1.3rem] md:text-[1.5rem] font-bold text-white group-hover:text-primary transition-colors truncate block">
                                    github.com/ekkk1230
                                </span>
                            </div>
                            <span className="rounded-full border border-neutral-700 bg-neutral-900 px-[1.2rem] py-[0.6rem] font-mono text-[0.9rem] sm:text-[1rem] text-white group-hover:text-primary transition-colors shrink-0">
                                Visit ↗
                            </span>
                        </a>

                    </div>

                </div>

                {/* 3. 최하단 카피라이트 */}
                <div className="outro-animate pt-[1.6rem] md:pt-[2rem] border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-[0.8rem] font-mono text-[1.1rem] sm:text-[1.2rem] text-neutral-500 text-center sm:text-left">
                    <p>© 2026. Frontend Portfolio. All rights reserved.</p>
                    <p>Designed with Next.js & Tailwind CSS</p>
                </div>

            </div>
        </Section>
    )
}