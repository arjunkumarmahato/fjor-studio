"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ScanlineOverlay from "./scanline-overlay";
import NumberTicker from "./number-ticker";

import styles from "./entry-loader.module.scss";

// Extend window interface for global state
declare global {
    interface Window {
        __loaderFinished?: boolean;
    }
}

interface EntryLoaderProps {
    onFinished: () => void;
}

export default function EntryLoader({ onFinished }: EntryLoaderProps) {
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0);

    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLoad = () => setIsReady(true);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 10) {
                    clearInterval(interval);
                    return 10;
                }
                return prev + 1;
            });
        }, 600);
        return () => clearInterval(interval);
    }, [isReady]);

    useGSAP(() => {
        if (!isReady) return;

        // EXIT SEQUENCE (Premium Fade Dissolve)
        if (progress === 10) {
            const tl = gsap.timeline({
                onStart: () => {
                    // Set global flag to prevent hydration race conditions
                    window.__loaderFinished = true;
                    // Dispatch loaderFinished instantly at transition start to synchronize homepage animations
                    window.dispatchEvent(new Event("loaderFinished"));
                },
                onComplete: () => {
                    onFinished();
                },
                delay: 0.5
            });

            // Dissolve the loader smoothly using an ultra-premium power4 easing curve
            tl.to(loaderRef.current, {
                opacity: 0,
                duration: 1.5,
                ease: "power4.inOut",
            });
        }
    }, { dependencies: [progress, isReady], scope: loaderRef });

    return (
        <div ref={loaderRef} id="entry-loader" className={styles.loader}>
            <NumberTicker progress={progress} />
            <ScanlineOverlay />
        </div>
    );
}
