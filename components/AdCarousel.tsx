"use client";

import * as React from "react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Dollars from "@/components/icons/Dollars";
import TargetAudienceIcon from "./icons/TargetAudienceIcon";
import ExpectedOutcomeIcon from "./icons/ExpectedOutcomeIcon";

const cards = [
  {
    title: "Ads on a budget",
    desc: "Stretch your brand reach, get noticed without overspending.",
    icon: <Dollars />,
    image: "/budget-man.png",
  },
  {
    title: "Targeted Audience",
    desc: "Deliver ads to specific location, demographics and interests.",
    icon: <TargetAudienceIcon />,
    image: "/targeted-audience.png",
  },
  {
    title: "Expected outcome",
    desc: "Sell more, close more deals, increase your ROI without hassle.",
    icon: <ExpectedOutcomeIcon />,
    image: "/expected-outcome.png",
  },
];

const AdCarousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = useRef<CarouselApi | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!carouselRef.current) return;

    const embla = carouselRef.current;
    const handleSelect = () => {
      setActiveIndex(embla.selectedScrollSnap());
    };

    embla.on("select", handleSelect);
    handleSelect(); // initialize
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
        setApi={(api) => (carouselRef.current = api)}
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem key={index}>
              <div className="bg-primary rounded-xl p-4 flex justify-between items-center relative h-[149px]">
                {/* Text */}
                <div className="flex flex-col justify-center h-full w-[317px]">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <h2 className="text-sm font-bold text-white">
                      {card.title}
                    </h2>
                  </div>
                  <p className="text-xs font-normal text-white py-2 w-[133px]">
                    {card.desc}
                  </p>
                </div>

                {/* Image */}
                <div className="absolute bottom-0 right-4 w-[133px] h-[145px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={133}
                    height={145}
                    className="object-contain"
                  />
                </div>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {cards.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                        activeIndex === index ? "bg-white" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AdCarousel;
