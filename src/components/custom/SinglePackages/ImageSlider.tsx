import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import React from "react";

const ImageSlider: React.FC<{ carouselImages: string[] }> = ({
  carouselImages,
}) => {
  return (
    <Carousel
      // withIndicators
      sx={{
        position: "relative",
      }}
      height={305}
      slideSize="100%"
      slideGap="md"
      loop
      withControls={false}
      slidesToScroll={1}
      withIndicators
    >
      {carouselImages?.map((carouselData, idx: number) => (
        <Carousel.Slide key={idx}>
          <Image
            src={carouselData}
            alt="single_image"
            width={100}
            height={100}
            className="w-full h-[300px] rounded-2xl"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
