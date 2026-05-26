"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./about.module.scss";

gsap.registerPlugin(ScrollTrigger);

const wordsList = ["Commanding", "attention.", "rewarding", "interaction."];
// Create a full sentence for Googlebot and Screen Readers.
const readableText = wordsList.join(" ");

export default function AboutSection() {
    const containerRef = useRef<HTMLElement>(null);

    const linesRef = useRef<HTMLSpanElement[]>([]);

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
        if (!containerRef.current) return;

        // Set initial state for all lines (hidden below boundaries)
        gsap.set(linesRef.current, {
            y: "105%",
            opacity: 0
        });

        // Trigger stagger reveal once as soon as the top of the section reaches 25% of viewport height from the top
        gsap.to(linesRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 25%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
                refreshPriority: 1
            },
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out"
        });

    }, { dependencies: [loaderFinished], scope: containerRef });

    const addToLinesRef = (el: HTMLSpanElement | null, idx: number) => {
        if (el) {
            linesRef.current[idx] = el;
        }
    };

    return (
        <section ref={containerRef} className={`section-detector ${styles.aboutSection}`} id="about" data-section-index="01" data-section-name="About">
            <div className="sectionLabel">ABOUT</div>

            <div className={styles.primaryTitle}>
                {/* We use a semantic <p> tag with aria-label for the bot.
                  The visual spans are explicitly hidden from screen readers. 
                */}
                <p className={styles.centerContainer} aria-label={readableText}>
                    {wordsList.map((word, wordIdx) => {
                        const isEven = wordIdx % 2 === 0;
                        const alignClass = isEven ? styles.alignLeft : styles.alignRight;
                        
                        let imgUrl = null;
                        let placeAfter = false;

                        if (wordIdx === 1) {
                            imgUrl = "/images/attention.jpg";
                        } else if (wordIdx === 3) {
                            imgUrl = "/images/interaction.jpg";
                            placeAfter = true;
                        }

                        return (
                            <span key={wordIdx} className={`${styles.wordWrapper} ${alignClass}`} aria-hidden="true">
                                <span
                                    ref={(el) => addToLinesRef(el, wordIdx)}
                                    className={styles.lineText}
                                >
                                    {!placeAfter && imgUrl && (
                                        <img 
                                            src={imgUrl} 
                                            alt="" 
                                            className={styles.lineImage} 
                                        />
                                    )}
                                    {word}
                                    {placeAfter && imgUrl && (
                                        <img 
                                            src={imgUrl} 
                                            alt="" 
                                            className={`${styles.lineImage} ${styles.interactionImage}`} 
                                        />
                                    )}
                                </span>
                            </span>
                        );
                    })}
                </p>

            </div>
        </section>
    );
}
