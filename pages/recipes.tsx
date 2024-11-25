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
  console.log({ recipes }, "fetchings");
  return (
    <div className="mt-5 mb-48 md:max-w-3xl sm:max-w-lg max-w-sm mx-auto">
      <h1 className="font-light text-3xl mb-8  text-center tracking-widest">
        Recipes
      </h1>
      <div className="  grid  sm:grid-cols-2 md:grid-cols-3 pt-2 gap-4  mx-auto font-serif ">
        {recipes.map((recipe: any) => (
          <a key={recipe.id} href={`/recipe/${recipe.id}`}>
            <div className=" text-black shadow-md mx-auto py-3 px-1 ">
              <div
                className="bg-cover bg-center h-56 w-full"
                style={{
                  backgroundImage: `url(${recipe.image})`,
                }}
              ></div>
              <div className=" text-2xl mt-1  truncate capitalize">
                {recipe.title}
              </div>
              <div className="text-sm"> Category: {recipe.category}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
