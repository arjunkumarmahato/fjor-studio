"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./sidebar.module.scss";

interface SidebarItem {
    num: string;
    label: string;
    targetId: string;
}

const navItems: SidebarItem[] = [
    { num: "1", label: "About", targetId: "#about" },
    { num: "2", label: "Featured work", targetId: "#showcase" },
    { num: "3", label: "What we do", targetId: "#what_we_do" },
    { num: "4", label: "Our team", targetId: "#team-gallery-section" },
    { num: "5", label: "They trust us", targetId: "#clients-portal-section" },
    { num: "6", label: "Awards", targetId: "#awards-showcase-section" },
    { num: "7", label: "Press", targetId: "#press-links-section" }
];

export default function GlobalSidebar() {
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        navItems.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item.targetId,
                start: "top 45%",
                end: "bottom 45%",
                onEnter: () => setActiveIndex(index),
                onEnterBack: () => setActiveIndex(index),
                onLeave: () => {
                    // Reset if scrolling past press
                    if (index === navItems.length - 1) setActiveIndex(-1);
                },
                onLeaveBack: () => {
                    // Reset if scrolling above first section
                    if (index === 0) setActiveIndex(-1);
                }
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={styles.sidebarWrapper}>
            {navItems.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                    <div 
                        key={item.num} 
                        className={`${styles.sidebarItem} ${isActive ? styles.itemActive : ""}`}
                    >
                        {isActive ? (
                            <span className={styles.activeLabel}>{item.num} — {item.label}</span>
                        ) : (
                            <span className={styles.dimNum}>{item.num}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
