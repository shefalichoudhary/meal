// pages/api/add-recipe.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { data } = req.body;

  const { title, category, directions, ingredients } = data;

  try {
    // Create the recipe
    const recipe = await prisma.recipe.create({
      data: {
        title,
        category,
        directions,
      },
    });

    // Create ingredients and associate them with the recipe
    for (const ingredient of ingredients) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: ingredient.value,
        },
      });
    }

    return res
      .status(201)
      .json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
