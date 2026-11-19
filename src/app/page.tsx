import { DesktopNav } from '@/components/Navigation/DesktopNav';
import { MobileNav } from '@/components/Navigation/MobileNav';
import { SectionNav } from '@/components/Navigation/SectionNav';
import { Hero } from '@/components/Sections/Hero';
import { Who } from '@/components/Sections/Who';
import { What } from '@/components/Sections/What';
import { Philosophy } from '@/components/Sections/Philosophy';
import { Ecosystem } from '@/components/Sections/Ecosystem';
import { Work } from '@/components/Sections/Work';
import { Experience } from '@/components/Sections/Experience';
import { Process } from '@/components/Sections/Process';
import { Now } from '@/components/Sections/Now';
import { Why } from '@/components/Sections/Why';
import { ContactCTA } from '@/components/Sections/ContactCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
      <SectionNav />

      <main id="main" className="min-h-screen">
        <Hero />
        <Who />
        <What />
        <Philosophy />
        <Ecosystem />
        <Work />
        <Experience />
        <Process />
        <Now />
        <Why />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}