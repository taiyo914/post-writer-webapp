import Link from "next/link";
import VocabList from "./components/VocabList";

export default function Home() {
  return (
    <div className="p-4 ">
      <div className="flex justify-center space-x-2 mb-4 p-1">
        <Link href="new" className="text-center w-1/2 py-2 bg-gray-900 text-white font-semibold rounded-md shadow-md hover:bg-gray-300 hover:text-black transition-colors duration-300">
          Create New Vocab
        </Link>
        <Link href="/" className="text-center w-1/2 py-2 border font-semibold rounded-md shadow-md  hover:bg-gray-300 hover:text-black transition-colors duration-300">
          Review
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl px-3 w-fit">Vocab</h1>
        <Link href="/" className="text-sm font-semibold mb-1 px-2 py-1 rounded-md bg-gray-300 hover:opacity-75">
          Settings
        </Link>
      </div>
      <VocabList />
    </div>
  );
}
