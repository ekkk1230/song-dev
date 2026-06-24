'use client'

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { projects, type Project } from "@/lib/portfolio-data"

function ProjectVisual({ variant }: { variant: Project['variant'] }) {
    if (variant === 'dashboard') {
        return (
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-3 p-6">
                <div className="col-span-2 row-span-2 rounded-lg border border-border bg-background/60" />
                <div className="rounded-lg border border-border bg-primary/15" />
                <div className="rounded-lg border border-border bg-background/60" />
                <div className="rounded-lg border border-border bg-background/60" />
                <div className="col-span-2 rounded-lg border border-border bg-background/60" />
            </div>
        )
    }

    if (variant === 'accessibility') {
        return (
            <div className="flex h-full flex-col justify-center gap-4 p-8">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-3 rounded-lg border p-3 ${
                            i === 1
                            ? 'border-primary ring-2 ring-primary/50'
                            : 'border-border'
                        }`}
                    >
                        <span className={`h-4 w-4 rounded-full ${
                            i === 1 ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <span className="h-2 flex-1 rounded-full bg-muted"></span>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex h-full items-end gap-3 p-8">
            {[40, 70, 30, 90, 55, 75].map((h, i) => (
                <div
                    key={i}
                    data-bar
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t-md bg-primary/70"
                ></div>
            ))}
        </div>
    )
}

function ProjectRow({ project, idx }: { project: Project; idx: number }) {
    const root = useRef<HTMLElement>(null);
    const reversed = idx % 2 === 1;

    useGSAP(
        () => {
            gsap.from('[data-reveal]', {
                y: 60,
                opacity: 0,
                duration: .9,
                stagger: .08,
                ease: 'power3.out',
                scrollTrigger: { trigger: root.current, start: 'top 75%', toggleActions: 'play reverse play reverse' },
            })

            gsap.from('[data-visual]', {
                clipPath: 'inset(0 100% 0 0)',
                duration: 1,
                ease: 'power4.inOut',
                scrollTrigger: { trigger: root.current, start: 'top 70%', toggleActions: 'play reverse play reverse' },
            })

            const bars = root.current?.querySelectorAll('[data-bar]')
            if (bars && bars.length > 0) {
                gsap.from(bars, {
                    scaleY: 0,
                    transformOrigin: 'bottom',
                    duration: .8,
                    stagger: .08,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: root.current, start: 'top 65%', toggleActions: 'play reverse play reverse' },
                })
            }
        },
        { scope: root },
    )

    return (
        <article
            ref={root}
            className="grid items-center gap-10 border-t border-border py-16 md:grid-cols-2 md:gap-16 md:py-24"
        >
            <div
                data-visual
                data-cursor-hover
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-500 hover:scale-[1.02] ${
                    reversed ? 'md:order-2' : ''
                }`}
            >
                <ProjectVisual variant={project.variant} />
                <span className="pointer-events-none absolute right-5 top-5 font-heading text-6xl font-bold text-foreground/10">
                    {project.index}
                </span>
            </div>

            <div className={reversed ? 'md:order-1' : ''}>
                <div data-reveal className="flex items-center gpa-4">
                    <span className="font-mono text-xs tracking-widset text-primary">
                        {project.category}
                    </span>
                    <span className="h-px flex-1 bg-border"></span>
                    <span className="font-mono text-xs text-muted-foreground">
                        
                    </span>
                </div>

                <h3 
                    data-reveal
                    className="mt-5 font-heading text-3xl font-semibold leading-tight break-keep text-foreground md:text-4xl"
                >
                    {project.title}
                </h3>

                <p
                    data-reveal
                    className="mt-4 max-w-md text-pretty leading-relaxed break-keep text-muted-foreground"
                >
                {project.description}
                </p>

                <ul data-reveal className="mt-6 space-y-2">
                {project.highlights.map((h) => (
                    <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed break-keep text-foreground/80"
                    >
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{h}</span>
                    </li>
                ))}
                </ul>

                <ul data-reveal className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                    <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                    >
                    {tech}
                    </li>
                ))}
                </ul>
            </div>
        </article>
    )
}

export function Achievements() {
    const head = useRef<HTMLDivElement>(null)

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
        <section id="achievements" className="px-6 py-28 md:py-40">
            <div className="mx-auto max-w-6xl">
                <div ref={head}>
                <p
                    data-work-head
                    className="mb-4 font-mono text-sm tracking-widest text-primary"
                >
                    (02) — KEY ACHIEVEMENTS · 주요 성과
                </p>
                <h2
                    data-work-head
                    className="max-w-3xl font-heading text-4xl font-semibold leading-tight break-keep text-foreground md:text-6xl"
                >
                    화면 뒤의 데이터까지<br /> 책임지는 작업물
                </h2>
                </div>

                <div className="mt-12 md:mt-20">
                {projects.map((project, idx) => (
                    <ProjectRow key={project.id} project={project} idx={idx} />
                ))}
                </div>
            </div>
        </section>
    )
}