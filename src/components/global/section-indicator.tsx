"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./section-indicator.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface NavSection {
    id: string;
    index: string;
    name: string;
}

const navSections: NavSection[] = [
    { id: "about", index: "1", name: "About" },
    { id: "showcase", index: "2", name: "Featured work" },
    { id: "what_we_do", index: "3", name: "What we do" },
    { id: "team", index: "4", name: "Our team" },
    { id: "collaborations", index: "5", name: "Clients" },
    { id: "awards", index: "6", name: "Awards" },
    { id: "press", index: "7", name: "Press" }
];

export default function SectionIndicator() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const triggers: ScrollTrigger[] = [];

        // Hide when on hero
        const heroEl = document.getElementById("hero");
        if (heroEl) {
            const stHero = ScrollTrigger.create({
                trigger: heroEl,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => setActiveId(null),
                onEnterBack: () => setActiveId(null)
            });
            triggers.push(stHero);
        }

        // Track each of the 7 sections
        navSections.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (!el) return;

            const st = ScrollTrigger.create({
                trigger: el,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => setActiveId(sec.id),
                onEnterBack: () => setActiveId(sec.id)
            });
            triggers.push(st);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, { scope: containerRef });

    return (
        <div 
            ref={containerRef} 
            className={`${styles.sectionIndicator} ${activeId ? styles.visible : ""}`}
            data-active-section={activeId || ""}
        >
            <div className={styles.list}>
                {navSections.map((sec) => {
                    const isActive = activeId === sec.id;
                    return (
                        <div 
                            key={sec.id} 
                            className={`${styles.item} ${isActive ? styles.active : ""}`}
                            data-section={sec.id}
                        >
                            <span className={styles.number}>{sec.index}</span>
                            {isActive && (
                                <>
                                    <span className={styles.dash}>—</span>
                                    <span className={styles.name}>{sec.name}</span>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
