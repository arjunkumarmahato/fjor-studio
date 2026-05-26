"use client";

import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import EntryLoader from "@/components/loader/entry-loader";
import Cursor from "@/components/cursor/cursor";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useGSAP(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenis.on("scroll", ScrollTrigger.update);
        
        const ticker = (time: number) => {
            lenis.raf(time * 1000);
        };
        
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        // Ensure background is locked to Vantablack
        gsap.set("body", { backgroundColor: "#040404" });

        return () => {
            gsap.ticker.remove(ticker);
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    });

    return (
        <>
            {isLoading && <EntryLoader onFinished={() => setIsLoading(false)} />}
            <Cursor />
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {children}
            </div>
        </>
    );
}
