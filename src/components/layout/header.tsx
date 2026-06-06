"use client";

import React, { useState, useRef } from "react";
import styles from "./header.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const menuItems = [
    { label: "Home", target: "#hero" },
    { label: "Work", target: "#showcase" },
    { label: "What we do", target: "#what_we_do" },
    { label: "Contact", target: "#footer" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .set(menuRef.current, { visibility: "visible" })
            .to(menuRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.inOut",
            })
            .fromTo(
                ".menuItemGSAP",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power3.out",
                },
                "-=0.2"
            )
            .fromTo(
                `.${styles.secondaryLinks}`,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );
    }, { scope: menuRef });

    useGSAP(() => {
        if (isOpen) {
            gsap.set(menuRef.current, { pointerEvents: "auto" });
            tlRef.current?.play();
        } else {
            tlRef.current?.reverse().then(() => {
                gsap.set(menuRef.current, { pointerEvents: "none" });
            });
        }
    }, [isOpen]);

    const handleLinkClick = (selector: string) => {
        setIsOpen(false);
        const target = document.querySelector(selector);
        target?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            {/* Nav Header */}
            <nav className={styles.nav}>
                {/* Left: Logo */}
                <div className={styles.navLogo} onClick={() => handleLinkClick("#hero")}>
                    <img src="/logo.svg" alt="FJOR Studio" />
                </div>

                {/* Center: Menu toggler button */}
                <div className={styles.menuWrap}>
                    <button
                        className={`${styles.navToggler} ${isOpen ? styles.open : ""}`}
                        onClick={() => setIsOpen((current) => !current)}
                        aria-label="Toggle Navigation"
                        aria-expanded={isOpen}
                    >
                        <div className={styles.dottedGrid}>
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                            <span className={styles.dot} />
                        </div>
                        <span className={styles.togglerText}>{isOpen ? "Close" : "Menu"}</span>
                    </button>
                </div>

                {/* Right: Contact button */}
                <div className={styles.navContact}>
                    <a href="mailto:contact.fjor@gmail.com" className={styles.chatLink}>
                        Get in touch
                        <span className={styles.arrowWrapper}>
                            <svg
                                className={`${styles.chatArrow} ${styles.arrow1}`}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 9H16M11 4L16 9L11 14"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                />
                            </svg>
                            <svg
                                className={`${styles.chatArrow} ${styles.arrow2}`}
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 9H16M11 4L16 9L11 14"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                />
                            </svg>
                        </span>
                    </a>
                </div>
            </nav>

            {/* Awwwards Full Screen Menu Overlay */}
            <div className={styles.fullScreenMenu} ref={menuRef}>
                <div className={styles.menuItemsList}>
                    {menuItems.map((item) => (
                        <div key={item.target} className={styles.menuItemContainer}>
                            <button
                                className={`${styles.menuItem} menuItemGSAP`}
                                onClick={() => handleLinkClick(item.target)}
                            >
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
