import Blob from "../../Componants/Blob/Blob";
import Footer from "../../Componants/Footer/Footer";
import HeroSection from "../../Componants/HeroSection/HeroSection";
import Offer from "../../Componants/Offer/Offer";
import TopItem from "../../Componants/TopItems/TopItem";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      
      <TopItem/>
      <Offer/>
      <Blob/>
      <Footer/>
    </div>
  );
}
