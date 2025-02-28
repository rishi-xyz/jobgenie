"use client";

import { BrainCircuit, Menu, X } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../globals/themeSwitcher";

export const MarketingHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-violet-600 bg-clip-text">
                            <BrainCircuit className="h-8 w-8 text-primary" />
                            <span className="text-transparent font-bold text-2xl">JobGenie</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-sm font-medium hover:text-orange-600 transition-colors">
                            Features
                        </Link>
                        <Link href="#testimonials" className="text-sm font-medium hover:text-orange-600 transition-colors">
                            Testimonials
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-orange-600 transition-colors">
                            Pricing
                        </Link>
                        <Link href="#contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
                            Contact
                        </Link>
                        <Button variant="outline" className="ml-4">
                            Log in
                        </Button>
                        <Button>Sign up</Button>
                        <ThemeSwitcher />
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 animate-in slide-in-from-top-5 duration-300">
                        <div className="flex flex-col space-y-4 pb-4">
                            <Link
                                href="#features"
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#testimonials"
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Testimonials
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="#contact"
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <div className="flex space-x-4 pt-2">
                                <Button variant="outline" className="flex-1">
                                    Log in
                                </Button>
                                <Button className="flex-1">
                                    Sign up
                                </Button>
                            </div>
                            <ThemeSwitcher />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}