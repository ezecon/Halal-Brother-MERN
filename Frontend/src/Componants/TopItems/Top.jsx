import { Carousel } from "@material-tailwind/react";
 
export function Top() {
  return (
    <Carousel loop={true} autoplay={true} className="rounded-xl">
      <img
        src="https://www.thespruceeats.com/thmb/UpVWAcHnFEe_KvQpYsR1a7U-WY0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-your-best-grilled-burger-recipe-7511041-hero-C-c5080fa5f97c4c2b908968527f8a851b.jpg"
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />
      <img
        src="https://cdn.tgdd.vn/2021/09/CookDish/cach-bao-quan-pizza-de-banh-pizza-va-cach-ham-nong-banh-pizza-avt-1200x676.jpg"
        alt="image 2"
        className="h-full w-full object-cover object-center"
      />
      <img
        src="https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg"
        alt="image 3"
        className="h-full w-full object-cover object-center"
      />
    </Carousel>
  );
}