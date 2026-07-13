'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { skills } from '@/lib/portfolio-data'

const marqueeItems = skills.map(g => g.items);

export function Skills() {
    const root = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            gsap.from('[data-skill-head]', {
                y: 40,
                opacity: 0,
                duration: .8,
                stagger: .1,
                ease: 'power3.out',
                scrollTrigger: { trigger: root.current, start: 'top 80%' },
            })

            gsap.from('[data-skill-group]', {
                y: 50,
                opacity: 0,
                duration: .8,
                stagger: .12,
                ease: 'power3.out',
                scrollTrigger: { trigger: '[data-skill-grid]', start: 'top 80%' },
            })

            const track = root.current?.querySelector('[data-marquee-track]')
            if (track) {
                gsap.to(track, {
                    xPercent: -50,
                    duration: 50,
                    ease: 'none',
                    repeat: -1,
                })
            }
        },
        { scope: root },
    )

    return (
        <section id="skills" ref={root} className="overflow-hidden py-28 md:py-40">
            <div className="mx-auto max-w-6xl px-6">
                <p
                    data-skill-head
                    className="mb-4 font-mono text-sm tracking-widest text-primary"
                >
                    (04) — SKILLS & STACK
                </p> 

                <div
                    data-skill-grid
                    className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                {skills.map((group) => (
                    <div
                        key={group.group}
                        data-skill-group
                        data-cursor-hover
                        className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                    >
                        <h3 className="font-mono text-xs tracking-widest text-primary">
                            {group.group.toUpperCase()}
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {group.items.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-3 text-sm text-foreground/80 transition-colors group-hover:text-foreground"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                                {item}
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </div>
            </div>

            <div className="mt-20 flex select-none overflow-hidden border-y border-border py-6">
                <div data-marquee-track className="flex shrink-0">
                {[0, 1].map((dup) => (
                    <ul
                    key={dup}
                    aria-hidden={dup === 1}
                    className="flex shrink-0 items-center"
                    >
                    {marqueeItems.map((item, i) => {
                        const displayItem = item.toString().replaceAll(',', ' ');

                        return(
                            <li
                            key={`${dup}-${item}-${i}`}
                                className="flex items-center font-heading text-3xl font-medium text-foreground/40 md:text-5xl"
                            >
                                <span className="px-8">{displayItem}</span>
                                <span className="text-primary">/</span>
                            </li>
                        )
                        })}
                    </ul>
                ))}
                </div>
            </div>
        </section>
    )
}