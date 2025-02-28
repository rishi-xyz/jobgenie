import Image from "next/image";

import { testimonials } from "@/src/lib/testimonials";
import { Star } from "lucide-react";

export const MarketingTestimonials = () => {
    return (
        <section id="testimonials" className="py-20 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-xl text-muted-foreground">
                        Join thousands of professionals who have advanced their careers with JobGenie.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.name}
                            className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300 animate-in fade-in duration-700"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center mb-4">
                                <div>
                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-muted-foreground">{testimonial.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}