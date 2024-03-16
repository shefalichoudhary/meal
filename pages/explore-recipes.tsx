import { useEffect, useState } from "react";
import Searchbar from "./searchbar";
function ExploreRecipes() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="  container   mx-auto items-center  md:max-w-4xl max-w-sm text-center py-12  md:py-24 sm:py-18 mb-48 ">
      <div>
        <Searchbar />
        <div className="md:text-4xl text-emerald-900 text-2xl mb-8">
          Search Out Your Desireable Recipe
        </div>
        {categories.map((category) => (
          <span
            key={category}
            className="m-2 px-6 py-2 border-2  text-emerald-800 hover:bg-emerald-600 hover:text-white border-emerald-800 rounded-2xl text-md font-semibold"
          >
            <a href={`/categories/${category}`}>{category}</a>
          </span>
        ))}
      </div>
    </div>
  );
}
export default ExploreRecipes;
