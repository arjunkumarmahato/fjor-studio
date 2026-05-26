"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./work.module.scss";

interface ProjectItem {
    name: string;
    tags: string;
    narrative: string;
    img: string;
}

const projects: ProjectItem[] = [
    {
        name: "AETHER LABS",
        tags: "[ DATA VISUALIZATION // REAL-TIME RENDERING ]",
        narrative: "An exploration in high-density data architecture. To solve the cognitive load of complex AI infrastructures, we engineered a seamless 3D node system. The interface simplifies dense network data into an interactive, fluid canvas—keeping enterprise user engagement continuous and rendering flawlessly at native device refresh rates.",
        img: "/images/img2.jpg"
    },
    {
        name: "VERA PENTHOUSES",
        tags: "[ SPATIAL LAYOUT // CANVAS DISPLACEMENT ]",
        narrative: "A masterclass in digital pacing and spatial design. Developed to mirror ultra-high-net-worth property acquisitions. We integrated custom WebGL image displacement and expansive whitespace to evoke a sense of permanence, architectural scale, and premium valuation.",
        img: "/images/rose.jpg"
    }
];

export default function RNDEvidence() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate total horizontal scroll distance
        const totalScroll = track.scrollWidth - window.innerWidth + 200; // 200px buffer for smooth exit

        gsap.to(track, {
            x: -totalScroll,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%", // Pin for 2x screen height to ensure slow reading pace
                pin: true,
                scrub: 1 // Slight smoothing on scrub
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.workSection} id="rnd-evidence-section">
            <div className={styles.stickyHeader}>
                <span className={styles.monoLabel}>[ INTERNAL EXPLORATIONS // R&D ]</span>
            </div>
            
            <div ref={trackRef} className={styles.horizontalTrack}>
                {projects.map((project, idx) => (
                    <div key={idx} className={styles.projectCard}>
                        <div className={styles.imageWrapper}>
                            <img src={project.img} alt={project.name} className={styles.projectImg} />
                        </div>
                        <div className={styles.projectMeta}>
                            <span className={styles.projectTags}>{project.tags}</span>
                            <h2 className={styles.projectName}>{project.name}</h2>
                            <p className={styles.projectNarrative}>{project.narrative}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
