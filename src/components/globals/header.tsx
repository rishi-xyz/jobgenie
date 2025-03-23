import React from "react";
import { Button } from "../ui/button";
import {
    PenBox,
    LayoutDashboard,
    FileText,
    GraduationCap,
    ChevronDown,
    StarsIcon,
    BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import Image from "next/image";

export default async function Header() {
    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-violet-600 bg-clip-text">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    <span className="text-transparent font-bold text-2xl">JobGenie</span>
                </Link>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="hidden md:inline-flex items-center gap-2"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Industry Insights
                        </Button>
                        <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                            <LayoutDashboard className="h-4 w-4" />
                        </Button>
                    </Link>

                    {/* Growth Tools Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <StarsIcon className="h-4 w-4" />
                                <span className="hidden md:block">Growth Tools</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link href="/resume" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Build Resume
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/ai-cover-letter"
                                    className="flex items-center gap-2"
                                >
                                    <PenBox className="h-4 w-4" />
                                    Cover Letter
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/interview" className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4" />
                                    Interview Prep
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    );
}