import React from "react";

function MyButton({ type, variant = "primary", onClick, name }: any) {
  return (
    <>
      <button
        className="px-4 py-3  text-md mb-8  mt-4   bg-emerald-600 hover:bg-emerald-400 rounded-md  tracking-widest    text-white "
        type={type}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
}

export default MyButton;
