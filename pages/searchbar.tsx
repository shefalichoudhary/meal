import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { url } from "inspector";

type Input = {
  searchItem: string;
};

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState<any>([]);

  const { register } = useForm<Input>();
  const handleChange = (event: any) => {
    setQuery(event.target.value);
    handleSearch(event.target.value);
  };

  const handleSearch = async (searchQuery: any) => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data);
      setSearch(searchQuery);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mb-8 ">
      <form autoComplete="off">
        <div className="text-center font-serif   md:mt-26 ">
          <div className=" max-w-sm md:max-w-lg   m-auto md:px-0 px-6">
            <div className="relative w-full flex ">
              <input
                {...register("searchItem")}
                placeholder="what would you like to eat"
                type="text"
                value={query}
                onChange={handleChange}
                className="
            form-input
             w-full
            border
            capitalize ...
            border-slate-300
            font-sans
                    rounded
                    mt-1
                     px-4
                     
                    py-3"
                required
              ></input>

              <button className="absolute  inset-y-0 right-0 pr-3">
                <SearchIcon style={{ color: " rgb(16 185 129)" }} />
              </button>
            </div>

            <ul className=" mt-4 shadow-sm  text-base ">
              {searchResults.length === 0 && query && (
                <p className=" py-4 text-slate-600">
                  No results found for "{search}"
                </p>
              )}
              {searchResults.map((recipe: any, index: any) => (
                <a href={`/recipe/${recipe.id}`}>
                  <li
                    key={index}
                    className=" text-emerald-900 pb-2 hover:bg-emerald-600 hover:text-white capitalize  mb-1 "
                  >
                    <div>{recipe.title}</div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
