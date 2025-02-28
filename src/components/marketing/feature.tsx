import { features } from "@/src/lib/features";

export const MarketingFeatures = () => {
    return (
        <section id="features" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features for Your Career Growth</h2>
                    <p className="text-xl text-muted-foreground">
                        Our AI-powered platform provides everything you need to advance your career and achieve your
                        professional goals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-border"
                        >
                            <div className="animate-in fade-in duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                                {feature.icon}
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}