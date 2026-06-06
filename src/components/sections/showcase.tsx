"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./showcase.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
    num: string;
    title: string;
    img: string;
    roles: string[];
    link?: string;
}

const projects: ProjectItem[] = [
    {
        num: "01",
        title: "Soneva",
        img: "/images/soneva.png",
        roles: ["ART DIRECTION", "BRAND DESIGN", "UI/UX", "WEB DESIGN"]
    },
    {
        num: "02",
        title: "Heavys",
        img: "/images/heavys.png",
        roles: ["ART DIRECTION", "WEB DESIGN", "UI/UX", "BRAND DESIGN"],
    },
    {
        num: "03",
        title: "K72",
        img: "/images/k72.png",
        roles: ["REBUILD", "CREATIVE DIRECTION", "WEB DESIGN"],
    },
    {
        num: "04",
        title: "Belleza",
        img: "/images/belleza.png",
        roles: ["BRAND IDENTITY", "UI/UX", "WEB DESIGN"],
    }
];

export default function WebGLShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sideGalleryRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
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

    const scrollToProject = (idx: number) => {
        const blocks = containerRef.current?.querySelectorAll(`.${styles.projectBlock}`);
        if (blocks && blocks[idx]) {
            blocks[idx].scrollIntoView({ behavior: "smooth" });
        }
    };

    useGSAP(() => {
        if (!loaderFinished) return;
        const container = containerRef.current;
        const sideGallery = sideGalleryRef.current;
        if (!container) return;

        const blocks = gsap.utils.toArray<HTMLElement>(`.${styles.projectBlock}`);
        if (blocks.length === 0) return;

        // 1. Simple card reveal triggers
        blocks.forEach((block, idx) => {
            const img = block.querySelector(`.${styles.canvasPlaceholderImage}`);
            const titles = block.querySelectorAll(`.${styles.titleLineInner}`);
            const roles = block.querySelectorAll(`.${styles.serviceRole}`);

            // Initialize visual states (hidden)
            gsap.set(img, { scale: 1.12, opacity: 0 });
            gsap.set(titles, { yPercent: 105 });
            gsap.set(roles, { opacity: 0, y: 15 });

            // Create ScrollTrigger timeline for card reveal
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: block,
                    start: "top 75%",
                    toggleActions: "play none none none",
                    once: true,
                    invalidateOnRefresh: true,
                    refreshPriority: 1
                }
            });

            tl.to(img, {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            })
                .to(titles, {
                    yPercent: 0,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: "power4.out"
                }, "-=0.9")
                .to(roles, {
                    opacity: 0.8,
                    y: 0,
                    stagger: 0.04,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.7");

            // 2. Active Index Scroll Trigger
            ScrollTrigger.create({
                trigger: block,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => setActiveIndex(idx),
                onEnterBack: () => setActiveIndex(idx),
                invalidateOnRefresh: true,
                refreshPriority: 1
            });
        });

        // 3. Pin the side gallery when showcase enters viewport (top top) until it exits viewport (bottom bottom)
        if (sideGallery) {
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                pin: sideGallery,
                pinSpacing: false, // sits absolutely, so no spacer spacing is needed
                invalidateOnRefresh: true,
                refreshPriority: 1
            });

            // Force ScrollTrigger refresh once setup is complete
            ScrollTrigger.refresh();
        }
    }, { dependencies: [loaderFinished], scope: containerRef });

    return (
        <section ref={containerRef} className={`section-detector ${styles.sectionDetector}`} id="showcase" data-section-index="02" data-section-name="Featured work">
            <div className="sectionLabel">FEATURED WORK</div>
            <div id="webgl-showcase-section" style={{ position: "absolute", top: 0, left: 0 }} />
            <div className={styles.showcase}>
                {projects.map((proj, idx) => {
                    const lines = proj.title.split('\n');
                    return (
                        <div key={idx} className={styles.projectBlock}>
                            <div className={styles.showcaseContent}>

                                {/* Left Column: Name & Services/Roles Column Group */}
                                <div className={styles.showcaseServicesProvided}>
                                    <div className={styles.showcaseNames}>
                                        <h3 className={styles.showcaseNamesName}>
                                            {lines.map((line, i) => (
                                                <div key={i} className={styles.titleLineOuter}>
                                                    <div className={styles.titleLineInner}>
                                                        {line}
                                                    </div>
                                                </div>
                                            ))}
                                        </h3>
                                    </div>
                                    <div className={styles.showcaseServicesProvidedServices}>
                                        <div className={styles.servicesLine}>
                                            {proj.roles.map((role, i) => (
                                                <span key={i} className={styles.serviceRole}>{role}</span>
                                            ))}
                                        </div>
                                    </div>
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.liveLinkBtn}
                                        >
                                            VISIT SITE
                                            <span className={styles.liveArrowWrapper}>
                                                <svg
                                                    className={styles.liveArrow}
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5 9H16M11 4L16 9L11 14"
                                                        stroke="currentColor"
                                                        strokeWidth="1.2"
                                                        strokeLinecap="square"
                                                        strokeLinejoin="miter"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    )}
                                </div>

                                {/* Center Column: Cinematic Image */}
                                {proj.link ? (
                                    <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.showcaseThumbnails}
                                        style={{ pointerEvents: "auto", cursor: "pointer" }}
                                    >
                                        <div className={styles.showcaseThumbnailsThumbnail}>
                                            <div className={styles.showcaseThumbnailsDom}>
                                                <img
                                                    src={proj.img}
                                                    alt={proj.title.replace('\n', ' ')}
                                                    className={styles.canvasPlaceholderImage}
                                                />
                                            </div>
                                        </div>
                                    </a>
                                ) : (
                                    <div className={styles.showcaseThumbnails}>
                                        <div className={styles.showcaseThumbnailsThumbnail}>
                                            <div className={styles.showcaseThumbnailsDom}>
                                                <img
                                                    src={proj.img}
                                                    alt={proj.title.replace('\n', ' ')}
                                                    className={styles.canvasPlaceholderImage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    );
                })}

                {/* Global Pinned Side Gallery Indicator */}
                <div ref={sideGalleryRef} className={styles.showcaseSliderIndicator}>
                    <div className={styles.showcaseSliderIndicatorSlides}>
                        {projects.map((p, pIdx) => (
                            <div
                                key={pIdx}
                                className={`${styles.showcaseSliderIndicatorSlidesSlide} ${pIdx === activeIndex ? styles.activeSlide : ""
                                    }`}
                                onClick={() => scrollToProject(pIdx)}
                            >
                                <img src={p.img} alt={p.title.replace('\n', ' ')} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Center: View All Projects button */}
                <div className={styles.showcaseFooter}>
                    <a href="#projects" className={styles.viewAllBtn}>
                        VIEW ALL PROJECTS
                        <span className={styles.arrowWrapper}>
                            <svg
                                className={`${styles.chatArrow} ${styles.arrow1}`}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 9H16M11 4L16 9L11 14"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                />
                            </svg>
                            <svg
                                className={`${styles.chatArrow} ${styles.arrow2}`}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 9H16M11 4L16 9L11 14"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                />
                            </svg>
                        </span>
                    </a>
                </div>

            </div>
        </section>
    );
}
