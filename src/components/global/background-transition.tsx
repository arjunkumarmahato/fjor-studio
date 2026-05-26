"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./background-transition.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Defined the Mux videos mapped to section names (based on observation and standard IDs)
const sectionVideos: Record<string, string> = {
    "hero": "https://stream.mux.com/Z02DKxTDFK3IuRBMPa4sqOaOTxiE00kPZcjQZ00Kj2EUxM/medium.mp4", // Organic glowing abstract double-loop fluid mesh background video
    "about": "", // Removed video showing above/behind About
    "what_we_do": "https://stream.mux.com/uKkmm51HPsTGQzUqQMxVUV8eI01BykKYUGKvFALbiP7U/medium.mp4",
    "showcase": "", // Empty uses background-color: var(--brand-yellow)
    "team": "", // Empty uses background-color: var(--brand-dark-blue)
    "awards": "", // #d2e4f4
    "press": "", // var(--brand-dark-blue)
    "footer": "https://stream.mux.com/uKkmm51HPsTGQzUqQMxVUV8eI01BykKYUGKvFALbiP7U/medium.mp4"
};

const sectionColors: Record<string, string> = {
    "showcase": "var(--brand-yellow)",
    "team": "var(--brand-dark-blue)",
    "awards": "#d2e4f4",
    "press": "var(--brand-dark-blue)",
    "footer": "transparent"
};

export default function BackgroundTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const addToRefs = (id: string) => (el: HTMLDivElement | null) => {
        wrapperRefs.current[id] = el;
    };

    useGSAP(() => {
        const sections = document.querySelectorAll(".section-detector");
        if (sections.length === 0) return;

        const triggers: ScrollTrigger[] = [];

        // Hide all initially except hero
        Object.values(wrapperRefs.current).forEach(wrapper => {
            if (wrapper && wrapper.getAttribute('data-id') !== 'hero') {
                gsap.set(wrapper, { opacity: 0 });
            }
        });

        sections.forEach((section) => {
            const id = section.id || section.getAttribute("data-section-id") || "hero";
            
            const st = ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => {
                    const targetWrapper = wrapperRefs.current[id];
                    if (targetWrapper) {
                        gsap.to(targetWrapper, { opacity: 1, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
                    }
                    
                    // Fade out others
                    Object.entries(wrapperRefs.current).forEach(([key, wrapper]) => {
                        if (key !== id && wrapper) {
                            gsap.to(wrapper, { opacity: 0, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
                        }
                    });
                },
                onEnterBack: () => {
                    const targetWrapper = wrapperRefs.current[id];
                    if (targetWrapper) {
                        gsap.to(targetWrapper, { opacity: 1, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
                    }
                    
                    // Fade out others
                    Object.entries(wrapperRefs.current).forEach(([key, wrapper]) => {
                        if (key !== id && wrapper) {
                            gsap.to(wrapper, { opacity: 0, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
                        }
                    });
                }
            });
            triggers.push(st);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={styles.backgroundTransition}>
            {Object.keys(sectionVideos).map(key => (
                <div 
                    key={key} 
                    data-id={key}
                    ref={addToRefs(key)} 
                    className={`${styles.videoWrapper} ${styles[`videoWrapper_${key}`] || ''}`}
                    style={{ backgroundColor: sectionColors[key] || 'transparent' }}
                >
                    {sectionVideos[key] && (
                        <div className={styles.mediaLayer}>
                            <video autoPlay loop muted playsInline src={sectionVideos[key]} />
                        </div>
                    )}
                    <div className={styles.noiseOverlay} aria-hidden="true"></div>
                    {key === 'footer' && <div className={styles.overlay} aria-hidden="true"></div>}
                </div>
            ))}
        </div>
    );
}
