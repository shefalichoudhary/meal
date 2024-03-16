"use client";
import { GetServerSideProps } from "next";
import prisma from "@/pages/lib/prisma";
import DeleteIcon from "@mui/icons-material/Delete";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      ingredients: {
        include: {
          ingredient: true, // Include the Ingredient model
        },
      },
    },
  });

  return {
    props: { recipe },
  };
};

async function deleteRecipe(id: number): Promise<void> {
  await fetch(`/api/recipe/${id}`, {
    method: "DELETE",
  });
  Router.push("/recipes");
}

const Recipe = ({ recipe }: any) => {
  const { data: session } = useSession();
  const [mode, setMode] = useState(true);

  if (session) {
    return (
      <div className="mt-8 mb-28">
        <h1 className="font-thin text-3xl my-3  text-center tracking-widest text-emerald-800">
          Recipe
        </h1>
        <div className=" max-w-sm md:max-w-3xl lg:max-w-5xl text-lg pt-7 grid md:grid-cols-2 mx-auto gap-2 ">
          <div className="md:mx-10 mt-2">
            <div className=" text-2xl mb-3  capitalize... tracking-widest text-emerald-800">
              {recipe.title}
            </div>

            <div className=" py-24  border border-black"></div>
          </div>
          <div className="">
            <button
              className={`border  
            border-slate-900 
            mr-5 px-6 py-4  text-sm  font-medium my-4 rounded tracking-widest    ${
              mode === true ? " bg-emerald-800 text-white  " : " "
            }`}
              onClick={() => {
                setMode(true);
              }}
            >
              Ingredients
            </button>

            <button
              className={`border  
            border-slate-900 
            mr-5 px-6 py-4  text-sm my-4 font-medium  rounded tracking-widest   ${
              mode === false ? "text-white  bg-emerald-800" : ""
            }`}
              onClick={() => {
                setMode(false);
              }}
            >
              Directions
            </button>
            <button type="submit" onClick={() => deleteRecipe(recipe.id)}>
              <DeleteIcon style={{ fontSize: "32px" }} />
            </button>
            {mode ? (
              <div className="text-slate-600  pl-5 text-base leading-relaxed ...  ">
                <ul className="list-disc font-sans  capitalize ...">
                  {recipe.ingredients.map((ingredient: any) => (
                    <li key={ingredient.id}>
                      {ingredient.ingredient.veggieName}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <>
                <div className="text-slate-600  pr-24 text-sm leading-relaxed ...  ">
                  {recipe.directions}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8 mb-28">
      <h1 className="font-light text-2xl mb-8  text-center tracking-widest">
        Recipe
      </h1>
      <div className=" max-w-sm md:max-w-3xl lg:max-w-5xl text-lg pt-7 grid md:grid-cols-2 mx-auto ">
        <div className="md:mx-14 mt-3">
          <div className=" text-xl mb-3  capitalize... tracking-widest">
            {recipe.title}
          </div>
          <div className=" py-24  border border-black"></div>
        </div>
        <div className="">
          <button
            className={`border  
            border-slate-900 
            mr-5 px-6 py-4  text-sm my-4 font-medium  rounded tracking-widest  ${
              mode === true ? " bg-emerlad-800 text-white" : ""
            }`}
            onClick={() => {
              setMode(true);
            }}
          >
            Ingredients
          </button>

          <button
            className={`border  
            border-slate-900 
            mr-5 px-6 py-4  text-sm my-4 font-medium  rounded tracking-widest    ${
              mode === false ? "text-white  bg-emerald-800" : ""
            }`}
            onClick={() => {
              setMode(false);
            }}
          >
            Directions
          </button>
          {mode ? (
            <div className="text-slate-600  pl-5 text-base leading-relaxed ...  ">
              <ul className="list-disc font-sans  capitalize ...">
                {recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient.id}>
                    {ingredient.ingredient.veggieName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <div className="text-slate-600  text-sm leading-relaxed ...  ">
                {recipe.directions}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Recipe;
