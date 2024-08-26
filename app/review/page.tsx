"use client";
import { useState, ChangeEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { wordsData } from "../data/wordsData";

const CardSlider = () => {
  const [slider, setSlider] = useState(0);
  const cards = [
    "word",
    "meaning",
    "example",
    "translation",
    "memo",
    "next word",
    "Break the ice",
    "緊張をほぐす",
    "At the beginning of the meeting, she tried to break the ice by telling a joke.",
    "会議の冒頭で、彼女はジョークを言って緊張をほぐそうとしました。",
    "初対面の人との会話や、緊張感のある場面で使えるフレーズ。",
  ];

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlider(Number(e.target.value));
  };

  return (
    <>
      <div className="h-screen p-4 flex flex-col items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ type: "progressbar" }}
          className="w-full max-w-3xl h-4/5 border p-2 rounded-lg"
        >
          {cards.map((card, i) => (
            <>
              <SwiperSlide key={i}>
                <div className="w-full h-full bg-white shadow-lg flex items-center justify-center text-2xl flex-col px-20 pt-3">
                  <div className="mb-4">{card}</div>
                  <div className="flex w-full items-center justify-center absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <input
                      type="range"
                      name="rating"
                      min="0"
                      max="10"
                      value={slider}
                      onChange={handleSliderChange}
                      className="w-3/5  "
                    />
                    <div className="px-2">{slider}</div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardSlider;
