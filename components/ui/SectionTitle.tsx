interface SectionTitleProps {
    number: string;
    category: string;
    title: string | React.ReactNode;
    subtitle?: string;
}

export function SectionTitle({ number, category, title, subtitle }: SectionTitleProps) {
    return (
        <div>
            <span className="font-mono text-[1.3rem] tracking-[0.2em] text-primary block mb-[1.2rem]">
                {number} / {category}
            </span>
            <h2 className="text-[3.2rem] md:text-[4rem] font-bold tracking-tight leading-[1.3]">
                {title}
                {subtitle && (
                    <>
                        <br />
                        <span className="text-neutral-400 font-normal block md:inline">{subtitle}</span>
                    </>
                )}
            </h2>
        </div>
    )
}