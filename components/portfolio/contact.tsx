'use client'

import React from 'react';
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowUpRight } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { MagneticButton } from "./magnetic-button"

export function Contact() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from('[data-contact-line] [data-word]', {
                yPercent: 120,
                opacity: 0,
                duration: 1,
                stagger: .1,
                ease: 'power4.out',
                scrollTrigger: { trigger: root.current, start: 'top 70%' },
            })

            gsap.from('[data-contact-reveal]', {
                y: 30,
                opacity: 0,
                duration: .8,
                stagger: .1,
                ease: 'power3.out',
                scrollTrigger: { trigger: root.current, start: 'top 60%' },
            })
        },
        { scope: root }
    )

    return (
        <section 
            id="contact"
            ref={root}
            className="relative overflow-hidden px-6 py-28 md:py-40"
        >
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
            />
            <div className="mx-auto max-w-6xl text-center">
                <p
                    data-contact-reveal
                    className="mb-6 font-mono text-sm text-primary"
                >
                    (05) - CONTACT
                </p>

                <h2 className="font-heading text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-tight text-balance">
                    <span data-contact-line className="block overflow-hidden pb-2">
                        <span data-word className="inline-block text-foreground/30">함께</span>
                    </span>
                    <span data-contact-line className="block overflow-hidden pb-2">
                        <span data-word className="inline-block text-foreground">만들어요</span>
                        <span className="text-primary">.</span>
                    </span>
                </h2>

                <p
                    data-contact-reveal
                    className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
                >
                    새로운 제안을 기다리고 있습니다. 편하게 연락 주세요.
                </p>

                <div
                    data-contact-reveal
                    className="mt-12 flex flex-wrap items-center justify-center gap-4"
                >
                    <MagneticButton
                        href={`mailto:${profile.email}`}
                        className="rounded-full bg-primary px-8 py-4 font-mono text-sm font-medium text-primary-foreground"
                    >
                        {profile.email}
                    </MagneticButton>
                </div>

                <div
                    data-contact-reveal
                    className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                >
                    {profile.socials.map((social) => (
                        <a 
                            href={social.href}
                            key={social.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor-hover
                            className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {social.label}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-.5 group-hover:-translate-y-.5" />
                        </a>
                    ))}
                </div>
            </div>

            <footer className="mx-auto mt-28 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground sm:flex-row">
                <span>© {new Date().getFullYear()} {profile.name} · {profile.nameEn}</span>
                <span>{profile.location} · Built with Next.js + GSAP</span>
            </footer>
        </section>
    )
} 