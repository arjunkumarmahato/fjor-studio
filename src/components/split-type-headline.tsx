"use client";

import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitTypeHeadlineProps {
    text: string;
    className?: string;
    tag?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
}

export default function SplitTypeHeadline({ 
    text, 
    className = "", 
    tag = "h1",
    delay = 0 
}: SplitTypeHeadlineProps) {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        // Split text into individual words & lines structures
        const instance = new SplitType(element, { types: ["lines", "words"] });

        // Wrap each line in a parent container with overflow: hidden for masking
        if (instance.lines) {
            instance.lines.forEach((line) => {
                const parent = document.createElement("div");
                parent.style.overflow = "hidden";
                parent.style.display = "block";
                parent.classList.add("overflow-hidden-line-mask");
                
                if (line.parentNode) {
                    line.parentNode.insertBefore(parent, line);
                    parent.appendChild(line);
                }
            });
        }

        // Animate the lines upward into view using GPU accelerated force3D
        gsap.fromTo(
            instance.lines,
            { yPercent: 105 },
            {
                yPercent: 0,
                duration: 1.1,
                stagger: 0.08,
                delay: delay,
                ease: "expo.out",
                force3D: true,
                scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true,
                },
            }
        );

        return () => {
            instance.revert();
        };
    }, [text, delay]);

    const Tag = tag;
    return <Tag ref={textRef as any} className={className}>{text}</Tag>;
}
