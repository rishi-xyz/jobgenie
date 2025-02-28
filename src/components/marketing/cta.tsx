import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const MarketingCta = () => {
    return (
        <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
            <div
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"
                style={{ animationDuration: "8s" }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Advance Your Career?</h2>
                        <p className="text-xl text-muted-foreground">
                            Join thousands of professionals who have transformed their careers with JobGenie.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="group">
                            Start Free Trial
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Schedule a Demo
                        </Button>
                    </div>
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        No credit card required. 14-day free trial. Cancel anytime.
                    </div>
                </div>
            </div>
        </section>
    );
}