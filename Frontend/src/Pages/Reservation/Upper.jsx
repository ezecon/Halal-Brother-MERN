import { Carousel } from "@material-tailwind/react";


export default function Upper() {
  return (
    <div className="relative">
      <Carousel loop={true} autoplay={true} className="rounded-xl">
        <div className="relative h-full">
          <img
            src="https://bimpos.com/sites/default/files/images/posts/5ffdc91e-ef5f-48d0-bba0-a33ac3121705.jpeg"
            alt="image 1"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>

        <div className="relative h-full">
          <img
            src="https://www.liveabout.com/thmb/l9yK5fbahqhtJiI0xprxCIuhJ7U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/reserved-sign-on-restaurant-table-534761709-d4ef78d8a57743429658561abb9f615e.jpg"
            alt="image 3"
            className="h-full w-full object-cover object-center rounded-xl blur-img"
          />
        </div>
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="" id="hero">
          <h1 className="mb-8 text-7xl text-center playwrite-gb-s-regular">Reservations<span></span></h1><br />
          <p className="mb-8 text-xl crimson text-center playwrite-gb-s-regular">Reserve your table for Tomorrow</p>
        </div>
      </div>
    </div>
  )
}
