'use client'

import { useState } from 'react'
import { WorkItem } from "@/lib/portfolio-data";

// 15개의 색상 배열 (테스트용)
const colors = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
    'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500'
];

export function ProjectDetailModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
    const [activeColor, setActiveColor] = useState(colors[0]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            
            <article className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl flex animate-in fade-in zoom-in duration-300">
                
                {/* 왼쪽: 갤러리 영역 (3x5 그리드) */}
                <div className="p-8 bg-card border-r border-border w-[45%]">
                    <div className="grid grid-cols-5 gap-3">
                        {colors.map((color, idx) => (
                            <div 
                                key={idx}
                                onMouseEnter={() => setActiveColor(color)}
                                className={`aspect-square cursor-pointer rounded-xl border-2 transition-all hover:scale-105 ${color} ${activeColor === color ? 'border-white shadow-lg' : 'border-transparent'}`}
                            >
                                <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white/50">
                                    {idx + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 오른쪽: 크게 보이는 프리뷰 & 정보 */}
                <div className="flex flex-col bg-secondary/20 w-[55%]">
                    {/* 크게 보이는 프리뷰 영역 (색상 변경됨) */}
                    <div className={`aspect-video w-full ${activeColor} flex items-center justify-center border-b border-border transition-colors duration-300`}>
                        <span className="text-white font-bold opacity-50">Preview Area</span>
                    </div>

                    {/* 정보 영역 */}
                    <div className="flex flex-1 flex-col p-8">
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground hover:bg-black/10 rounded-full transition-all"
                        >
                            ✕
                        </button>
                        
                        <h2 className="font-heading text-2xl font-bold">{item.name}</h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                        
                        <div className="mt-6 flex flex-wrap gap-2">
                            {item.stack.map(s => (
                                <span key={s} className="px-3 py-1 rounded-full bg-background border border-border text-xs font-mono">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}