import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { title, category, directions, image, ingredients } = req.body.data;
  console.log({ image }, "consoling");

  try {
    // Create the recipe in the database
    const recipe = await prisma.recipe.create({
      data: {
        title,
        category,
        directions,
        image, // Save the image path in the database
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
    console.error("Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
}
