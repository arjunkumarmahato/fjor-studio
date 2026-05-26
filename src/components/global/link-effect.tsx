import React from 'react';
import styles from './link-effect.module.scss';

interface LinkEffectProps {
    children: React.ReactNode;
    className?: string;
}

export default function LinkEffect({ children, className = '' }: LinkEffectProps) {
    return (
        <span className={`${styles.linkEffectWrapper} ${className}`}>
            <span className={styles.inner}>
                <span className={styles.text}>{children}</span>
                <span className={styles.textClone} aria-hidden="true">{children}</span>
            </span>
        </span>
    );
}
