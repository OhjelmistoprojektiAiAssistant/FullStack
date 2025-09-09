import reviews from "@/components/frontpage/data/TestimonialData";
import FeaturesGrid from "@/components/frontpage/FeaturesGrid";
import FooterBottom from "@/components/frontpage/FooterBottom";
import Hero from "@/components/frontpage/Hero";
import Navbar from "@/components/frontpage/NavBar";
import Testimonials from "@/components/frontpage/Testimonial";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <Testimonials reviews={reviews} />
      <FooterBottom />
    </div>
  );
}
