"use client";

import React from "react";
import styles from "./systems.module.scss";

export default function SystemsGrid() {
    return (
        <section className={styles.systemsSection} id="systems-section">
            <div className={styles.container}>
                
                <div className={styles.header}>
                    <span className={styles.monoLabel}>[ THE SYSTEMS // PRODUCTIZED ALLOCATION ]</span>
                </div>

                <div className={styles.grid}>
                    
                    {/* Track A */}
                    <div className={styles.trackCard}>
                        <div className={styles.trackHeader}>
                            <h3 className={styles.trackTitle}>[ TRACK A: THE VELOCITY PROTOCOL ]</h3>
                        </div>
                        <div className={styles.trackBody}>
                            <div className={styles.dataRow}>
                                <span className={styles.dataKey}>Deployment:</span>
                                <span className={styles.dataValue}>[ 14-DAY SPRINT // TECH & STARTUPS ]</span>
                            </div>
                            <div className={styles.dataRowScope}>
                                <span className={styles.dataKey}>The Scope:</span>
                                <p className={styles.scopeText}>
                                    "A hyper-focused, deployment-ready sprint. We reconstruct your digital interface into a performance-optimized asset designed for immediate go-to-market readiness, high-stakes fundraising, and technical authority."
                                </p>
                            </div>
                            <div className={styles.dataRowInvestment}>
                                <span className={styles.dataKey}>The Investment:</span>
                                <span className={styles.dataValueHighlight}>[ FIX FEE: $10,000 USD // 50% UPFRONT ALLOCATION ]</span>
                            </div>
                        </div>
                    </div>

                    {/* Track B */}
                    <div className={styles.trackCard}>
                        <div className={styles.trackHeader}>
                            <h3 className={styles.trackTitle}>[ TRACK B: THE BESPOKE IMMERSION ]</h3>
                        </div>
                        <div className={styles.trackBody}>
                            <div className={styles.dataRow}>
                                <span className={styles.dataKey}>Deployment:</span>
                                <span className={styles.dataValue}>[ 4-WEEK ARCHITECTURE // LUXURY & LIFESTYLE ]</span>
                            </div>
                            <div className={styles.dataRowScope}>
                                <span className={styles.dataKey}>The Scope:</span>
                                <p className={styles.scopeText}>
                                    "A comprehensive, multi-page narrative orchestration. We integrate advanced WebGL canvas shading, bespoke 3D assets, and editorial spatial design to curate a fully immersive brand destination."
                                </p>
                            </div>
                            <div className={styles.dataRowInvestment}>
                                <span className={styles.dataKey}>The Investment:</span>
                                <span className={styles.dataValueHighlight}>[ VALUATION STRUCTURED VIA CAPABILITY ASSESSMENT ]</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
