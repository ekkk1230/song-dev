'use client'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Cursor } from "@/components/portfolio/cursor"
import { ScrollProgress } from "@/components/portfolio/scrollProgress"
import { SiteNav } from "@/components/portfolio/site-nav"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Achievements } from "@/components/portfolio/Achievements"
import { Experience } from "@/components/portfolio/experience"
import { Skills } from "@/components/portfolio/Skills"
import { Contact } from "@/components/portfolio/contact"
import { WavyBackground } from "@/components/ui/wavy-background"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Page() {
  return (
		<main className="relative">
			<Hero />
			<About />
			<Skills />
			<Achievements />

			{/* <Cursor />
			<ScrollProgress />
			<SiteNav />
			
			<About />
			<Achievements />
			<Experience />
			<Contact /> */}
		</main>
  )
}