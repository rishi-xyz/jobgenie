import Header from "@/src/components/globals/header";
import Providers from "@/src/provider/session-provider";
import React from "react";

type PlatformLayoutProps = {
    children: React.ReactNode
}

const PlatformLayout = async ({ children }: PlatformLayoutProps) => {
    return (
        <Providers>
            <Header />
            <div className="container mx-auto mt-24 mb-20">
                {children}
            </div>
        </Providers>
    );
};

export default PlatformLayout;