"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./hero.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger);

declare global {
    interface Window {
        __loaderFinished?: boolean;
    }
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaBoxRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const titleLinesRef = useRef<HTMLDivElement[]>([]);
    const outerFadeRefs = useRef<HTMLSpanElement[]>([]);
    const designFadeRef = useRef<HTMLSpanElement>(null);
    const [loaderFinished, setLoaderFinished] = useState(false);

    useEffect(() => {
        const loader = document.getElementById("entry-loader");
        if (window.__loaderFinished || !loader) {
            setLoaderFinished(true);
        } else {
            const handleLoaderFinished = () => setLoaderFinished(true);
            window.addEventListener("loaderFinished", handleLoaderFinished);

            return () => window.removeEventListener("loaderFinished", handleLoaderFinished);
        }
    }, []);

    useGSAP(() => {
        if (!loaderFinished) return;
        if (!placeholderRef.current || !mediaBoxRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                ScrollTrigger.refresh();
            }
        });

        // 1. Staggered Title Reveal
        if (titleLinesRef.current.length > 0) {
            tl.from(titleLinesRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.6,
                stagger: 0.15,
                ease: "power4.out"
            });
        }

        // 2. Scroll Animation Sequence
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
                refreshPriority: 10
            }
        });

        // Fade out the text nodes smoothly ("A DIGITAL" and "STUDIO" fade in unison, "DESIGN" is slightly staggered)
        // Duration increased to 0.75 so they fade completely exactly when the video has grown 25% (0.6s move + 0.15s grow)
        if (outerFadeRefs.current.length > 0) {
            scrollTl.to(outerFadeRefs.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.inOut"
            }, 0);
        }

        if (designFadeRef.current) {
            scrollTl.to(designFadeRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.inOut"
            }, 0.050);
        }

        const scrollLine = containerRef.current.querySelector(`.${styles.scrollLine}`);
        const scrollIcon = containerRef.current.querySelector(`.${styles.scrollIcon}`);
        if (scrollLine) {
            gsap.set(scrollLine, { transformOrigin: "bottom center" });
            scrollTl.to(scrollLine, { scaleY: 0, duration: 0.4, ease: "power2.inOut" }, 0);
        }
        if (scrollIcon) {
            scrollTl.to(scrollIcon, { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0);
        }

        // Move video to the exact center of the screen
        scrollTl.to(mediaBoxRef.current, {
            x: () => {
                const pBox = placeholderRef.current!.getBoundingClientRect();
                const cBox = containerRef.current!.getBoundingClientRect();
                return (cBox.width / 2) - (pBox.left - cBox.left);
            },
            y: () => {
                const pBox = placeholderRef.current!.getBoundingClientRect();
                const cBox = containerRef.current!.getBoundingClientRect();
                return (cBox.height / 2) - (pBox.top - cBox.top);
            },
            xPercent: -50,
            yPercent: -50,
            duration: 0.6,
            ease: "power2.inOut"
        }, 0);

        // Expand the video symmetrically from its new center
        scrollTl.to(mediaBoxRef.current, {
            width: "calc(100vw - 18px)",
            height: "calc(100vh - 18px)",
            borderRadius: "8px",
            duration: 0.6,
            ease: "power2.inOut"
        }, ">");

    }, { dependencies: [loaderFinished], scope: containerRef });

    const addToTitleRefs = (el: HTMLDivElement | null) => {
        if (el && !titleLinesRef.current.includes(el)) {
            titleLinesRef.current.push(el);
        }
    };

    const addToOuterFadeRefs = (el: HTMLSpanElement | null) => {
        if (el && !outerFadeRefs.current.includes(el)) {
            outerFadeRefs.current.push(el);
        }
    };

    return (
        <main ref={containerRef} className={`section-detector ${styles.hero}`} id="hero" data-section-index="00" data-section-name="Home">
            <div className={styles.content}>
                <h1 className={styles.title} aria-label="A digital design studio">

                    <div ref={addToTitleRefs} aria-hidden="true" data-text="a-digital" className={styles.titleLine}>
                        <span ref={addToOuterFadeRefs} className={styles.scrollFade}>A DIGITAL</span>
                    </div>

                    <div ref={addToTitleRefs} aria-hidden="true" data-text="design" className={`${styles.titleLine} ${styles.creativeLine}`}>
                        <span ref={designFadeRef} className={styles.scrollFade}>DESIGN</span>

                        <div ref={placeholderRef} className={styles.mediaBoxPlaceholder} aria-hidden="true">
                            <div ref={mediaBoxRef} className={styles.mediaBox}>
                                <video src="/showreel.mp4" poster="/silvr-highlight-poster.webp" autoPlay loop muted playsInline />
                            </div>
                        </div>
                    </div>

                    <div ref={addToTitleRefs} aria-hidden="true" data-text="studio" className={styles.titleLine}>
                        <span ref={addToOuterFadeRefs} className={styles.scrollFade}>STUDIO</span>
                    </div>

                </h1>
            </div>

            <div className={styles.scrollIndicator}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-yellow)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.scrollIcon}>
                    <circle cx="12" cy="12" r="4" />
                </svg>
                <div className={styles.scrollLine} />
            </div>
        </main>
    );
}