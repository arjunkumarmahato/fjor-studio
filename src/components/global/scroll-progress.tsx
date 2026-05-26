"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./scroll-progress.module.scss";

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!progressRef.current) return;

        // Use a simple scroll event listener connected to GSAP's ticker for smooth updates
        // instead of a full ScrollTrigger instance just for the progress bar
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            
            gsap.set(progressRef.current, {
                scaleX: progress
            });
        };

        // Add to GSAP ticker for 60fps updates synced with other animations
        gsap.ticker.add(updateProgress);
        
        // Initial set
        updateProgress();

        return () => {
            gsap.ticker.remove(updateProgress);
        };
    }, []);

    return (
        <div className={styles.scrollProgress}>
            <div ref={progressRef} className={styles.progressBar} />
        </div>
    );
}
