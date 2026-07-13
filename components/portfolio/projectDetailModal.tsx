'use client'

import { useState } from 'react'
import { WorkItem } from "@/lib/portfolio-data";

export function ProjectDetailModal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
    // 상세 데이터가 없을 경우 방어 코드
    if (!item.details) return null;

    // 상세 데이터의 첫 번째 유효한 이미지를 기본값으로 설정
    const [activeImage, setActiveImage] = useState(
        item.details.images.find(img => img.src)?.src || ""
    );

    // 미디어 타입 판별 함수 (확장자 기반)
    const isVideo = (src: string) => src.match(/\.(mp4|webm|mov)$/i);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 배경 오버레이 */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            
            {/* 모달 컨테이너 */}
            <article className="relative w-full max-w-6xl h-[700px] overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a1a] shadow-2xl flex animate-in fade-in zoom-in duration-300">
                
                {/* 왼쪽: 시각 자료 & 이미지 정보 */}
                <div className="w-[45%] p-8 bg-black/20 border-r border-white/5 flex flex-col gap-6 overflow-y-auto">
                    {/* 2x2 이미지 그리드 */}
                    <div className="grid grid-cols-2 gap-4">
                        {item.details.images.map((img) => {
                            const hasMedia = !!img.src;
                            const isV = hasMedia && isVideo(img.src);

                            return (
                                <div
                                    key={img.id}
                                    onMouseEnter={() => hasMedia && setActiveImage(img.src)}
                                    className={`group cursor-pointer rounded-xl border-2 overflow-hidden transition-all hover:scale-105 ${
                                        activeImage === img.src ? 'border-primary shadow-lg' : 'border-transparent'
                                    }`}
                                >
                                    {hasMedia ? (
                                        isV ? (
                                            <video 
                                                src={img.src} 
                                                className="w-full h-32 object-cover bg-muted/20" 
                                                muted 
                                                playsInline
                                                autoPlay
                                                loop
                                            />
                                        ) : (
                                            <img 
                                                src={img.src} 
                                                alt={img.label} 
                                                className="w-full h-32 object-cover bg-muted/20" 
                                            />
                                        )
                                    ) : (
                                        <div className="w-full h-32 flex items-center justify-center bg-white/5 text-[10px] text-white/30 border border-dashed border-white/10">
                                            준비 중
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 오른쪽: 메인 프리뷰 & 상세 정보 */}
                <div className="w-[55%] flex flex-col overflow-y-auto">
                    {/* 메인 프리뷰 영역 */}
                    <div className="w-full h-[320px] bg-black/40 flex items-center justify-center border-b border-white/10 relative">
                        {activeImage ? (
                            isVideo(activeImage) ? (
                                <video
                                    key={activeImage}
                                    src={activeImage}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-contain p-2"
                                />
                            ) : (
                                <img 
                                    key={activeImage}
                                    src={activeImage} 
                                    alt="Main view"
                                    className="w-full h-full object-contain p-2"
                                />
                            )
                        ) : (
                            <div className="text-white/20 text-sm">이미지를 선택해주세요</div>
                        )}
                    </div>

                    {/* 정보 영역 */}
                    <div className="flex flex-col p-10">
                        <button 
                            onClick={onClose} 
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                        
                        <h2 className="font-heading text-3xl font-bold text-white">{item.name}</h2>
                        <p className="mt-4 text-white/60 leading-relaxed">{item.description}</p>

                        {/* 강조된 핵심 성과 */}
                        <div className="my-[1rem] p-[1rem] bg-white/[0.03] rounded-xl border border-white/10 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                            <span className="text-[1.1rem] font-bold text-primary uppercase flex items-center gap-2">핵심 성과</span>
                            <p className="mt-[.6rem] text-sm text-white/90 font-medium leading-relaxed">{item.details.result}</p>
                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                        </div>

                        {/* 이미지 정보 리스트 */}
                        <div className="grid grid-cols-2 gap-3 mb-[2rem]">
                            {item.details.images.map((img) => (
                                <div key={img.id} className="p-3 bg-white/5 rounded-md border border-white/5">
                                    <p className="text-[1rem] font-bold text-primary">{img.label}</p>
                                    <p className="mt-1 text-[.8rem] text-white/60">{img.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        {/* 스택 태그 */}
                        <div className="flex flex-wrap gap-2">
                            {item.stack.map(s => (
                                <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 font-mono">
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* 상세 설명 */}
                        <div className="mt-10 pt-10 border-t border-white/10">
                            <h3 className="text-xl font-bold text-white">{item.details.title}</h3>
                            <p className="mt-2 text-primary italic text-sm">{item.details.summary}</p>
                            
                            <ul className="mt-6 space-y-3 mb-6">
                                {item.details.overview.map((point, idx) => (
                                    <li key={idx} className="text-sm text-white/70 flex items-start">
                                        <span className="mr-2 text-primary">•</span> {point}
                                    </li>
                                ))}
                            </ul>

                            {item.details.certifications && (
                                item.details.certifications.map(cert => (
                                    <div className="mt-3 flex flex-col gap-1 p-2 bg-white/5 rounded border border-white/10 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-white/90 font-bold">{cert.name}</span>
                                            <span className="text-primary font-mono">{cert.year}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}