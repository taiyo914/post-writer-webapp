"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import 'swiper/css/navigation'; //ナビゲーション（左右の矢印）のスタイル
import 'swiper/css/pagination';

const VerticalSwiper = () => {
  return (
    <Swiper
      direction="vertical"
      navigation
      modules={[Navigation]}
      className="w-full h-64"
    >
      <SwiperSlide>
        <div className="h-full flex items-center justify-center bg-blue-500 text-white">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full flex items-center justify-center bg-green-500 text-white">Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-full flex items-center justify-center bg-red-500 text-white">Slide 3</div>
      </SwiperSlide>
      {/* Add navigation buttons */}
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
};

export default VerticalSwiper;
