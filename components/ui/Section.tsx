export function Section({ id, children, ref }: { id: string; children: React.ReactNode; ref?: React.Ref<HTMLElement> }) {
    return (
        <section 
            id={id} 
            ref={ref} 
            className="px-[2.4rem] md:px-[4rem] py-[8rem] md:py-[12rem] max-w-[102.4rem] mx-auto text-white w-full"
        >
            {children}
        </section>
    );
}