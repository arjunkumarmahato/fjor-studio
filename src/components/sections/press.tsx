"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LinkEffect from "../global/link-effect";
import styles from "./press.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface PressItem {
    outlet: string;
    topic: string;
    date: string;
    url: string;
    img: string;
}

const pressItems: PressItem[] = [
    {
        outlet: "L'OFFICIEL",
        topic: "Bespoke CGI Visualizations Spotlight",
        date: "MAR 2026",
        url: "https://www.lofficiel.com",
        img: "/images/rose.jpg"
    },
    {
        outlet: "TED TALK",
        topic: "The Collision of CGI Art & Technology",
        date: "JAN 2026",
        url: "https://ted.com",
        img: "/images/img2.jpg"
    },
    {
        outlet: "BITI'S",
        topic: "Rebranding a Cultural Icon Campaign",
        date: "NOV 2025",
        url: "https://bitis.com.vn",
        img: "/images/img1.jpg"
    },
    {
        outlet: "NOWNESS",
        topic: "Directing Digital Flagships Documentary",
        date: "AUG 2025",
        url: "https://nowness.com",
        img: "/images/rose.jpg"
    },
    {
        outlet: "MIXMAG",
        topic: "VJ Performance Systems & Spatial Audio",
        date: "MAY 2025",
        url: "https://mixmag.net",
        img: "/images/img2.jpg"
    },
    {
        outlet: "3D FOR DESIGNERS",
        topic: "Fluid CGI Tutorials & Concept Curators",
        date: "FEB 2025",
        url: "https://3dfordesigners.com",
        img: "/images/img1.jpg"
    },
    {
        outlet: "GIRLSCLUB ASIA",
        topic: "Female CGI Artists Empowering Community",
        date: "DEC 2024",
        url: "https://girlsclub.asia",
        img: "/images/rose.jpg"
    },
    {
        outlet: "TEDX SALON",
        topic: "Next Gen Interactive Experiences Tech Talk",
        date: "OCT 2024",
        url: "https://ted.com",
        img: "/images/img2.jpg"
    }
];

export default function PressLinks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Reveal Section Index
        if (indexRef.current) {
            gsap.fromTo(indexRef.current, 
                { opacity: 0, x: -30 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }

        // Stagger list items reveal
        if (listRef.current) {
            const items = listRef.current.children;
            gsap.fromTo(items,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={`section-detector ${styles.pressSection}`} id="press" data-section-index="07" data-section-name="Press">
            <div className={styles.container}>
                
                <div ref={indexRef} className={styles.sectionIndex}>
                    <span className={styles.indexNum}>7</span>
                    <span className={styles.indexDash}>—</span>
                    <span className={styles.indexName}>Press</span>
                </div>

                <div ref={listRef} className={styles.pressList}>
                    {pressItems.map((item, index) => {
                        const isHovered = index === hoveredIndex;
                        const isAnyHovered = hoveredIndex !== null;
                        const isSiblingHovered = isAnyHovered && !isHovered;

                        return (
                            <a 
                                key={item.outlet}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.pressRow} ${isSiblingHovered ? styles.rowMuted : ""} ${isHovered ? styles.rowActive : ""}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className={styles.outletCol}>
                                    <div className={`${styles.thumbnailWrapper} ${isHovered ? styles.activeThumbnail : ""}`}>
                                        <img src={item.img} alt={item.outlet} />
                                    </div>
                                    <LinkEffect className={styles.outletName}>{item.outlet}</LinkEffect>
                                </div>
                                <div className={styles.topicCol}>
                                    <span className={styles.topicName}>{item.topic}</span>
                                </div>
                                <div className={styles.dateCol}>
                                    <span className={styles.dateStamp}>{item.date}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
