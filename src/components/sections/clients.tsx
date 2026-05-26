"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./clients.module.scss";

gsap.registerPlugin(ScrollTrigger);

const clients = [
    "Louis Vuitton",
    "OnePlus",
    "Chanel",
    "La Mer",
    "L'Oreal",
    "Dior",
    "Oppo",
    "The North Face",
    "88rising",
    "Oribe",
    "Nike"
];

export default function ClientsLoop() {
    const containerRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

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

        // Staggered reveal of client names
        if (gridRef.current) {
            const items = gridRef.current.children;
            gsap.fromTo(items,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%",
                        once: true
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={`section-detector ${styles.clientsSection}`} id="collaborations" data-section-index="05" data-section-name="Collaborations">
            <div className={styles.container}>
                
                <div ref={indexRef} className={styles.sectionIndex}>
                    <span className={styles.indexNum}>5</span>
                    <span className={styles.indexDash}>—</span>
                    <span className={styles.indexName}>Collaborations</span>
                </div>

                <div ref={gridRef} className={styles.clientsGrid}>
                    {clients.map((client, index) => (
                        <div key={index} className={styles.clientItem}>
                            {client}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
