import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { GetServerSideProps } from "next";
import prisma from "./lib/prisma";

type Input = {
  searchItem: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const allRecipes = await prisma.recipe.findMany();
  console.log(allRecipes, "console");
  return {
    props: { allRecipes },
  };
};

export default function Searchbar(props: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { reset, register } = useForm<Input>();
  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  console.log({ props }, "hell");
  return (
    <div>
      <form autoComplete="off">
        <div className="text-center font-serif  md:mt-26 my-16">
          <div className="md:text-4xl text-2xl mb-4">
            Search Out Your Desireable Recipe
          </div>

          <div className=" max-w-sm md:max-w-lg  m-auto md:px-0 px-6">
            <div className="relative w-full flex ">
              <input
                {...register("searchItem")}
                placeholder="what would you like to eat"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="
              hover:border-red
            form-input
             w-full
            border
            capitalize ...
            border-slate-300
                    rounded
                    mt-1
                     px-4
                    py-3"
                required
              ></input>
              <button className="absolute  inset-y-0 right-0 pr-3">
                <SearchIcon style={{ color: "gray" }} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
