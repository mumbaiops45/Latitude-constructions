import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/Services";
import ProjectsSection from "./components/Projects";
import ContactSection from "./components/ContactCTA";
import TestimonialsSection from "./components/Testimonials";
import  WhyChooseUs from "./components/WhyChooseUs"; 
import Process from "./components/Process";
// import Partners from "./components/Partners";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUs />
      <Process />
      <TestimonialsSection />
      {/* <Partners /> */}
      <FAQ />
      <ContactSection />



      {/* <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Partners />
      <FAQ />
      <ContactSection /> */}
    </>
  );
}