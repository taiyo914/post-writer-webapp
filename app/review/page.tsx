"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CardSlider = () => {
    const cards = [
        "word",
        "meaning",
        "example",
        "translation",
        "memo",
        "next word",
    ];

    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{
                    type: 'progressbar',
                }}
                className="w-full max-w-4xl h-3/4"
            >
                {cards.map((card, i) => (
                    <SwiperSlide key={i}>
                        <div className="w-full h-full bg-white shadow-lg flex items-center justify-center text-2xl">
                            {card}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSlider;
