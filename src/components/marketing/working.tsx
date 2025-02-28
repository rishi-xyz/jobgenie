export const MarketingWorking = () => {
    return (
        <section className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How JobGenie Works</h2>
                    <p className="text-xl text-muted-foreground">
                        Our AI-powered platform analyzes your skills, experience, and goals to provide personalized career
                        guidance.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {[
                        {
                            step: "1",
                            title: "Create Your Profile",
                            description: "Input your skills, experience, and career goals to get started.",
                        },
                        {
                            step: "2",
                            title: "Get AI Analysis",
                            description: "Our AI analyzes your profile and provides personalized recommendations.",
                        },
                        {
                            step: "3",
                            title: "Advance Your Career",
                            description: "Use our tools and guidance to achieve your professional goals.",
                        },
                    ].map((item, index) => (
                        <div
                            key={item.step}
                            className="flex flex-col items-center text-center animate-in fade-in duration-700"
                            style={{ animationDelay: `${index * 200}ms` }}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                                <span className="text-xl font-bold text-primary">{item.step}</span>
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-75"
                                    style={{ animationDuration: "3s" }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}