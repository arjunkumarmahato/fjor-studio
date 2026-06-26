"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import styles from "./header.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const menuItems = [
    { label: "Home", target: "/" },
    { label: "About", target: "/about" },
    { label: "Works", target: "/works" },
    { label: "Vault", target: "/vault" },
    { label: "Contact", target: "/contact" },
];



function ScrambleLink({ href, className, onClick, children }: any) {
    const [displayText, setDisplayText] = useState(children);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        let shuffleCount = 0;
        clearInterval(intervalRef.current as any);

        intervalRef.current = setInterval(() => {
            if (shuffleCount >= 3) {
                setDisplayText(children);
                clearInterval(intervalRef.current as any);
                return;
            }

            setDisplayText(
                children
                    .split("")
                    .map((letter: string) => {
                        if (letter === " ") return letter;
                        const charsOnly = children.replace(/\s/g, "");
                        return charsOnly[Math.floor(Math.random() * charsOnly.length)];
                    })
                    .join("")
            );

            shuffleCount++;
        }, 60);
    };

    const handleMouseLeave = () => {
        clearInterval(intervalRef.current as any);
        setDisplayText(children);
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </Link>
    );
}

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tlRef.current = gsap.timeline({ paused: true })
            .fromTo(menuRef.current,
                { height: "56px" },
                {
                    height: "auto",
                    duration: 0.5,
                    ease: "power3.inOut",
                }
            )
            .fromTo(
                ".menuItemGSAP",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                "<0.1" // Start 0.1s after the background starts expanding
            )
            .fromTo(
                ".separatorGSAP",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power3.inOut",
                    transformOrigin: "center center",
                },
                "-=0.2"
            )
            .fromTo(
                ".menuFooterGSAP",
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "<0.1"
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

    return (
        <div>
            {/* Nav Header */}
            <nav className={styles.nav}>
                {/* Left: Logo */}
                <Link href="/" className={styles.navLogo} onClick={() => setIsOpen(false)}>
                    <img src="/logo.svg" alt="FJOR Studio" />
                </Link>

                {/* Center: Menu toggler button & Dropdown */}
                <div className={styles.menuWrap}>
                    <div className={styles.dropdownMenu} ref={menuRef}>
                        <div className={styles.menuItemsList}>
                            {menuItems.map((item) => (
                                <div key={item.target} className={`${styles.menuItemContainer} menuItemGSAP`}>
                                    <ScrambleLink
                                        href={item.target}
                                        className={`${styles.menuItem} ${pathname === item.target ? styles.active : ""}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </ScrambleLink>
                                </div>
                            ))}
                        </div>

                        <div className={`${styles.separator} separatorGSAP`} />

                        <div className={`${styles.menuFooter} menuFooterGSAP`}>
                            <div className={styles.legalLinks}>
                                <span>&copy; COPYRIGHT 2026</span>
                                <Link href="/privacy-policy" onClick={() => setIsOpen(false)}>Privacy Policy</Link>
                                <Link href="/terms" onClick={() => setIsOpen(false)}>Terms and Conditions</Link>
                            </div>
                            <div className={styles.socialLinks}>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter size={20} /></a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a>
                            </div>
                        </div>
                    </div>

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
        </div>
    );
}
