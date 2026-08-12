interface SectionTitleProps {
    number: string;
    category: string;
    title: string | React.ReactNode;
    subtitle?: string;
}

export function SectionTitle({ number, category, title, subtitle }: SectionTitleProps) {
    return (
        <div>
            {/* 상단 번호 및 카테고리 */}
            <span className="font-mono text-[1.1rem] md:text-[1.3rem] tracking-[0.2em] text-primary block mb-[1rem] md:mb-[1.2rem]">
                {number} / {category}
            </span>
            
            {/* 메인 타이틀 & 서브타이틀 */}
            <h2 className="text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] font-bold tracking-tight leading-[1.3] mb-[1.6rem] md:mb-[4rem]">
                {title}
                {subtitle && (
                    <>
                        <br />
                        <span className="text-neutral-400 font-normal text-[1.8rem] sm:text-[2.2rem] md:text-[3.2rem] block md:inline mt-[0.4rem] md:mt-0">
                            {subtitle}
                        </span>
                    </>
                )}
            </h2>
        </div>
    )
}