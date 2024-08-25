"use client";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const DataForm: React.FC = () => {
  const [isTSV, setIsTSV] = useState<boolean>(true);
  const [data, setData] = useState<string>("");
  const router = useRouter();

  const handleToggle = (format: "csv" | "tsv"): void => {
    setIsTSV(format === "tsv");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitted Data:", data);
    console.log("Format:", isTSV ? "TSV" : "CSV");
    // ここでデータを送信する
    router.push("/");
  };

  return (
    <div className="py-4 md:px-6 px-4 mx-auto max-w-3xl">
      <div className="px-1 my-2">
        <Link href="/new" className="hover:opacity-65 transition duration-300 ">
          ⬅ back
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 bg-white text-black rounded-md shadow-lg border"
      >
        <h2 className="text-2xl font-bold mb-4">
          Paste your {isTSV ? "TSV" : "CSV"} text
        </h2>
        
        <div className="flex items-center mb-3 space-x-2">
          <button
            type="button"
            onClick={() => handleToggle("tsv")}
            className={`px-4 py-2 rounded-md font-medium ${
              isTSV ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
          >
            TSV
          </button>
          <button
            type="button"
            onClick={() => handleToggle("csv")}
            className={`px-4 py-2 rounded-md font-medium ${
              !isTSV ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
          >
            CSV
          </button>
        </div>
        <p className="mb-4 text-gray-500 text-sm"> 
          {isTSV ? (
            <>
             TSVはデータを<strong>タブ</strong>で区切って記述するファイル形式です
            </>
          ) :(
            <>
              CSVはデータを<strong>カンマ</strong>で区切って記述するファイル形式です
            </>
          )}
        </p>
        <textarea
          className="min-h-80 w-full p-3 h-32 text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:border-black"
          placeholder={
            isTSV
              ? "word1   meaning1   sentence1   sentence_translation1   memo1\nword2   meaning2   sentence2   sentence_translation2   memo2"
              : "word1,meaning1,sentence1,sentence_translation1,memo1\nword2,meaning2,sentence2,sentence_translation2,memo2"
          }
          value={data}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-2/3 mt-4 px-6 py-2 bg-black text-white font-semibold rounded-md hover:opacity-75 focus:outline-none transition"
        >
          Add from {isTSV?"TSV":"CSV"}
        </button>
      </form>
    </div>
  );
};

export default DataForm;
