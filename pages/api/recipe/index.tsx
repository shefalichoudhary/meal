import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm({
        uploadDir: path.join(process.cwd(), "public"),
      });
      // Set the upload directory

      form.parse(req, async (err: any, fields: any, files: any) => {
        const { title, category, directions, ingredients } = fields;

        if (!files.image || !files.image.name) {
          return res.status(400).json({ message: "No image uploaded" });
        }

        const imagePath = files.image.path; // Get the path of the uploaded image

        // Move the uploaded image to the desired location
        const newImagePath = path.join(
          process.cwd(),
          "public",
          files.image.name
        );
        fs.renameSync(imagePath, newImagePath);

        // Create the recipe in the database
        const recipe = await prisma.recipe.create({
          data: {
            title,
            category,
            directions,
            image: `/public/${files.image.name}`, // Save the image path in the database
          },
        });

        // Create ingredients and associate them with the recipe
        for (const ingredient of JSON.parse(ingredients)) {
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
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      return res.status(500).json({ message: "Failed to create recipe" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
