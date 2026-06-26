"use client";

import React, { useState, useRef } from "react";

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        let iterations = 0;
        const maxIterations = 4;
        
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        intervalRef.current = setInterval(() => {
            const chars = text.split('');
            const nonSpaceChars: string[] = [];
            const nonSpaceIndices: number[] = [];

            chars.forEach((char, index) => {
                if (char !== ' ') {
                    nonSpaceChars.push(char);
                    nonSpaceIndices.push(index);
                }
            });

            for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
            }

            const result = [...chars];
            nonSpaceIndices.forEach((index, i) => {
                result[index] = nonSpaceChars[i];
            });

            setDisplayText(result.join(''));
            
            iterations++;
            if (iterations >= maxIterations) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
            }
        }, 60);
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <span 
            className={className} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            {displayText}
        </span>
    );
}
