'use client'
import React from 'react';
import { about, profile } from "@/lib/portfolio-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const elements = contentRef.current?.children;
        if (!elements) return;

        gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: .9,
                stagger: .2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        )
    }, { scope: sectionRef });

    useGSAP(() => {
        const stateElements = sectionRef.current?.querySelectorAll('.stat-number');
        stateElements?.forEach(el => {
            const rawTarget = el.getAttribute('data-value') || '0';
            const numericValue = parseFloat(rawTarget.replace(/[^0-9.]/g, '')) || 0;
            const suffix = rawTarget.replace(/[0-9.]/g, '');
            const obj = { val: 0 };

            gsap.to(obj, {
                val: numericValue,
                duration: 1.5,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 20%',
                    toggleActions: 'play none none none',
                },
                onUpdate: () => {
                    const currentFormatted = Number.isInteger(numericValue)
                        ? Math.floor(obj.val)
                        : obj.val.toFixed(1);

                    el.textContent = currentFormatted + suffix;
                }
            });
        });
    }, { scope: sectionRef });

    return (
        <Section id="about" ref={sectionRef}>
            <div ref={contentRef} className="content-wrap">
                {/* 섹션 번호 레이블 */}
                <SectionTitle 
                    number="01"
                    category="ABOUT"
                    title={profile.tagline.split('\n')[0]}
                    subtitle={profile.tagline.split('\n')[1]}
                />

                {/* 핵심소개 & 상세 내용 */}
                <div className="space-y-[3rem]">
                    
                    {/* 상단 메인 인트로 박스 */}
                    <div className="bg-neutral-900/30 p-[3.6rem] rounded-[1.6rem] border border-l-[0.4rem] border-l-primary border-neutral-800">
                        <p className="text-white text-[1.8rem] md:text-[2.2rem] font-medium leading-[1.6]">
                            {about.intro}
                        </p>
                    </div>

                    {/* 하단 상세 내용 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
                        {about.detail.map((paragraph, idx) => (
                            <div key={idx} className="bg-neutral-900/20 p-[2.4rem] rounded-[1.4rem] border border-neutral-800/60 hover:border-primary/40 transition-colors duration-300">
                                <p className="leading-[1.7] text-neutral-300 text-[1.4rem] md:text-[1.5rem]">
                                    {paragraph}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* 통계 지표 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.6rem] pt-[1.6rem]">
                    {about.stats.map((stat, idx) => (
                        <div key={idx} className="p-[2.4rem] rounded-[1.4rem] bg-neutral-900/20 border border-neutral-800/60">
                            <div 
                                className="stat-number text-[3.6rem] font-bold text-primary mb-[0.4rem] font-mono"
                                data-value={stat.value}
                            >
                                0
                            </div>
                            <div className="text-[1.2rem] text-neutral-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}