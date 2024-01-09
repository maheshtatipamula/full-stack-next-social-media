"use client";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const hotelCards = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1559508551-44bff1de756b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    title: "Studio Room",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 50/Day",
    features: ["Free Wifi", "Free breakfast"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1616940844649-535215ae4eb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    title: "Deluxe Room",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 80/Day",
    features: ["Free Wifi", "Free breakfast"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80",
    title: "King Deluxe Room",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 150/Day",
    features: ["Free Wifi", "Free breakfast", "Discounted Meals"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    title: "Royal Suite",
    description: "Lorem ipsum dolor sit amet, consectur dolori",
    pricingText: "USD 299/Day",
    features: [
      "Free Wifi",
      "Free breakfast",
      "Discounted Meals",
      "MacBook for work use (hotel's property)",
    ],
  },
];

const Stories = () => {
  const sliderSettings = {
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,

    speed: 500,
    responsive: [
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  return (
    <Slider {...sliderSettings} className="w-[80%] mx-auto">
      <div className=" ">
        <Image
          alt={"kqjebfjk"}
          src={
            "https://images.unsplash.com/photo-1461092746677-7b4afb1178f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          }
          height={75}
          width={75}
          className="rounded-full h-[75px] w-[75px] mx-auto  border border-2 border-gray-500 "
        />
        <h1 className="text-center mt-2"> add story</h1>
      </div>
      {hotelCards.map((card, index) => (
        <div key={index} className=" ">
          <Image
            alt={card.title}
            src={card.imageSrc}
            height={75}
            width={75}
            className="rounded-full h-[75px] w-[75px] mx-auto border border-3  border-green-800 "
          />
          <h1 className="text-center mt-2 mr-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {" "}
            mahesh goud thatipamula
          </h1>
        </div>
      ))}
    </Slider>
  );
};

export default Stories;
