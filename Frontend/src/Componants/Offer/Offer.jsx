import { Button } from "@material-tailwind/react";
import offerImage1 from "../../assets/image/Offer1-img.png";
import offerImage2 from "../../assets/image/Offer2-img.png";
import { Link } from "react-router-dom";

export default function Offer() {
  return (
    <div className="flex gap-5">
      <div className="border p-16 w-full relative bg-[#FFF5E1] rounded-lg">
        <div className="relative z-10 space-y-5">
          <div className="p-2 rounded bg-orange-400 inline-block text-white text-xs">
            Free Delivery
          </div>
          <div className="text-3xl font-semibold">Fastest Delivery</div>
          <div className="text-xl text-gray-500">
           Our Rider will <br /> delivery anywhere.
          </div>
          <div>
            <Link to="/products">
              <Button color="green">Shop now</Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-3 z-0">
          <img src={offerImage1} alt="OfferImage1" />
        </div>
      </div>

      <div className="border p-16 w-full relative bg-[#D2EFE1] rounded-lg">
        <div className="relative z-10 space-y-5">
          <div className="p-2 rounded bg-green-400 inline-block text-white text-xs">
            Tasty Food
          </div>
          <div className="text-3xl font-semibold">Organic Food</div>
          <div className="text-xl text-gray-500">
            You may have organic <br /> food.
          </div>
          <div>
            <Link to="/products">
              <Button color="green">Shop now</Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-3 z-0">
          <img src={offerImage2} alt="OfferImage2" />
        </div>
      </div>
    </div>
  );
}
