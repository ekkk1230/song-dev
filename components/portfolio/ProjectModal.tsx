'use client'

import { useState, useEffect } from 'react'
import { type WorkItem } from "@/lib/portfolio-data"

interface ProjectModalProps {
    item: WorkItem | null;
    onClose: () => void;
}

export function ProjectModal({ item, onClose }: ProjectModalProps) {
    const [activeMedia, setActiveMedia] = useState<{ id: number; src: string | null; label: string; desc: string, customHeight?: string } | null>(null);

    useEffect(() => {
        if (item) {
            document.body.style.overflow = 'hidden';
            if (item.details?.images && item.details.images.length > 0) {
                setActiveMedia(item.details.images[0]);
            } else {
                setActiveMedia(null);
            }
        } else {
            document.body.style.overflow = 'unset';
            setActiveMedia(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [item]);

    if (!item) return null;

    // 유튜브(비디오) 링크인지 판별하는 함수
    const isVideo = (src: string | null) => {
        if (!src) return false;
        return src.includes('youtube.com') || src.includes('youtu.be');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-[1rem] sm:p-[1.5rem] md:p-[2rem]">
            
            {/* 배경 */}
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            />

            {/* 팝업 콘텐츠 박스 */}
            <div className="relative z-10 w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-[1.6rem] md:rounded-[2rem] border border-border bg-card p-[1.6rem] sm:p-[2.4rem] md:p-[3rem] shadow-2xl custom-scrollbar">
                
                {/* 상단 헤더 */}
                <div className="flex items-start justify-between gap-[1rem] border-b border-border/60 pb-[1.2rem] md:pb-[1.5rem]">
                    <div>
                        <h3 className="font-heading text-[1.6rem] sm:text-[1.8rem] md:text-[2.2rem] font-bold leading-tight">
                            {item.name}
                        </h3>
                        <p className="mt-[0.4rem] font-mono text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] text-primary">
                            Architecture & Details Overview
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="rounded-full border border-border p-[0.6rem] md:p-[0.75rem] text-muted hover:border-primary transition-colors"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </div>

                {/* 상세 본문 내용 */}
                <div className="mt-[1.6rem] md:mt-[2rem] space-y-[1.6rem] md:space-y-[2rem]">
                    
                    {/* 프로젝트 개요 */}
                    <div>
                        <h4 className="font-mono text-[1.2rem] sm:text-[1.3rem] font-semibold text-neutral-400 mb-[0.6rem] md:mb-[0.75rem]"># 프로젝트 개요</h4>
                        <p className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.6rem] leading-relaxed break-keep text-neutral-200">
                            {item.description}
                        </p>
                        {item.details?.summary && (
                            <p className="mt-[0.8rem] text-[1.1rem] sm:text-[1.2rem] text-neutral-400 leading-relaxed">
                                {item.details.summary}
                            </p>
                        )}
                    </div>

                    {/* 사용 기술 스택 */}
                    <div>
                        <h4 className="font-mono text-[1.2rem] sm:text-[1.3rem] font-semibold text-neutral-400 mb-[0.6rem] md:mb-[0.75rem]"># 사용 기술 (Tech Stack)</h4>
                        <div className="flex flex-wrap gap-[0.5rem]">
                            {item.stack.map((s, idx) => (
                                <span key={idx} className="rounded-full border border-border px-[0.9rem] py-[0.3rem] md:px-[1rem] md:py-[0.4rem] font-mono text-[0.85rem] md:text-[0.9rem] bg-background/50 text-neutral-300">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 썸네일 & 큰 미디어 뷰어 영역 */}
                    {item.details?.images && item.details.images.length > 0 && (
                        <div className="space-y-[1.2rem] md:space-y-[1.5rem] pt-[1rem] border-t border-border/60">
                            <h4 className="font-mono text-[1.2rem] sm:text-[1.3rem] text-neutral-400"># 아키텍처 및 미디어 쇼케이스</h4>
                            
                            {/* 1. 큰 메인 뷰어 */}
                            <div className="relative w-full aspect-video rounded-[1.2rem] md:rounded-[1.5rem] border border-border bg-background overflow-hidden">
                                <div className="w-full h-full flex overflow-y-auto justify-center">
                                    {activeMedia?.src ? (
                                        isVideo(activeMedia.src) ? (
                                            <iframe 
                                                src={activeMedia.src} 
                                                title={activeMedia.label || "프로젝트 미디어"} 
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                allowFullScreen
                                            />
                                        ) : (
                                            <img 
                                                src={activeMedia.src} 
                                                alt={activeMedia.label} 
                                                className={`transition-all duration-300 block mx-auto object-contain ${activeMedia.customHeight ? activeMedia.customHeight : 'w-full h-full'}`}
                                            />
                                        )
                                    ) : (
                                        <p className="text-muted text-[1.1rem]">표시할 미디어가 없습니다.</p>
                                    )}
                                </div>
                            </div>

                            {/* 현재 선택된 미디어의 라벨 및 설명 */}
                            {activeMedia && (
                                <div className="px-[0.2rem]">
                                    <h5 className="font-bold text-[1.4rem] md:text-[1.6rem] text-white">{activeMedia.label}</h5>
                                    <p className="mt-[0.2rem] text-[1.1rem] md:text-[1.2rem] text-neutral-400">{activeMedia.desc}</p>
                                </div>
                            )}

                            {/* 2. 하단 작은 썸네일 목록 리스트 */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-[0.8rem] md:gap-[1rem]">
                                {item.details.images.map((img) => {
                                    const isSelected = activeMedia?.id === img.id;
                                    return (
                                        <div
                                            key={img.id}
                                            onClick={() => setActiveMedia(img)}
                                            className={`group relative aspect-video rounded-[0.8rem] md:rounded-[1rem] border overflow-hidden cursor-pointer transition-all duration-200 ${
                                                isSelected ? 'border-primary ring-2 ring-primary/50 scale-[1.02]' : 'border-border hover:border-primary/50 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            {img.src ? (
                                                isVideo(img.src) ? (
                                                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center font-mono text-[0.8rem] text-primary">
                                                        ▶ VIDEO
                                                    </div>
                                                ) : (
                                                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                                                )
                                            ) : (
                                                <div className="w-full h-full bg-background flex items-center justify-center text-[0.8rem] text-muted">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-[0.4rem] py-[0.15rem] text-[0.9rem] md:text-[1rem] text-white truncate">
                                                {img.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </div>

                {/* 하단 확인 버튼 */}
                <div className="mt-[2.4rem] md:mt-[3rem] pt-[1.2rem] md:pt-[1.5rem] border-t border-border/60 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-full bg-primary px-[1.6rem] py-[0.8rem] md:px-[2rem] md:py-[1rem] font-mono text-[1.4rem] md:text-[1.6rem] font-bold text-black hover:opacity-90 transition-opacity"
                    >
                        확인
                    </button>
                </div>

            </div>
        </div>
    )
}