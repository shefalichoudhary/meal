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
          ingredient: true,
        },
      },
    },
  });

  return {
    props: { recipe },
  };
};

// Function to delete the recipe after confirmation
async function deleteRecipe(id: number): Promise<void> {
  await fetch(`/api/recipe/${id}`, {
    method: "DELETE",
  });
  Router.push("/recipes");
}

// Modal component
const DeleteModal = ({ show, onClose, onDelete, recipeTitle }: any) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <h2 className="text-xl font-bold mb-4">Delete Recipe</h2>
        <p className="mb-4">
          Are you sure you want to delete the <strong>{recipeTitle}</strong>{" "}
          recipe?
        </p>
        <div className="flex justify-center">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md mr-4"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Recipe = ({ recipe }: any) => {
  const { data: session } = useSession();
  const [mode, setMode] = useState(true);
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const handleDelete = () => {
    setShowModal(true); // Show the modal
  };

  const confirmDelete = async () => {
    setShowModal(false); // Close modal before deleting
    await deleteRecipe(recipe.id);
  };

  return (
    <div className="mt-8 mb-28">
      {/* Modal for delete confirmation */}
      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onDelete={confirmDelete}
        recipeTitle={recipe.title}
      />

      <h1 className="mb-2 font-md text-3xl md:mb-8 text-center tracking-widest capitalize">
        {recipe.title}
      </h1>
      <div className="max-w-sm md:max-w-3xl lg:max-w-5xl text-lg pt-7 grid md:grid-cols-2 mx-auto">
        <div className="mb-3 md:mx-12">
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              height={500}
              width={550}
              className="rounded"
            />
          )}
        </div>
        <div className="">
          <button
            className={`border border-slate-900 mr-2 px-5 py-3 text-sm font-medium rounded tracking-widest ${
              mode ? "bg-emerald-800 text-white" : ""
            }`}
            onClick={() => setMode(true)}
          >
            Ingredients
          </button>

          <button
            className={`border border-slate-900 mr-2 px-5 py-3 text-sm font-medium rounded tracking-widest ${
              !mode ? "bg-emerald-800 text-white" : ""
            }`}
            onClick={() => setMode(false)}
          >
            Directions
          </button>

          {session && (
            <button type="submit" onClick={handleDelete}>
              <DeleteIcon style={{ fontSize: "32px" }} />
            </button>
          )}

          {mode ? (
            <div className="text-slate-600 pl-5 text-base leading-relaxed mt-4">
              <ul className="list-disc font-sans capitalize">
                {recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient.ingredient.id}>
                    {ingredient.ingredient.veggieName}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-slate-600 text-sm leading-relaxed mt-4">
              {recipe.directions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
