import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Coverage from "@/components/Coverage";
import Marquee from "@/components/Marquee";
import Tools from "@/components/Tools";
import Showcase from "@/components/Showcase";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grain">
        <Hero />
        <Coverage />
        <Marquee />
        <Tools />
        <Showcase />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
