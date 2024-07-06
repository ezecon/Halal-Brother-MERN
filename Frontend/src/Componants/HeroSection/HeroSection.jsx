import { Carousel } from "@material-tailwind/react";

export function HeroSection() {
  return (
    <div className="relative">
      <Carousel loop={true} autoplay={true} className="rounded-xl">
        <div className="relative h-full">
          <img
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="image 1"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
        <div className="relative h-full">
          <img
            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="image 2"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
        <div className="relative h-full">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 3"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-left" id="hero">
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl">Hello, <span></span></h1>
          <h1 className="sm:text-5xl md:text-6xl lg:text-7xl">Welcome to <span></span></h1>
          <h1 className="mb-8 sm:text-5xl md:text-6xl lg:text-7xl">Halal Brothers <span></span></h1>
          <a className="mb-10 text-white get-button">Get Started</a>
        </div>
      </div>
    </div>
  );
}
