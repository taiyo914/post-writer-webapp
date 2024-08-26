"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; //swiper全体のcss
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation'; //ナビゲーション（左右の矢印）のスタイル
import 'swiper/css/pagination'; //ページネーション（現在地の表示）のスタイル
import styles from './SimpleSwiper.module.css';  // モジュールをインポート

const SimpleSwiper: React.FC = () => {
  return (
    <Swiper className="my-4 " 
      loop={true} //ループ設定
      speed={300} //動くスピード ミリ秒で指定
      modules={[Navigation,Pagination]} 
      navigation
      pagination={{ clickable: true }}
      effect = {"flip"}
      keyboard={true}
    >
      <SwiperSlide className="!flex items-center justify-center bg-blue-300 ">
        <div className="w-fit p-20 bg-gray-200">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide className="!flex items-center justify-center  bg-blue-300">
        <div className="w-fit p-20 bg-gray-200">Slide 2</div>
      </SwiperSlide>
      <SwiperSlide className="!flex items-center justify-center  bg-blue-300">
        <div className="w-fit p-20 bg-gray-200">Slide 3</div>
      </SwiperSlide>
      <SwiperSlide className="!flex items-center justify-center  bg-blue-300">
        <div className="w-fit p-20 bg-gray-200">Slide 4</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SimpleSwiper;
