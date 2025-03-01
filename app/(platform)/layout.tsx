import React from "react";

type PlatformLayoutProps = {
    children: React.ReactNode
}

const PlatformLayout = async ({ children }: PlatformLayoutProps) => {
    return (
        <div className="container mx-auto mt-24 mb-20">
            {children}
        </div>
    );
};

export default PlatformLayout;