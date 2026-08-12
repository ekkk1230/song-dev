'use client'
import React from 'react';
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"
import { Section } from "../ui/Section"
import { SectionTitle } from "../ui/SectionTitle"
import { ProjectArchive } from './ProjectAchieve'; 

// 1. 프로젝트 비주얼 그래픽 컴포넌트
function ProjectVisual({ variant }: { variant: Project['variant'] }) {
    if (variant === 'dashboard') {
        return (
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-[0.75rem] p-[1.5rem]">
                <div className="col-span-2 row-span-2 rounded-[0.5rem] border border-border bg-background/60" />
                <div className="rounded-[0.5rem] border border-border bg-primary/15" />
                <div className="rounded-[0.5rem] border border-border bg-background/60" />
                <div className="rounded-[0.5rem] border border-border bg-background/60" />
                <div className="col-span-2 rounded-[0.5rem] border border-border bg-background/60" />
            </div>
        )
    }

    if (variant === 'accessibility') {
        return (
            <div className="flex h-full flex-col justify-center gap-[1rem] p-[2rem]">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-[0.75rem] rounded-[0.5rem] border p-[0.75rem] ${
                            i === 1
                            ? 'border-primary ring-[0.125rem] ring-primary/50'
                            : 'border-border'
                        }`}
                    >
                        <span className={`h-[1rem] w-[1rem] rounded-full ${
                            i === 1 ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <span className="h-[0.5rem] flex-1 rounded-full bg-muted"></span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex h-full items-end gap-[0.75rem] p-[2rem]">
            {[40, 70, 30, 90, 55, 75].map((h, i) => (
                <div
                    key={i}
                    data-bar
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t-[0.375rem] bg-primary/70"
                ></div>
            ))}
        </div>
    )
}

// 2. 개별 프로젝트 행 컴포넌트
function ProjectRow({ project, idx }: { project: Project; idx: number }) {
    const root = useRef<HTMLElement>(null);
    const reversed = idx % 2 === 1;

    useGSAP(
        () => {
            gsap.from('[data-reveal]', {
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: { 
                    trigger: root.current, 
                    start: 'top 75%', 
                    toggleActions: 'play reverse play reverse' 
                },
            })

            gsap.from('[data-visual]', {
                clipPath: 'inset(0 100% 0 0)',
                duration: 1,
                ease: 'power4.inOut',
                scrollTrigger: { 
                    trigger: root.current, 
                    start: 'top 70%', 
                    toggleActions: 'play reverse play reverse' 
                },
            })

            const bars = root.current?.querySelectorAll('[data-bar]')
            if (bars && bars.length > 0) {
                gsap.from(bars, {
                    scaleY: 0,
                    transformOrigin: 'bottom',
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: { 
                        trigger: root.current, 
                        start: 'top 65%', 
                        toggleActions: 'play reverse play reverse' 
                    },
                })
            }
        },
        { scope: root },
    )

    return (
        <article
            ref={root}
            className="grid items-center gap-[2.4rem] md:gap-[4rem] border-t border-border py-[3.2rem] sm:py-[4rem] md:py-[6rem] md:grid-cols-2"
        >
            {/* 좌우 지그재그 시각화 영역 */}
            <div
                data-visual
                data-cursor-hover
                className={`group relative aspect-[4/3] overflow-hidden rounded-[1.4rem] md:rounded-[1.6rem] border border-border bg-card transition-transform duration-500 hover:scale-[1.02] ${
                    reversed ? 'md:order-2' : ''
                }`}
            >
                <ProjectVisual variant={project.variant} />
                <span className="pointer-events-none absolute right-[1.25rem] top-[1.25rem] font-heading text-[3.2rem] md:text-[3.75rem] font-bold text-neutral-700/20">
                    {project.index}
                </span>
            </div>

            {/* 텍스트 및 하이라이트 설명 영역 */}
            <div className={reversed ? 'md:order-1' : ''}>
                <div data-reveal className="flex items-center gap-[1rem]">
                    <span className="font-mono text-[1.2rem] sm:text-[1.3rem] md:text-[1.5rem] text-primary">
                        {project.category}
                    </span>
                    <span className="h-[0.0625rem] flex-1 bg-border"></span>
                </div>

                <h3 
                    data-reveal
                    className="mt-[1rem] md:mt-[1.25rem] font-heading text-[2rem] sm:text-[2.2rem] md:text-[2.25rem] font-semibold leading-tight break-keep"
                >
                    {project.title}
                </h3>

                <p
                    data-reveal
                    className="mt-[0.8rem] md:mt-[1rem] leading-relaxed break-keep text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] text-neutral-300"
                >
                    {project.description}
                </p>

                <ul data-reveal className="mt-[1.2rem] md:mt-[1.5rem] space-y-[0.5rem]">
                    {project.highlights.map((h, hIdx) => (
                        <li
                            key={hIdx}
                            className="flex gap-[0.75rem] text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] leading-relaxed break-keep text-neutral-200"
                        >
                            <ArrowUpRight className="mt-[0.4rem] h-[1.5rem] w-[1.5rem] md:h-[1.6rem] md:w-[1.6rem] shrink-0 text-primary" />
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>

                <ul data-reveal className="mt-[1.5rem] md:mt-[1.75rem] flex flex-wrap gap-[0.5rem]">
                    {project.stack.map((tech) => (
                        <li
                            key={tech}
                            className="rounded-full border border-border px-[0.75rem] py-[0.25rem] font-mono text-[1.1rem] sm:text-[1.2rem] text-muted-foreground"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}

// 3. 최종 Achievements 메인 섹션 수출 컴포넌트
export function Achievements() {
    const head = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('[data-work-head]', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: head.current, start: 'top 85%' },
            })
        },
        { scope: head },
    )

    return (
        <Section id="achievements" ref={sectionRef}>
            <div ref={contentRef} className="content-wrap space-y-[2rem]">
                <SectionTitle
                    number="03"
                    category="ACHIEVEMENTS"
                    title="Engineering Impact & Proven Results"
                    subtitle="기술적 깊이와 사용자 경험의 조화로 만들어낸 실무 성과와 프로덕트 아카이브입니다."
                />
            </div>

            <div className="content-wrap mt-[2rem] sm:mt-[3rem] md:mt-[5rem]">
                {projects.map((project, idx) => (
                    <ProjectRow key={project.id} project={project} idx={idx} />
                ))}
            </div>

            <ProjectArchive />
        </Section>
    )
}