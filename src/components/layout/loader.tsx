"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./loader.module.scss";

export default function EntryLoader({ onFinished }: { onFinished: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onFinished,
            defaults: { ease: "power4.inOut" }
        });

        // Step 1: Draw the silver line
        tl.to(shapeRef.current, {
            width: "20vw",
            duration: 1.2,
            ease: "expo.inOut"
        })
        // Step 2: Morph into a geometric circle
        .to(shapeRef.current, {
            height: "20vw",
            borderRadius: "50%",
            duration: 1.2,
            ease: "expo.inOut"
        }, "+=0.2")
        // Step 3: Scale infinitely to swallow the camera
        .to(shapeRef.current, {
            scale: 25,
            duration: 1.5,
            ease: "power3.in"
        }, "+=0.3")
        // Step 4: Fade the entire loader overlay to reveal Hero
        .to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });

    }, { scope: loaderRef });

    return (
        <div ref={loaderRef} className={styles.loaderOverlay}>
            <div ref={shapeRef} className={styles.kinematicShape} />
        </div>
    );
}
