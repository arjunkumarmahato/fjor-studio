"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./pitch.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface CategoryData {
    num: string;
    subNum: string;
    name: string;
    items: string[];
}

const categories: CategoryData[] = [
    {
        num: "01",
        subNum: "2.1",
        name: "DIRECTION",
        items: ["ART DIRECTION", "MOTION DESIGN", "BRAND IDENTITY"]
    },
    {
        num: "02",
        subNum: "2.2",
        name: "DIGITAL",
        items: ["UI/UX", "WEB EXPERIENCE", "SEO"]
    }
];

export default function Capabilities() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeCat, setActiveCat] = useState("01");

    useGSAP(() => {
        if (!containerRef.current) return;

        const items = containerRef.current.querySelectorAll(`.${styles.whatWeDoContentItem}`);
        const triggers: ScrollTrigger[] = [];

        items.forEach((item) => {
            const cat = item.getAttribute("data-cat");
            if (!cat) return;

            const st = ScrollTrigger.create({
                trigger: item,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveCat(cat),
                onEnterBack: () => setActiveCat(cat),
                onUpdate: (self) => {
                    if (self.isActive) {
                        setActiveCat(cat);
                    }
                }
            });
            triggers.push(st);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={`section-detector ${styles.whatWeDo}`} id="what_we_do" data-section-index="03" data-section-name="WHAT WE DO">
            <div className="sectionLabel">WHAT WE DO</div>

            <div>
                <div className={`${styles.container} ${styles.whatWeDoContainer}`}>
                    <div className={`${styles.grid} ${styles.whatWeDoGrid}`}>
                        <div ref={contentRef} className={styles.whatWeDoContent}>
                            {categories.map((cat) => (
                                <div key={cat.num}>
                                    <div className={`${styles.whatWeDoContentItem} ${activeCat === cat.num ? styles.active : ""}`} data-cat={cat.num}>
                                        <div className={styles.whatWeDoContentItemNumber}>
                                            <p>{cat.num}</p>
                                        </div>
                                        <div className={styles.whatWeDoContentItemCategory}>
                                            <h4>{cat.name}</h4>
                                        </div>
                                        <div className={styles.whatWeDoContentItemContent}>
                                            <div className={styles.whatWeDoContentItemContentCategory}>
                                                <div className={styles.whatWeDoContentItemContentCategoryNumber}>
                                                    <p>{cat.subNum}</p>
                                                </div>
                                                <div className={styles.whatWeDoContentItemContentCategoryName}>
                                                    <h4>{cat.name}</h4>
                                                </div>
                                            </div>
                                            <ul className={styles.whatWeDoContentItemContentList}>
                                                {cat.items.map((item, i) => (
                                                    <li key={i} className={`${styles.whatWeDoContentItemContentListItem} ${activeCat === cat.num ? styles.active : ""}`} style={{ "--i": i } as React.CSSProperties}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
