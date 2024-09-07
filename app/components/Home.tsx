import { InitialInfoProps } from "@/types/Types";
import Header from "./header/Header";
import TopButtons from "./TopButtons";
import Display from "./display/Display";
import Footer from "./Footer";
import BottomButton from "./BottomBottun";

export default function Home({ initialWords, userId, initialUserWordsSettings }: InitialInfoProps) {
  return (
    <>
      <Header />
      <TopButtons />
      <Display
        userId={userId}
        initialUserWordsSettings={initialUserWordsSettings}
        initialWords={initialWords}
      />
      <BottomButton/>
      <Footer/>
    </>
  );
}
