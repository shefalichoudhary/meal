import { useEffect, useState } from "react";
import Searchbar from "./searchbar";
import Ingredients from "./ingredients";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function ExploreRecipes() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [showIngredients, setShowIngredients] = useState(true);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

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

  const handleCategoryClick = async (category: any) => {
    try {
      const response = await fetch(`/api/categories/${category}`);
      const data = await response.json();
      setRecipes(data);
      setSelectedCategory(category);
    } catch (error) {
      console.error(`Error fetching recipes for category ${category}:`, error);
    }
  };

  return (
    <div className="flex">
      <div
        onClick={toggleIngredients}
        className="  cursor-pointer text-emerald-800  md:hidden "
      >
        {showIngredients ? <MenuIcon /> : <CloseIcon />}
      </div>
      <div
        className={`  md:flex md :items-center tracking-wide   font-sans  ${
          showIngredients ? "hidden" : "static"
        }`}
      >
        <Ingredients />
      </div>

      <div className="w-full md:w-4/5 p-8 mx-auto">
        <div className="container mx-auto items-center md:max-w-4xl max-w-sm text-center py-12 md:py-20 sm:py-18 mb-48">
          <div>
            <Searchbar />
            <div className="md:text-4xl text-emerald-900 text-2xl mb-8">
              Search Out Your Desireable Recipe
            </div>
            {categories.map((category: any) => (
              <span
                key={category}
                className="m-2 px-4  py-2 border-2 text-emerald-800 hover:bg-emerald-600 hover:text-white border-emerald-800 rounded-2xl text-md font-semibold tracking-widest"
                onClick={() => handleCategoryClick(category)}
              >
                <span className="capitalize">{category}</span>
              </span>
            ))}
          </div>
          {selectedCategory && (
            <div className="mt-16 mb-38 md:max-w-3xl sm:max-w-lg max-w-sm mx-auto">
              <h1 className="font-light text-3xl mb-10 text-center tracking-widest">
                Recipes for {selectedCategory}
              </h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 pt-2 gap-4 mx-auto font-serif">
                {recipes.map((recipe: any, index) => (
                  <a key={index} href={`/recipe/${recipe.id}`}>
                    <div
                      className="text-black shadow-md mx-auto pt-14 pb-6 px-8"
                      style={{
                        backgroundImage: `url(${recipe.image})`,
                      }}
                    >
                      <div className="text-2xl mb-2 truncate capitalize">
                        {recipe.title}
                      </div>
                      <a
                        href={`/recipe/${recipe.id}`}
                        className="m-2 px-2 py-1 border-2 text-emerald-800 hover:bg-emerald-600 hover:text-white border-emerald-800 rounded-2xl text-sm font-semibold tracking-widest"
                      >
                        Get Recipe
                      </a>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreRecipes;
