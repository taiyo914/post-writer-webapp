import Link from "next/link";
import VocabList from "./components/VocabList";

export default function Home() {
  return (
    <div className="p-4 ">
      <div className="flex justify-center space-x-2 mb-4 p-1">
        <Link href="new" className="text-center w-1/2 py-2  font-semibold rounded-md shadow-md hover:bg-gray-200  transition-colors duration-300 border">
          Add New Vocab
        </Link>
        <Link href="review" className="text-center w-1/2 py-2 border font-semibold rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300">
          ➞ Review 
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
