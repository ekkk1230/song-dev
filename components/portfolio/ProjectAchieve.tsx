'use client'

import { useRef } from 'react'
import { projectGroups, type WorkItem } from "@/lib/portfolio-data"

interface ProjectArchiveProps {
    onSelect: (item: WorkItem) => void;
}

export function ProjectArchive({ onSelect }: ProjectArchiveProps) {
    return (
        <div className="mt-[6rem] border-t border-border pt-[4rem] md:mt-[8rem] md:pt-[6rem]">
            
            {/* 팝업 인터랙션 안내 문구 */}
            <div className="mb-[2.5rem] md:mb-[3rem]">
                <p className="text-[1.125rem] md:text-[1.3rem] text-muted break-keep flex items-center gap-[0.5rem]">
                    <span className="inline-block h-[0.45rem] w-[0.45rem] rounded-full bg-primary shrink-0" />
                    카드를 클릭하시면 아키텍처 개요 및 상세 미디어 팝업을 확인하실 수 있습니다. (카드에 마우스를 올려보세요!)
                </p>
            </div>

            {/* 1. 회사 프로젝트 그룹 */}
            <div className="mb-[4rem] md:mb-[5rem]">
                <h4 className="font-mono text-[1rem] md:text-[1.15rem] text-muted tracking-wider mb-[1.5rem] flex items-center gap-[0.5rem] md:gap-[0.75rem]">
                    <span className="text-primary font-bold">#</span> 
                    <span className="text-foreground/80 text-[1.4rem] md:text-[1.6rem] font-semibold">{projectGroups.company.label} ({projectGroups.company.sub})</span>
                </h4>
                <div className="grid gap-[1.5rem] md:grid-cols-3 md:gap-[2rem]" style={{ perspective: '1000px' }}>
                    {projectGroups.company.items.map((item, idx) => (
                        <TiltSpotlightCard key={idx} item={item} onSelect={onSelect} />
                    ))}
                </div>
            </div>

            {/* 2. 개인 프로젝트 그룹 */}
            <div>
                <h4 className="font-mono text-[1rem] md:text-[1.15rem] text-muted tracking-wider mb-[1.5rem] flex items-center gap-[0.5rem] md:gap-[0.75rem]">
                    <span className="text-primary font-bold">#</span> 
                    <span className="text-foreground/80 text-[1.4rem] md:text-[1.6rem] font-semibold">{projectGroups.personal.label} ({projectGroups.personal.sub})</span>
                </h4>
                <div className="grid gap-[1.5rem] md:grid-cols-3 md:gap-[2rem]" style={{ perspective: '1000px' }}>
                    {projectGroups.personal.items.map((item, idx) => (
                        <TiltSpotlightCard key={idx} item={item} onSelect={onSelect} />
                    ))}
                </div>
            </div>
            
        </div>
    )
}

function TiltSpotlightCard({ item, onSelect }: { item: WorkItem; onSelect: (item: WorkItem) => void }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const centerX = x / width - 0.5;
        const centerY = y / height - 0.5;

        const rotateX = centerY * -15; 
        const rotateY = centerX * 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(item)}
            className="group relative flex flex-col justify-between rounded-[1.5rem] border border-border bg-card p-[1.75rem] md:p-[2.25rem] cursor-pointer overflow-hidden transition-transform duration-100 ease-out will-change-transform shadow-lg hover:border-primary/50"
        >
            <div 
                className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(250, 204, 21, 0.12), transparent 40%)"
                }}
            />

            <div className="relative z-10">
                <h5 className="font-heading text-[1.35rem] md:text-[1.6rem] font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                </h5>
                <p className="mt-[1rem] md:mt-[1.25rem] text-[1rem] md:text-[1.125rem] leading-relaxed text-muted break-keep line-clamp-3">
                    {item.description}
                </p>
            </div>

            <div className="relative z-10 mt-[1.75rem] md:mt-[2.5rem] pt-[1.25rem] md:pt-[1.5rem] border-t border-border/60 flex flex-wrap gap-[0.5rem]">
                {item.stack.map((s, sIdx) => (
                    <span key={sIdx} className="rounded-full border border-border px-[0.75rem] py-[0.3rem] font-mono text-[0.8rem] md:text-[0.875rem] text-muted bg-background/30">
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}