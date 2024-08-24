import Image from "next/image";

const wordsData = [
  {
    word: "Break the ice",
    meaning: "緊張をほぐす",
    example: "At the beginning of the meeting, she tried to break the ice by telling a joke.",
    exampleTranslation: "会議の冒頭で、彼女はジョークを言って緊張をほぐそうとしました。",
    note: "初対面の人との会話や、緊張感のある場面で使えるフレーズ。",
    priority: 10
  },
  {
    word: "Run out of",
    meaning: "使い果たす",
    example: "We ran out of sugar, so I had to borrow some from a neighbor.",
    exampleTranslation: "砂糖を使い果たしてしまったので、隣人から少し借りなければなりませんでした。",
    note: "食品や日用品などがなくなる時によく使う表現。",
    priority: 9
  },
  {
    word: "Apple",
    meaning: "りんご",
    example: "An apple a day keeps the doctor away.",
    exampleTranslation: "一日一個のりんごで医者いらず。",
    note: "健康に良い食習慣を表す有名な諺。",
    priority: 8
  },
  {
    word: "Take it for granted",
    meaning: "当たり前に思う",
    example: "You shouldn't take your family for granted, always appreciate them.",
    exampleTranslation: "家族を当たり前に思わないで、常に感謝の気持ちを持ちましょう。",
    note: "感謝の気持ちを忘れないことの大切さを強調する際に使う。",
    priority: 10
  },
  {
    word: "Cut corners",
    meaning: "手を抜く",
    example: "If you cut corners on this project, the quality will suffer.",
    exampleTranslation: "このプロジェクトで手を抜いたら、品質が悪くなります。",
    note: "仕事や作業で、効率を優先して品質や安全性を犠牲にする状況に使う。",
    priority: 9
  },
  {
    word: "Orange",
    meaning: "オレンジ",
    example: "Oranges are a great source of Vitamin C.",
    exampleTranslation: "オレンジはビタミンCの優れた供給源です。",
    note: "柑橘類の一種で、風邪予防に効果的な果物として知られています。",
    priority: 8
  },
  {
    word: "Bite the bullet",
    meaning: "苦しい状況を我慢する",
    example: "Sometimes you just have to bite the bullet and get the job done.",
    exampleTranslation: "時には我慢して仕事を終わらせるしかないこともあります。",
    note: "嫌なことや難しい状況に立ち向かう時に使われるフレーズ。",
    priority: 9
  },
  {
    word: "Turn a blind eye",
    meaning: "見て見ぬふりをする",
    example: "The manager turned a blind eye to the employees' mistakes.",
    exampleTranslation: "マネージャーは従業員のミスを見て見ぬふりをしました。",
    note: "問題を見て見ぬふりすることで、事態を悪化させる状況を示す。",
    priority: 8
  },
  {
    word: "Piece of cake",
    meaning: "朝飯前",
    example: "Fixing this bug will be a piece of cake for our senior developer.",
    exampleTranslation: "このバグを修正するのは、私たちのシニアデベロッパーにとって朝飯前です。",
    note: "簡単なことを指すカジュアルな表現。",
    priority: 7
  },
  {
    word: "Out of the blue",
    meaning: "突然に",
    example: "He called me out of the blue after three years of no contact.",
    exampleTranslation: "3年間連絡がなかったのに、彼が突然電話をしてきました。",
    note: "予期せぬ出来事を表現するのに使います。",
    priority: 8
  }
];

export default function Home() {
  return (
    <div className="p-4  min-w-[1200px]">
      <div className="bg-white rounded-lg p-6 border shadow-md">
      <div className="flex items-center mb-2">
          <div className="w-10 mr-4"></div> {/* 優先度の位置合わせ用 */}
          <div className="flex-1 grid grid-cols-8 px-4">
            <div className="col-span-1 font-bold text-center pr-3">語句 </div>
            <div className="col-span-1 font-bold text-center px-3">意味 </div>
            <div className="col-span-2 font-bold text-center px-3">例文 </div>
            <div className="col-span-2 font-bold text-center px-3">例文訳 </div>
            <div className="col-span-2 font-bold text-center px-3">メモ </div>
          </div>
        </div>
        <div className="space-y-3">
          {wordsData.map((word, index) => (
            <div key={index} className="flex items-center ">
              <div className="flex justify-center items-center h-10 w-10 bg-gray-300 rounded-full text-lg font-bold mr-4">
                {word.priority}
              </div>
              <div className="flex-1 grid grid-cols-8 border-gray-200 bg-white border shadow rounded-lg px-4 py-3">
                <div className="col-span-1 flex items-center  border-r border-gray-200 pr-3 font-bold">
                  {word.word}
                </div>
                <div className="col-span-1 flex items-center justify-center border-r border-gray-200 px-3">
                  {word.meaning}
                </div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-200 px-3 text-sm">
                  {word.example}
                </div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-200 px-3 text-sm">
                  {word.exampleTranslation}
                </div>
                <div className="col-span-2 flex items-center pl-3 text-sm">
                  {word.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
