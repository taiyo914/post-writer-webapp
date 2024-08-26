"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { wordsData } from "../data/wordsData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from 'swiper';

const SwiperComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [priorityValues, setPriorityValues] = useState(
    wordsData.map((item) => item.priority)
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriority = parseInt(e.target.value, 10);
    setPriorityValues((prev) => {
      const newValues = [...prev];
      const cardIndex = Math.floor(activeIndex / 5); // 各cardの基準に基づくindexを取得
      newValues[cardIndex] = newPriority;
      return newValues;
    });
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="h-screen p-4 flex flex-col items-center ">
      <Swiper
        navigation
        pagination={{ clickable: true ,  type: "progressbar" }}
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination]}
        className="w-full max-w-3xl h-3/5 border p-2 rounded-lg"
      >
        {wordsData.map((card, i) => (
          <React.Fragment key={i}>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">Word</div>
              <div className="h-full flex items-center justify-center text-3xl -mt-8 px-20">
                <div className="font-bold">{card.word}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">Meaning</div>
              <div className="w-full h-full  flex items-center justify-center text-3xl -mt-8 px-20">
                <div className="font-bold">{card.meaning}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide> 
            <div className="text-gray-400 pt-3 pl-3 ">Example</div>
              <div className="w-full h-full flex items-center justify-center text-2xl -mt-8 px-20">
                <div className="leading-normal">{card.example}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">Translation</div>
              <div className="w-full h-full flex items-center justify-center text-2xl -mt-8 px-20">
                <div className="leading-normal">{card.exampleTranslation}</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-gray-400 pt-3 pl-3 ">Memo</div>
              <div className="w-full h-full flex items-center justify-center text-xl -mt-8 px-20">
                <div className="leading-normal">{card.note}</div>
              </div>
            </SwiperSlide>
          </React.Fragment>
        ))}
      </Swiper>

      <div className="mt-4 w-full text-center flex justify-center">
        <input
          type="range"
          name="priority"
          min="0"
          max="10"
          value={priorityValues[Math.floor(activeIndex / 5)]}
          onChange={handleSliderChange}
          className="w-2/3"
        />
        <div className="px-2">{priorityValues[Math.floor(activeIndex / 5)]}</div>
      </div>
    </div>
  );
};

export default SwiperComponent;
