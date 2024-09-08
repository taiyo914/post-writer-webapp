import { InitialInfoProps } from "@/types/Types";
import Header from "./header/Header";
import TopButtons from "./TopButtons";
import Display from "./display/Display";
import Footer from "./Footer";
import BottomButton from "./BottomBottun";

export default function Home({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <TopButtons />
      <Display
        userId={userId}
        initialUserWordsSettings={initialUserWordsSettings}
        initialWords={initialWords}
      />
      <BottomButton/> {/* 一番最初のdivタグにflex-growがついているので、コンテンツよりスクリーンが長いときはここが伸びます */}
      <Footer/>
    </div>
  );
}
