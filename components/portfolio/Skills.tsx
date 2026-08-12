'use client'
import React from 'react';
import { skills } from "@/lib/portfolio-data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Skills() {
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
                    toggleActions: 'play none none none'
                },
            }
        )
    }, { scope: sectionRef })
    
    return (
        <Section id="skills" ref={sectionRef}>
            <div ref={contentRef} className="content-wrap space-y-[4rem]">
                {/* 섹션 번호 레이블 */}
                <SectionTitle 
                    number="02"
                    category="SKILLS"
                    title="Technical Stack"
                    subtitle="활용 가능한 기술 및 도구 입니다."
                />

                {/* 스킬 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] md:gap-[2.4rem]">
                    {skills.map((cate, idx) => (
                        <div
                            key={idx}
                            className="bg-neutral-900/30 p-[2.4rem] sm:p-[2.8rem] md:p-[3.2rem] rounded-[1.6rem] border border-neutral-800 hover:border-primary/40 transition-colors duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* 그룹 타이틀 */}
                                <h3 className="text-[1.8rem] sm:text-[2rem] font-bold text-white mb-[1.6rem] sm:mb-[2rem] flex items-center gap-[1rem]">
                                    <span className="w-[.8rem] h-[.8rem] rounded-full bg-primary inline-block"></span>
                                    {cate.group}
                                </h3>

                                {/* 스킬 리스트 */}
                                <div className="flex flex-wrap gap-[0.8rem] sm:gap-[1rem]">
                                    {cate.items.map((item, itemIdx) => (
                                        <span
                                            key={itemIdx}
                                            className="px-[1.2rem] sm:px-[1.4rem] py-[0.6rem] sm:py-[.8rem] rounded-[.8rem] bg-neutral-800/60 text-neutral-200 text-[1.3rem] sm:text-[1.4rem] font-medium border border-neutral-700/50 hover:border-primary/50 hover:text-primary transition-all duration-200"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}