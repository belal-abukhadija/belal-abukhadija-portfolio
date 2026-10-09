import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Writing from "@/components/Writing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageLine from "@/components/PageLine";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const articles = getAllArticles().slice(0, 4);

  return (
    <>
      <Header />
      {/* PageLine measures the sections inside this wrapper to route itself */}
      <div className="relative">
        <PageLine />
        <main>
          <Hero />
          <About />
          <Work />
          <Writing articles={articles} />
          <Contact />
        </main>
        <Footer signature />
      </div>
    </>
  );
}
