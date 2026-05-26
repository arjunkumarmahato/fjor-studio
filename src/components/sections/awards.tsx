"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./awards.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface AwardItem {
    id: string;
    org: string;
    prize: string;
    project: string;
    year: string;
}

const awards: AwardItem[] = [
    {
        id: "a1",
        org: "CSS Design Awards",
        prize: "Best UI/UX / Innovation",
        project: "FJOR Studio",
        year: "2026"
    },
    {
        id: "a2",
        org: "The FWA",
        prize: "FWA of the Day Winner",
        project: "FJOR Studio portal",
        year: "2026"
    },
    {
        id: "a3",
        org: "Awwwards",
        prize: "Site of the Day Honors",
        project: "FJOR Studio",
        year: "2026"
    },
    {
        id: "a4",
        org: "Mindchatter Film",
        prize: "Best Visual Performance",
        project: "Night Goggles Project",
        year: "2025"
    },
    {
        id: "a5",
        org: "CGI World Awards",
        prize: "Best CGI Cinematography",
        project: "LOSS",
        year: "2024"
    }
];

export default function AwardsShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

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

    const toggleExpand = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <section ref={containerRef} className={`section-detector ${styles.awardsSection}`} id="awards" data-section-index="06" data-section-name="Awards">
            <div className={styles.container}>
                
                <div ref={indexRef} className={styles.sectionIndex}>
                    <span className={styles.indexNum}>6</span>
                    <span className={styles.indexDash}>—</span>
                    <span className={styles.indexName}>Awards</span>
                </div>

                <div ref={listRef} className={styles.awardsList}>
                    {awards.map((award) => {
                        const isExpanded = expandedId === award.id;
                        return (
                            <div 
                                key={award.id} 
                                className={`${styles.awardRow} ${isExpanded ? styles.expanded : ''}`}
                                onClick={() => toggleExpand(award.id)}
                            >
                                <div className={styles.rowHeader}>
                                    <div className={styles.orgWrap}>
                                        <h3 className={styles.orgName}>{award.org}</h3>
                                        <span className={styles.plusIcon}>{isExpanded ? '−' : '+'}</span>
                                    </div>
                                    <div className={styles.metaData}>
                                        <span className={styles.projectDesktop}>{award.project}</span>
                                        <span className={styles.yearDesktop}>{award.year}</span>
                                    </div>
                                </div>
                                
                                <div className={styles.rowDetails} style={{ height: isExpanded ? 'auto' : '0' }}>
                                    <div className={styles.detailsContent}>
                                        <p className={styles.prizeName}>{award.prize}</p>
                                        <div className={styles.metaMobile}>
                                            <span>Project: {award.project}</span>
                                            <span>Year: {award.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
