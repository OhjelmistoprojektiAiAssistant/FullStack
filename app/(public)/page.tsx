import reviews from "@/app/(public)/components/frontpage/data/TestimonialData";
import FeaturesGrid from "@/app/(public)/components/frontpage/FeaturesGrid";
import FooterBottom from "@/app/(public)/components/frontpage/FooterBottom";
import Hero from "@/app/(public)/components/frontpage/Hero";
import Navbar from "@/app/(public)/components/frontpage/NavBar";
import Testimonials from "@/app/(public)/components/frontpage/Testimonial";

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
