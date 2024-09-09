import { WordType } from "@/types/Types";
import CardsItem from "./CardsItem";
import { motion } from "framer-motion";

const CardsDisplay = ({ fetchingKey, words }: { fetchingKey: number, words: WordType[]}) => {
  console.log("key",fetchingKey)
  if(fetchingKey === 0){
    return (
      <div className="flex flex-col items-center justify-center"> 
        {/* <p>fetchingKeyが0の間この画面が表示されます </p>
        <p>このあとデータをfetchしてfethingKeyが1になり、画面が表示されます</p> */}
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }else{
    return (
      <motion.div
        className="grid xs:gap-4 gap-2 px-4 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        {words.map((word, index) => (
          <CardsItem key={index} word={word} />
        ))}
      </motion.div>
    );
  }
};

export default CardsDisplay;

