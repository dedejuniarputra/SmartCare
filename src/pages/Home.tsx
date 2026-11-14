import Contact from "../components/Contact";
import Hero from "../components/Hero";
import OrderFlow from "../components/OrderFlow";
import Satisfaction from "../components/Satisfaction";
import Services from "../components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <OrderFlow />
      <Services />
      <Satisfaction />
      <Contact />
    </>
  );
}

