'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { experience, education, projectGroups, type WorkItem } from '@/lib/portfolio-data' 
import { ProjectDetailModal } from './projectDetailModal'

type TabKey = 'personal' | 'company';

export function Experience() {
    const root = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState<TabKey>('personal');
    const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);

    const active = projectGroups[tab]

    useGSAP(
        () => {
            gsap.from('[data-exp-head]', {
                y: 40,
                opacity: 0,
                duration: .8,
                stagger: .1,
                ease: 'power3.out',
                scrollTrigger: { trigger: root.current, start: 'top 80%' },
            })

            gsap.from('[data-edu]', {
                y: 30,
                opacity: 0,
                duration: .7,
                stagger: .1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '[data-edu-list]', start: 'top 85%' },
            })
        },
        { scope: root },
    );

    useGSAP(
        () => {
            const cards = listRef.current?.querySelectorAll('[data-proj-card]')
            if (!cards || cards.length === 0) return
            gsap.fromTo(
                cards,
                { y: 32, opacity: 0, filter: 'blur(6px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: .6,
                    stagger: .08,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
                },
            )
        },
        { scope: root, dependencies: [tab] },
    );

    const tabs: { key: TabKey; label: string; count: number }[] = [
        { key: 'personal', label: projectGroups.personal.label, count: projectGroups.personal.items.length },
        { key: 'company', label: projectGroups.company.label, count: projectGroups.company.items.length },
    ];

    return (
        <section id="experience" ref={root} className="px-6 py28 md:py-40">
            <div className="mx-auto max-w-6xl">
                <p
                    data-work-head
                    className="mb-4 font-mono text-sm tracking-widest text-primary"
                >
                    (03) — EXPERIENCE · 참여 프로젝트
                </p>

                <p
                    data-exp-head
                    className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground"
                    >
                    {experience.company} · {experience.role} · {experience.period}
                </p>

                <div
                    data-exp-head
                    className='mt-10 inline-flex rounded-full border border-border bg-card p-1' 
                >
                    {tabs.map((t) => {
                        const selected = tab === t.key
                        return (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`relative rounded-full px-5 py-2.5 font-mono text-xs tracking-widest transition-colors md:text-sm ${
                                    selected
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted--foreground hover:text-foreground'
                                }`}
                            >
                                {t.label}
                                <span
                                className={`ml-2 ${selected ? 'text-primary-foreground/70' : 'text-muted-foreground/60'}`}
                                >
                                {String(t.count).padStart(2, '0')}
                                </span>
                            </button>
                        )
                    })}
                </div>

                <p className="mt-4 font-mono text-xs tracking-widest text-muted-foreground">
                {active.sub}
                </p>

                <div
                    ref={listRef}
                    key={tab}
                    className='mt-8 grid gap-5 md:grid-cols-2'
                >
                    {active.items.map((item, idx) => (
                        <div 
                            key={item.name}
                            onClick={() => setSelectedProject(item)}
                            className='cursor-pointer'
                        >
                            <ProjectCard item={item} index={idx} />
                        </div>
                    ))}
                </div>

                {selectedProject && (
                    <ProjectDetailModal item={selectedProject} onClose={() => setSelectedProject(null)} />
                )}


                <div data-edu-list className='mt-20'>
                    <p className='mb-6 font-mono text-xs text-muted-foreground'>
                        EDUCATION
                    </p>
                    <ul className='grid gap-5 md:grid-cols-2'>
                        {education.map((edu) => (
                            <li
                                key={edu.title}
                                data-edu
                                className='rounded-2xl border border-border bg-card p-6'
                            >
                                <h4 className='font-heading text-lg font-medium text-foreground'>
                                    {edu.title}
                                </h4>
                                <p className='mt-2 text-sm text-muted-foreground'>{edu.org}</p>
                                <p className='mt-1 font-mono text-xs text-primary'>
                                    {edu.period}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ item, index }: { item: WorkItem; index: number }) {
    return (
        <article
            data-proj-card
            className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/60 md:p-7'
        >
            <span className='pointer-events-none absolute -right-px -top-px font-mono text-5xl font-semibold text-foreground/[.04] transition-colors group-hover:text-primary/10 md:text-6xl'>
                {String(index + 1).padStart(2, '0')}
            </span>

            <div className='flex items-start justify-between gap-4'>
                <h3 className='font-heading text-xl font-semibold text-foreground md:text-2xl'>
                    {item.name}
                </h3>
            </div>

            <p className='mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground/75 break-keep'>{item.description}</p>

            <div className='mt-5 flex flex-wrap items-center gap-2'>
                {item.stack.map((s) => (
                    <span
                        key={s}
                        className='rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground'
                    >
                        {s}
                    </span>
                ))}
            </div>
        </article>
    )
}