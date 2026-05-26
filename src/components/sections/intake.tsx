"use client";

import React from "react";
import styles from "./intake.module.scss";

export default function IntakeGate() {
    return (
        <section className={styles.intakeSection} id="intake-section">
            <div className={styles.container}>
                
                <h2 className={styles.massiveTitle}>
                    Let’s Build<br/>the Extraordinary.
                </h2>
                
                <p className={styles.gateCopy}>
                    We restrict our project pipeline intentionally to ensure every partner receives uncompromised creative execution and absolute technical focus. If your team is ready to deploy a category-defining digital asset and your capital is allocated, integrate with our intake track below.
                </p>

                <div className={styles.buttonWrapper}>
                    <button className={styles.inquiryButton}>
                        <span className={styles.buttonText}>[ INITIALIZE COLLABORATION INQUIRY ]</span>
                    </button>
                </div>

            </div>
            
            {/* Minimalist Footer Credits */}
            <div className={styles.footerCredits}>
                <span className={styles.monoCredit}>SOVEREIGN STUDIO © 2026</span>
                <span className={styles.monoCredit}>GLOBAL DEPLOYMENT</span>
            </div>
        </section>
    );
}
