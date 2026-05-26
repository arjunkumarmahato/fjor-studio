"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./capabilities.module.scss";

export default function CapabilitiesSplit() {
    const containerRef = useRef<HTMLDivElement>(null);
    const techMaskRef = useRef<HTMLParagraphElement>(null);
    const luxuryMaskRef = useRef<HTMLParagraphElement>(null);

    const techText = "Our focus is the visualization of technical perfection. We transform dense code frameworks, multi-agent AI ecosystems, and decentralized networks into intuitive, high-performance interfaces. By engineering fluid motion and real-time WebGL environments, we clarify your absolute value to institutional investors and enterprise partners.";
    const luxuryText = "Our focus is sensory preservation in the browser. We translate the emotional weight of architectural spaces, bespoke apparel, and premium hospitality into cinematic narratives. Through custom scroll mechanics, editorial typography, and intentional pacing, we curate digital destinations that perfectly mirror the physical prestige of your brand.";

    useGSAP(() => {
        // Scrub the Tech text clip-path
        gsap.fromTo(techMaskRef.current, 
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
                scrollTrigger: {
                    trigger: techMaskRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: true
                }
            }
        );

        // Scrub the Luxury text clip-path
        gsap.fromTo(luxuryMaskRef.current, 
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
                scrollTrigger: {
                    trigger: luxuryMaskRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: true
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.capabilitiesSection} id="capabilities-section">
            <div className={styles.container}>
                
                {/* Column 01: Tech Focus */}
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <span className={styles.monoLabel}>[ COLUMN 01: MATERIALIZING PRECISION ]</span>
                    </div>
                    <div className={styles.scrubContainer}>
                        <p className={styles.textGray}>{techText}</p>
                        <p ref={techMaskRef} className={styles.textWhite}>{techText}</p>
                    </div>
                </div>

                {/* Column 02: Luxury Focus */}
                <div className={styles.column}>
                    <div className={styles.columnHeader}>
                        <span className={styles.monoLabel}>[ COLUMN 02: PRESERVING ATMOSPHERE ]</span>
                    </div>
                    <div className={styles.scrubContainer}>
                        <p className={styles.textGray}>{luxuryText}</p>
                        <p ref={luxuryMaskRef} className={styles.textWhite}>{luxuryText}</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
