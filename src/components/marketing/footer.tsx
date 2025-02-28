import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const MarketingFooter = () => {
    return (
        <footer className="bg-muted py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <BrainCircuit className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">JobGenie</span>
                        </Link>
                        <p className="text-muted-foreground mb-4 max-w-xs">
                            AI-powered career guidance to help you achieve your professional goals.
                        </p>
                        <div className="flex space-x-4">
                            {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                                <Button key={social} variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                                    <span className="sr-only">{social}</span>
                                    <div className="h-4 w-4 bg-foreground rounded-full" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            {["Features", "Pricing", "Testimonials", "FAQ"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {["About", "Blog", "Careers", "Press"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-center -center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JobGenie. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}