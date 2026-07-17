import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkedWith from "@/components/WorkedWith";
import FeaturedWork from "@/components/FeaturedWork";
import ArticlesPreview from "@/components/ArticlesPreview";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import TelemetryBar from "@/components/TelemetryBar";
import AvailableBadge from "@/components/AvailableBadge";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles().slice(0, 4);

  return (
    <>
      <Header />
      <main className="grain">
        <Hero />
        <WorkedWith />
        <FeaturedWork />
        <ArticlesPreview articles={articles} />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AvailableBadge />
      <TelemetryBar />
    </>
  );
}
