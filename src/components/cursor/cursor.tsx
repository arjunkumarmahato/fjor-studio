"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./cursor.module.scss";

interface Point {
    x: number;
    y: number;
    life: number; // 1.0 decays down to 0.0
}

export default function Cursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Core coordinate list
    const pointsRef = useRef<Point[]>([]);
    // Live mouse position
    const mouseRef = useRef({ x: 0, y: 0 });
    const hasMovedRef = useRef(false);

    const [mounted, setMounted] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setMounted(true);
        const touchQuery = window.matchMedia("(pointer: coarse)");
        const checkTouch = () => {
            setIsTouch(
                touchQuery.matches ||
                ("ontouchstart" in window) ||
                (navigator.maxTouchPoints > 0)
            );
        };
        checkTouch();
        touchQuery.addEventListener("change", checkTouch);
        return () => touchQuery.removeEventListener("change", checkTouch);
    }, []);

    useGSAP(() => {
        if (!mounted || isTouch) return;
        const dot = cursorDotRef.current;
        const canvas = canvasRef.current;
        if (!dot || !canvas) return;

        // Position the physical lead dot
        const xTo = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
        const yTo = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
        gsap.set(dot, { xPercent: -50, yPercent: -50 });

        // Resize handler to keep canvas full size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Capture mouse moves and discretize into straight line segments
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            xTo(clientX);
            yTo(clientY);

            mouseRef.current = { x: clientX, y: clientY };
            hasMovedRef.current = true;

            const points = pointsRef.current;
            if (points.length === 0) {
                points.push({ x: clientX, y: clientY, life: 1.0 });
            } else {
                const last = points[points.length - 1];
                const dx = clientX - last.x;
                const dy = clientY - last.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Threshold of 18px guarantees long, distinct straight segments
                if (dist > 18) {
                    points.push({ x: clientX, y: clientY, life: 1.0 });
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Hover expand effects (dashed architect/sketch ring on links/buttons)
        const onHover = () => {
            gsap.to(dot, {
                scale: 3.5,
                backgroundColor: "transparent",
                borderColor: "rgba(255, 255, 255, 0.4)",
                borderWidth: "1px",
                borderStyle: "dashed",
                duration: 0.3
            });
        };
        const onLeave = () => {
            gsap.to(dot, {
                scale: 1,
                backgroundColor: "var(--color-accent)",
                borderColor: "transparent",
                borderWidth: "0px",
                duration: 0.3
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, textarea, select, [role='button']")) {
                onHover();
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, textarea, select, [role='button']")) {
                onLeave();
            }
        };

        document.body.addEventListener("mouseover", handleMouseOver);
        document.body.addEventListener("mouseout", handleMouseOut);

        // Draw the discretized straight line segments path
        const ctx = canvas.getContext("2d");
        const tick = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!hasMovedRef.current) return;

            const points = pointsRef.current;

            // Decay points life
            const decay = 0.022; // Elegant, longer fading vector tail (~750ms)
            for (let i = 0; i < points.length; i++) {
                points[i].life -= decay;
            }

            // Remove expired coordinates
            pointsRef.current = points.filter(p => p.life > 0);

            // Construct list of all rendering coordinates including live mouse
            const renderPoints = [
                ...pointsRef.current,
                { x: mouseRef.current.x, y: mouseRef.current.y, life: 1.0 }
            ];
            
            if (renderPoints.length < 2) return;

            // Draw crisp straight segments with individual fading opacity/width
            for (let i = 1; i < renderPoints.length; i++) {
                const pStart = renderPoints[i - 1];
                const pEnd = renderPoints[i];

                const alpha = pEnd.life * 0.7;
                const width = 0.6 + pEnd.life * 1.4;

                ctx.beginPath();
                ctx.moveTo(pStart.x, pStart.y);
                ctx.lineTo(pEnd.x, pEnd.y);

                ctx.lineWidth = width;
                ctx.lineCap = "butt";   // Crisp miter joints for clean straight segments
                ctx.lineJoin = "miter"; // Razor-sharp corners in zigzags
                ctx.strokeStyle = `rgba(242, 242, 242, ${alpha})`;
                ctx.stroke();
            }
        };

        gsap.ticker.add(tick);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseover", handleMouseOver);
            document.body.removeEventListener("mouseout", handleMouseOut);
            gsap.ticker.remove(tick);
        };
    }, { dependencies: [mounted, isTouch], scope: canvasRef });

    if (!mounted || isTouch) return null;

    return (
        <>
            <canvas ref={canvasRef} className={styles.cursorCanvas} />
            <div ref={cursorDotRef} className={styles.cursorDot} />
        </>
    );
}
