// pages/recipes/[category].tsx

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  category: string;
  // Other recipe properties
}

interface CategoryProps {
  recipes: Recipe[];
}

export default function Category() {
  const router = useRouter();

  const { category } = router.query;
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!category) return;

      try {
        const res = await fetch(`/api/categories/${category}`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [category]);

  return (
    <div className="mt-12 mb-48 md:max-w-3xl sm:max-w-lg max-w-sm mx-auto">
      <div className="font-light text-3xl mb-8  text-center tracking-widest">
        <h1>{category} Recipes</h1>
      </div>
      <div className="  grid  sm:grid-cols-2 md:grid-cols-3 pt-2 gap-4  mx-auto font-serif ">
        {recipes.map((recipe: any, index: any) => (
          <a href={`/recipe/${recipe.id}`}>
            <div
              key={index}
              className=" bg-emerald-800 text-white shadow-sm mx-auto py-8 px-10  "
            >
              <div className=" mb-1 text-3xl "> {recipe.category}</div>

              <div className=" text-md xl mb-2  truncate">{recipe.title}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
