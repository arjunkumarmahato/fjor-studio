"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./services.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CreativeCuriosityOffices() {
    const pinWrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const panel1Ref = useRef<HTMLDivElement>(null);
    const panel2Ref = useRef<HTMLDivElement>(null);
    const panel3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const pinWrapper = pinWrapperRef.current;
        const track = trackRef.current;
        const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];

        if (!pinWrapper || !track || !panels[0]) return;

        const translationValue = -(100 * (panels.length - 1)) / panels.length;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinWrapper,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${pinWrapper.offsetWidth * 1.5}`,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        tl.to(track, {
            xPercent: translationValue,
            ease: "none",
        });

        panels.forEach((panel, index) => {
            if (!panel) return;
            
            tl.to(panel, {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "power2.out",
            }, (index / (panels.length - 1)) * 0.85);
        });

    }, { scope: pinWrapperRef });

    return (
        <section ref={pinWrapperRef} className={styles.servicesPin} id="services-section">
            <div className={styles.stickyContainer}>
                <div ref={trackRef} className={styles.track}>
                    
                    {/* Panel 1: Saigon */}
                    <div ref={panel1Ref} className={styles.panel}>
                        <div className={styles.panelContent}>
                            <div className={styles.metaCol}>
                                <span className={styles.num}>VN</span>
                                <span className={styles.metaLabel}>OFFICE / EST. 2020</span>
                            </div>
                            
                            <div className={styles.textBlock}>
                                <h3 className={styles.panelTitle}>
                                    Saigon is where we found our <span className={styles.titleSerif}>footing</span>.
                                </h3>
                                <p className={styles.panelDesc}>
                                    Fast, ambitious, never satisfied — shaped how we work and what we expect from ourselves. 
                                    This became the foundation of everything we've built.
                                </p>
                                
                                <div className={styles.addressSpec}>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>ADDRESS:</span>
                                        <span className={styles.specVal}>Midtown, Phu My Hung, Ho Chi Minh city</span>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>CONTACT:</span>
                                        <span className={styles.specVal}>+84 91 9922034 // contact.fjor@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel 2: China / Hong Kong */}
                    <div ref={panel2Ref} className={styles.panel}>
                        <div className={styles.panelContent}>
                            <div className={styles.metaCol}>
                                <span className={styles.num}>CN</span>
                                <span className={styles.metaLabel}>OFFICE / ARCHIVE</span>
                            </div>
                            
                            <div className={styles.textBlock}>
                                <h3 className={styles.panelTitle}>
                                    Curiosity never stops in <span className={styles.titleSerif}>Hong Kong</span>.
                                </h3>
                                <p className={styles.panelDesc}>
                                    Good work doesn't stay in one place — and neither did we. 
                                    We go wherever the next cinematic brief and creative challenge takes us.
                                </p>
                                
                                <div className={styles.addressSpec}>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>ADDRESS:</span>
                                        <span className={styles.specVal}>193 Lockart Road, Hong Kong</span>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>CONTACT:</span>
                                        <span className={styles.specVal}>+86 186 16222144 // contact.fjor@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel 3: France / Paris */}
                    <div ref={panel3Ref} className={styles.panel}>
                        <div className={styles.panelContent}>
                            <div className={styles.metaCol}>
                                <span className={styles.num}>FR</span>
                                <span className={styles.metaLabel}>OFFICE / EUROPE</span>
                            </div>
                            
                            <div className={styles.textBlock}>
                                <h3 className={styles.panelTitle}>
                                    Paris gave us <span className={styles.titleSerif}>roots</span> in new places.
                                </h3>
                                <p className={styles.panelDesc}>
                                    The people gave us reasons to keep going. From multinational studios 
                                    to independent luxury creators, our roots grow deep.
                                </p>
                                
                                <div className={styles.addressSpec}>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>ADDRESS:</span>
                                        <span className={styles.specVal}>64-66 Rue des Archives, 75003 Paris, France</span>
                                    </div>
                                    <div className={styles.specRow}>
                                        <span className={styles.specLabel}>CONTACT:</span>
                                        <span className={styles.specVal}>+33 56 3264235 // contact.fjor@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
