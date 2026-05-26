import styles from "./booking-footer.module.scss";

export default function BookingPortalAndFooter() {
    return (
        <section className={`section-detector ${styles.footerWrap}`} id="footer" data-section-index="08" data-section-name="Get in touch">
            <div className="sectionLabel">GET IN TOUCH</div>

            <div className={styles.footerContent}>
                <a href="mailto:contact.fjor@gmail.com" className={styles.emailAddress}>
                    contact.fjor@gmail.com
                </a>
            </div>
        </section>
    );
}
