import React from "react";

function MyButton({ type, onClick, name }: any) {
  return (
    <>
      <button
        className="px-6 py-4  text-sm mb-8 font-bold mt-4   bg-emerald-600 hover:bg-emerald-400 rounded-md  tracking-widest    text-white "
        type={type}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
}

export default MyButton;
