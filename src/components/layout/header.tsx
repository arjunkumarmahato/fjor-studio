"use client";

import React, { useState } from "react";
import styles from "./header.module.scss";

const menuItems = [
    { label: "Home", target: "#hero" },
    { label: "Work", target: "#showcase" },
    { label: "What we do", target: "#what_we_do" },
    { label: "Contact", target: "#footer" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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

                    <div className={`${styles.simpleMenu} ${isOpen ? styles.simpleMenuOpen : ""}`}>
                        {menuItems.map((item) => (
                            <button key={item.target} onClick={() => handleLinkClick(item.target)}>
                                {item.label}
                            </button>
                        ))}
                    </div>
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
