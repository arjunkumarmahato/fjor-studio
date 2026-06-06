"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./number-ticker.module.scss";

interface NumberTickerProps {
    progress: number;
}

export default function NumberTicker({ progress }: NumberTickerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tensRef = useRef<HTMLDivElement>(null);
    const unitsRef = useRef<HTMLDivElement>(null);

    const prevTens = useRef(0);
    const prevUnits = useRef(0);

    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    useGSAP(() => {
        // UNITS LOGIC
        let currentUnits = progress % 10;
        if (progress === 10) currentUnits = 10;

        if (currentUnits !== prevUnits.current) {
            let duration = 0.25; // Snappy for steps 1-9
            let ease = "power2.out";

            if (currentUnits === 10) {
                duration = 0.8; // transition to 10
                ease = "power4.out";
            }

            gsap.to(unitsRef.current, {
                yPercent: -currentUnits * (100 / digits.length),
                duration: duration,
                ease: ease,
                overwrite: true
            });
            prevUnits.current = currentUnits;
        }

        // TENS LOGIC
        const currentTens = Math.floor(progress / 10);
        if (currentTens !== prevTens.current) {
            let duration = 0.6;
            let ease = "expo.inOut";
            let delay = 0;

            if (progress === 10) {
                duration = 0.8; // faster transition to 10
                ease = "power4.out";
                delay = 0.25; // Shorter staggered delay so 0 comes first, then 1 snaps in quickly after
            }

            gsap.to(tensRef.current, {
                yPercent: -currentTens * (100 / digits.length),
                duration: duration,
                ease: ease,
                delay: delay,
                overwrite: true
            });
            prevTens.current = currentTens;
        }
    }, { dependencies: [progress], scope: containerRef });

    return (
        <div ref={containerRef} className={styles.numberTicker}>
            <div className={styles.box}>
                <div ref={tensRef} className={`${styles.digitStack} ${styles.tens}`}>
                    {digits.map((num, i) => (
                        <div key={`tens-${i}`} className={styles.digit}>{num}</div>
                    ))}
                </div>
            </div>

            <div className={styles.box}>
                <div ref={unitsRef} className={`${styles.digitStack} ${styles.units}`}>
                    {digits.map((num, i) => (
                        <div key={`units-${i}`} className={styles.digit}>{num}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
