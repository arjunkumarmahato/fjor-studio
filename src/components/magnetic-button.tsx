"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: React.ReactNode;
}

export default function MagneticButton({ children }: MagneticButtonProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        // GSAP quickTo optimizes rapid coordinate updates using GPU
        const xTo = gsap.quickTo(element, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            
            // Calculate mouse coordinate relative to the button's center
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            // Scale down movement range to prevent extreme translations
            const pullX = (clientX - centerX) * 0.35;
            const pullY = (clientY - centerY) * 0.35;

            xTo(pullX);
            yTo(pullY);
        };

        const handleMouseLeave = () => {
            // Snap back on leave
            gsap.to(element, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ display: "inline-block" }}>
            {children}
        </div>
    );
}
