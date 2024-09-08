import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center w-screen h-screen" >
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
}
