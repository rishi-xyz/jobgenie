import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Heroimg from "@/public/heroimg.png"
import Link from "next/link";

export const MarketingHero = () => {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10" />
            <div
                className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 animate-pulse"
                style={{ animationDuration: "8s" }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl animate-in slide-in-from-left-10 duration-700">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-red-600 to-violet-600 bg-clip-text text-transparent">
                            Your AI Career Coach for Professional Success
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Personalized career guidance, interview preparation, and industry insights powered by advanced AI to
                            help you achieve your career goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={"/dashboard"}>
                                <Button size="lg" className="group cursor-pointer">
                                    Get Started Free
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="cursor-pointer">
                                See How It Works
                            </Button>
                        </div>
                        <div className="mt-8 flex items-center text-sm text-muted-foreground">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                            No credit card required
                            <span className="mx-2">•</span>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                            14-day free trial
                        </div>
                    </div>
                    <div className="relative animate-in slide-in-from-right-10 duration-700">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl m-10">
                            <Image
                                src={Heroimg}
                                alt="AI Career Coach Dashboard"
                                width={150}
                                height={150}
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div
                            className="absolute -bottom-6 -left-6 transform rotate-3 p-4 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg shadow-lg animate-bounce"
                            style={{ animationDuration: "3s" }}
                        >
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="font-medium text-primary">Interview success rate +75%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 