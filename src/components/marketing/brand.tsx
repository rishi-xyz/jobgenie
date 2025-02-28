export const MarketingBrands = () => {
    return (
        <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-medium text-muted-foreground mb-6">TRUSTED BY PROFESSIONALS FROM</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                    {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((brand) => (
                        <div key={brand} className="flex items-center">
                            <span className="text-xl font-bold">{brand}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}