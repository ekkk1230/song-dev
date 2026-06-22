'use client'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Cursor } from "@/components/portfolio/cursor"
import { ScrollProgress } from "@/components/portfolio/scrollProgress"
import { SiteNav } from "@/components/portfolio/site-nav"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Page() {
  return (
		<main className="relative">
			<Cursor />
			<ScrollProgress />
			<SiteNav />
			<Hero />
			<About />
		</main>
  )
}