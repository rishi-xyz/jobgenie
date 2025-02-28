import { plans } from "@/src/lib/plans";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export const MarketingPricing = () => {
    return (
        <section id="pricing" className="py-20 md:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-muted-foreground">Choose the plan that's right for your career goals.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative bg-card rounded-xl p-8 shadow-sm border ${plan.popular ? "border-2 border-primary shadow-md" : "border-border"
                                } hover:shadow-lg transition-all duration-300 animate-in fade-in duration-700`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-violet-600 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-muted-foreground mb-6">{plan.description}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground"> {plan.period}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                className={`w-full ${plan.popular ? "" : "bg-card hover:bg-card/80 text-card-foreground"}`}
                                variant={plan.popular ? "default" : "outline"}
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}