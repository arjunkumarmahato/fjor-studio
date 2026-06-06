"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./booking-footer.module.scss";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function BookingPortalAndFooter() {
    const containerRef = useRef<HTMLElement>(null);
    const emailRef = useRef<HTMLAnchorElement>(null);
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(".footer-fade-up", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section
            ref={containerRef}
            className={`section-detector ${styles.footerWrap}`}
            id="footer"
            data-section-index="08"
            data-section-name="Get in touch"
        >
            <div className="sectionLabel">GET IN TOUCH</div>

            <div className={styles.container}>
                <div className={styles.topSection}>
                    <a ref={emailRef} href="mailto:contact.fjor@gmail.com" className={`${styles.emailAddress} footer-fade-up`}>
                        contact.fjor@gmail.com
                    </a>
                </div>

                <div className={styles.middleSection}>
                    <div className={`${styles.gridColumn} footer-fade-up`}>
                        <h4 className={styles.columnTitle}>Studio</h4>
                        <p className={styles.columnText}>
                            Available Worldwide.
                        </p>
                    </div>

                    <div className={`${styles.gridColumn} footer-fade-up`}>
                        <h4 className={styles.columnTitle}>Socials</h4>
                        <ul className={styles.linkList}>
                            <li><a href="#" className={styles.linkItem}>Instagram</a></li>
                            <li><a href="#" className={styles.linkItem}>Twitter (X)</a></li>
                            <li><a href="#" className={styles.linkItem}>LinkedIn</a></li>
                        </ul>
                    </div>

                    <div className={`${styles.gridColumn} footer-fade-up`}>
                        <h4 className={styles.columnTitle}>Navigation</h4>
                        <ul className={styles.linkList}>
                            <li><a href="#home" className={styles.linkItem}>Home</a></li>
                            <li><a href="#work" className={styles.linkItem}>Work</a></li>
                            <li><a href="#about" className={styles.linkItem}>About</a></li>
                            <li><a href="#footer" className={styles.linkItem}>Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className={`${styles.bottomSection} footer-fade-up`}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Fjor Studio. All rights reserved.
                    </div>
                </div>
            </div>
        </section>
    );
}
