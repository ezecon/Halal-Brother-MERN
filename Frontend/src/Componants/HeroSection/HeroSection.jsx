import { Carousel } from "@material-tailwind/react";

export function HeroSection() {
  return (
    <div className="relative">
      <Carousel loop={true} autoplay={true} className="rounded-xl">
        <div className="relative h-full">
          <img
            src="https://i.ibb.co/GHvD6LM/347639460-728357819047403-8647272535606713979-n.jpg"
            alt="image 1"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
        <div className="relative h-full">
          <img
            src="https://i.ibb.co/BBP8Qh1/345634909-3111444509157303-9011771167180568470-n.jpg"
            alt="image 2"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
        <div className="relative h-full">
          <img
            src="https://i.ibb.co/rFR6R2M/352380162-728357882380730-5544731208207000603-n.jpg"
            alt="image 3"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-left" id="hero">
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl playwrite-gb-s-regular">Hello, <span></span></h1>
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl playwrite-gb-s-regular">Welcome to <span></span></h1>
          <h1 className="mb-8 sm:text-5xl md:text-6xl lg:text-7xl playwrite-gb-s-regular">Halal Brothers <span></span></h1>
        </div>
      </div>
    </div>
  );
}
