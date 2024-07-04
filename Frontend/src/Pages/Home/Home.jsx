import Blob from "../../Componants/Blob/Blob";
import HeroSection from "../../Componants/HeroSection/HeroSection";
import Offer from "../../Componants/Offer/Offer";
import TopItem from "../../Componants/TopItems/TopItem";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <Blob/>
      <TopItem/>
      <Offer/>
    </div>
  );
}
