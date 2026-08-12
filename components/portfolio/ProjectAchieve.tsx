'use client'

import { useState, useRef } from 'react'
import { projectGroups, type WorkItem } from "@/lib/portfolio-data"
import { ProjectModal } from './ProjectModal';

export function ProjectArchive() {
    const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);

    return (
        <div className="mt-[4rem] sm:mt-[5rem] border-t border-border pt-[3rem] sm:pt-[4rem] md:mt-[8rem] md:pt-[6rem]">
            
            {/* 팝업 안내 문구 */}
            <div className="mb-[2rem] md:mb-[3rem]">
                <p className="text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] text-muted break-keep flex items-center gap-[0.5rem]">
                    <span className="inline-block h-[0.45rem] w-[0.45rem] rounded-full bg-primary shrink-0" />
                    카드를 클릭하시면 아키텍처 개요 및 상세 미디어 팝업을 확인하실 수 있습니다.
                </p>
            </div>

            {/* 1. 회사 프로젝트 그룹 */}
            <div className="mb-[3.2rem] sm:mb-[4rem] md:mb-[5rem]">
                <h4 className="font-mono text-[1rem] md:text-[1.15rem] text-muted tracking-wider mb-[1.2rem] md:mb-[1.5rem] flex items-center gap-[0.5rem] md:gap-[0.75rem]">
                    <span className="text-primary font-bold">#</span> 
                    <span className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] font-semibold text-white">{projectGroups.company.label} ({projectGroups.company.sub})</span>
                </h4>
                <div className="grid grid-cols-1 gap-[1.2rem] sm:gap-[1.5rem] md:grid-cols-3 md:gap-[2rem]" style={{ perspective: '1000px' }}>
                    {projectGroups.company.items.map((item, idx) => (
                        <TiltSpotlightCard key={idx} item={item} onSelect={setSelectedItem} />
                    ))}
                </div>
            </div>

            {/* 2. 개인 프로젝트 그룹 */}
            <div>
                <h4 className="font-mono text-[1rem] md:text-[1.15rem] text-muted tracking-wider mb-[1.2rem] md:mb-[1.5rem] flex items-center gap-[0.5rem] md:gap-[0.75rem]">
                    <span className="text-primary font-bold">#</span> 
                    <span className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] font-semibold text-white">{projectGroups.personal.label} ({projectGroups.personal.sub})</span>
                </h4>
                <div className="grid grid-cols-1 gap-[1.2rem] sm:gap-[1.5rem] md:grid-cols-3 md:gap-[2rem]" style={{ perspective: '1000px' }}>
                    {projectGroups.personal.items.map((item, idx) => (
                        <TiltSpotlightCard key={idx} item={item} onSelect={setSelectedItem} />
                    ))}
                </div>
            </div>

            {/* 상세 미디어 팝업 컴포넌트 렌더링 */}
            <ProjectModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            
        </div>
    )
}

// 3D 틸트 + 스포트라이트 카드 컴포넌트
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
            className="group relative flex flex-col justify-between rounded-[1.4rem] md:rounded-[1.5rem] border border-border bg-card p-[1.5rem] sm:p-[1.75rem] md:p-[2.25rem] cursor-pointer overflow-hidden transition-transform duration-100 ease-out will-change-transform shadow-lg hover:border-primary/50"
        >
            <div 
                className="pointer-events-none absolute -inset-px rounded-[1.4rem] md:rounded-[1.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(250, 204, 21, 0.12), transparent 40%)"
                }}
            />

            <div className="relative z-10">
                <h5 className="font-heading text-[1.25rem] sm:text-[1.35rem] md:min-h-[4rem] md:text-[1.6rem] font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {item.name}
                </h5>
                <p className="mt-[0.8rem] md:mt-[1.25rem] text-[1.2rem] md:text-[1.4rem] leading-relaxed text-muted break-keep line-clamp-3">
                    {item.description}
                </p>
            </div>

            <div className="relative z-10 mt-[1.4rem] sm:mt-[1.75rem] md:mt-[2.5rem] pt-[1rem] sm:pt-[1.25rem] md:pt-[1.5rem] border-t border-border/60 flex flex-wrap gap-[0.4rem] sm:gap-[0.5rem]">
                {item.stack.map((s, sIdx) => (
                    <span key={sIdx} className="rounded-full border border-border px-[0.6rem] sm:px-[0.75rem] py-[0.25rem] sm:py-[0.3rem] font-mono text-[0.9rem] sm:text-[1rem] bg-background/30 text-neutral-300">
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}