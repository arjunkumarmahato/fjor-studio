"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./team.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface TeamCardData {
    num: string;
    narrative: string;
    img: string;
}

const cards: TeamCardData[] = [
    { 
        num: "01", 
        img: "/images/rose.jpg", 
        narrative: "What started in China as a creative partnership which became the foundation of everything we've built. The curiosity never stops there." 
    },
    { 
        num: "02", 
        img: "/images/img2.jpg", 
        narrative: "Saigon is where we found our footing. Fast, ambitious, never satisfied — shaped how we work and what we expect from ourselves." 
    },
    { 
        num: "03", 
        img: "/images/img1.jpg", 
        narrative: "But good work doesn't stay in one place — and neither did we. We go wherever the next brief takes us." 
    },
    { 
        num: "04", 
        img: "/images/rose.jpg", 
        narrative: "The offices gave us roots in new places. The people gave us reasons to keep going." 
    }
];

export default function TeamGallery() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            pin: true, 
            scrub: true,
            onUpdate: (self) => {
                setProgress(self.progress);
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={`section-detector ${styles.teamSection}`} id="team" data-section-index="04" data-section-name="Our team">
            <div className={styles.teamContent}>
                
                <div className={styles.teamCards}>
                    {cards.map((card, idx) => (
                        <div 
                            key={card.num}
                            className={styles.teamCardsItem}
                            style={{ 
                                "--index": idx,
                                "--progress": progress,
                                "--total-items": cards.length
                            } as React.CSSProperties}
                        >
                            <div className={styles.teamCardsItemScene}>
                                <div className={styles.teamCardsItemSceneObj}>
                                    <img src={card.img} alt={`Slide ${card.num}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.teamInfo}>
                    <div className={styles.teamInfoDescriptions}>
                        {cards.map((card, idx) => {
                            const itemProgress = progress * (cards.length - 1);
                            const distance = Math.abs(itemProgress - idx);
                            const isActive = distance < 0.5;

                            return (
                                <div 
                                    key={card.num} 
                                    className={styles.teamInfoDescriptionsItem}
                                    style={{ 
                                        opacity: isActive ? 1 : 0,
                                        pointerEvents: isActive ? "auto" : "none",
                                        position: idx === 0 ? "relative" : "absolute",
                                        top: 0,
                                        left: 0,
                                        transition: "opacity 0.6s"
                                    }}
                                >
                                    <p>{card.narrative}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.teamSectionIndex}>
                    <span className={styles.teamSectionIndexNum}>
                        {cards[Math.min(cards.length - 1, Math.max(0, Math.round(progress * (cards.length - 1))))].num}
                    </span>
                </div>

            </div>
        </section>
    );
}
