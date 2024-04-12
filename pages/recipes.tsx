import React from "react";
import { GetServerSideProps } from "next";
import prisma from "./lib/prisma";

interface Ingredient {
  id: number;
  veggieName: string;
}

interface Recipe {
  id: number;
  published: boolean;
  title: string;
  category: string;
  directions: string;
  ingredients: Ingredient[]; // Add the ingredients property
}

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany({});

  return {
    props: { recipes },
  };
};

const Recipes = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <div className="mt-12 mb-48 md:max-w-3xl sm:max-w-lg max-w-sm mx-auto">
      <h1 className="font-light text-3xl mb-8  text-center tracking-widest">
        Recipes
      </h1>
      <div className="  grid  sm:grid-cols-2 md:grid-cols-3 pt-2 gap-4  mx-auto font-serif ">
        {recipes.map((recipe: any, index: any) => (
          <a href={`/recipe/${recipe.id}`}>
            <div
              key={index}
              className=" text-black shadow-md mx-auto py-12 px-10  "
            >
              <div className=" text-2xl mb-2  truncate">{recipe.title}</div>
              <div className=" mb-1 "> Category: {recipe.category}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
