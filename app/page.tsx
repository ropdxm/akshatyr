import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Activities from "./components/Activities";
import Accommodation from "./components/Accommodation";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Activities />
        <Accommodation />
        <Location />
      </main>
      <Footer />
    </>
  );
}
