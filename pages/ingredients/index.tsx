import React, { useState, useEffect } from "react";

export default function Ingredients() {
  const [veggieOptions, setVeggieOptions] = useState([]);

  useEffect(() => {
    const fetchVeggies = async () => {
      try {
        const resp = await fetch("/api/veggies");
        const { vegetables } = await resp.json();
        const veggies = vegetables.map((vegetable: any) => ({
          id: vegetable.id,
          name: vegetable.veggieName,
        }));
        setVeggieOptions(veggies);
      } catch (error) {
        console.error("Error fetching veggies:", error);
      }
    };

    fetchVeggies();
  }, []);

  return (
    <div className=" sticky  shadow-lg  h-full w-1/7 ">
      <div className="text-center text-slate-600 text-md leading-relaxed mt-6 mb-8">
        Select by Veggies
      </div>

      <div className="flex flex-wrap ml-2  ">
        {veggieOptions.map((vegetable: any) => (
          <div key={vegetable.id} className=" p-1 ">
            <button className="border-2 px-3 py-2">{vegetable.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
