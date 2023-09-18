export default function LayoutAuth({ children }: any) {
    return (
        <section className="flex h-screen w-screen">
            <div className="w-full tablet:w-1/2 laptop:w-[760px] util-flex-col-center">
                {children}
            </div>
            <div className="hidden tablet:block flex-1 bg-primary--light"></div>
        </section>
    )
}
