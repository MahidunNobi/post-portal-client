import { useState } from "react";

const Servay = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className="py-3 border-b border-gray-200">
      <span className="text-sm text-gray-400"> 1 day Ago</span>
      <h3 className="text-3xl font-roboto-title font-medium my-1">
        Post survey
      </h3>
      <p className="mt-4">Which type of content do you enjoy most</p>
      <div className="flex flex-col gap-3">
        <button
          className={`w-full max-w-sm border-2 p-3 flex justify-between ${
            selected === "Technology" ? "border-green-500 text-green-500" : ""
          }`}
          onClick={() => {
            !selected && setSelected("Technology");
          }}
        >
          Technology
          {selected && <span> 76% </span>}
        </button>
        <button
          className={`w-full max-w-sm border-2 p-3 flex justify-between ${
            selected === "Travel" ? "border-green-500 text-green-500" : ""
          }`}
          onClick={() => {
            !selected && setSelected("Travel");
          }}
        >
          Travel
          {selected && <span> 76% </span>}
        </button>
      </div>
    </div>
  );
};

export default Servay;
