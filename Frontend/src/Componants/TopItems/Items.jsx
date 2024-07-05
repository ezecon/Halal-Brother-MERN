import React from "react";
export function Items() {
  const data = [
    {
      imgelink:
        "https://www.bdtask.com/blog/uploads/restaurant-food-combo-offers.jpg",
    },
    {
      imgelink:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjigGuoV1ZheX_VfNSlO3YiLG8igM0ooH4iKqqWlcht60HKL9iVa9kX-v6lLIwYSlA2FY&usqp=CAU",
    },
    {
      imgelink:
        "https://couponswala.com/blog/wp-content/uploads/2022/09/Food-Combo-Offers.jpg",
    },
    {
      imgelink:
        "https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/allow-customize-combo-depending-on-your-customers-choice.jpg",
    },
    {
      imgelink:
        "https://www.bdtask.com/blog/assets/plugins/ckfinder/core/connector/php/uploads/images/promote-your-food-combo-offers.jpg",
    },
  ];
 
  const [active, setActive] = React.useState(
    "https://assets.bonappetit.com/photos/61f431cd3c17d5f529cd9042/16:9/w_2496,h_1404,c_limit/20220118%20Lunar%20New%20Year%20Spread%20LEDE.jpg",
  );
 
  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data.map(({ imgelink }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imgelink)}
              src={imgelink}
              className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}