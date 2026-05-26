import Header from "@/components/layout/header";
import ScrollProgress from "@/components/global/scroll-progress";
import SectionIndicator from "@/components/global/section-indicator";
import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import Capabilities from "@/components/sections/pitch";
import WebGLShowcase from "@/components/sections/showcase";
import TeamGallery from "@/components/sections/team";
import ClientsLoop from "@/components/sections/clients";
import AwardsShowcase from "@/components/sections/awards";
import PressLinks from "@/components/sections/press";
import BookingPortalAndFooter from "@/components/sections/booking-footer";

export default function Home() {
    return (
        <>
            {/* <ScrollProgress /> */}
            {/* <SectionIndicator /> */}
            <Header />
            <Hero />
            <AboutSection />
            <WebGLShowcase />
            <Capabilities />
            {/* <TeamGallery />
                <ClientsLoop />
                <AwardsShowcase />
                <PressLinks /> */}
            <BookingPortalAndFooter />
        </>
    );
}
