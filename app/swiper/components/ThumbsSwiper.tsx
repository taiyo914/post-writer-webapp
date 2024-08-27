"use client"

import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Card 1</h2>
            <p className="mt-2 text-sm text-gray-600">This is the content of Card 1.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Card 2</h2>
            <p className="mt-2 text-sm text-gray-600">This is the content of Card 2.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Card 3</h2>
            <p className="mt-2 text-sm text-gray-600">This is the content of Card 3.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Card 4</h2>
            <p className="mt-2 text-sm text-gray-600">This is the content of Card 4.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold">Card 5</h2>
            <p className="mt-2 text-sm text-gray-600">This is the content of Card 5.</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        // onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="p-2 bg-gray-200 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold">Card 1</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-2 bg-gray-200 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold">Card 2</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-2 bg-gray-200 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold">Card 3</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-2 bg-gray-200 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold">Card 4</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-2 bg-gray-200 rounded-lg shadow-md text-center">
            <h2 className="text-sm font-semibold">Card 5</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
