'use client'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Achievements } from "@/components/portfolio/Achievements"
import { Skills } from "@/components/portfolio/Skills"
import { Outro } from "@/components/portfolio/Outro" 

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Page() {
  return (
		<main className="relative overflow-x-hidden">
			<Hero />
			<About />
			<Skills />
			<Achievements />
			<Outro />
		</main>
  )
}