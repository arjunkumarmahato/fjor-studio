import Link from "next/link";
import styles from "./footer.module.scss";
import { ScrambleText } from "@/components/global/scramble-text";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.menu}>
                <Link href="/"><ScrambleText text="Home" /></Link>
                <Link href="/about"><ScrambleText text="About Us" /></Link>
                <Link href="/works">
                    <span><ScrambleText text="Our Works" /></span>
                    <span><ScrambleText text="04" /></span>
                </Link>
                <Link href="/vault"><ScrambleText text="The Vault" /></Link>
                <Link href="/contact"><ScrambleText text="Get In Touch" /></Link>
            </div>
            <div className={styles.container}>
                <div className={styles.getInTouch}>
                    <h3>Get In Touch</h3>
                    <a href="mailto:contact.fjor@gmail.com">EMAIL : <ScrambleText text="contact.fjor@gmail.com" /></a>
                    <a href="tel:+916200341564">PHONE NO. : <ScrambleText text="+91-6200341564" /></a>
                </div>
                <div className={styles.socials}>
                    <h3>Socials</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><ScrambleText text="LinkedIn" /></a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer"><ScrambleText text="YouTube" /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><ScrambleText text="Instagram" /></a>
                    <a href="https://x.com" target="_blank" rel="noreferrer"><ScrambleText text="X" /></a>
                </div>
                {/* <div className={styles.legal}>
                    <h3>Legal</h3>
                    <Link href="/terms"><ScrambleText text="Terms of Service" /></Link>
                    <Link href="/cookies"><ScrambleText text="Cookies Preferences" /></Link>
                    <Link href="/privacy"><ScrambleText text="Privacy Policy" /></Link>
                </div> */}
            </div>
            <div className={styles.copyright}>
                <span>Copyright &copy; 2026 Fjor Studio</span>
                <span>All Rights Reserved</span>
            </div>
        </footer>
    );
}
