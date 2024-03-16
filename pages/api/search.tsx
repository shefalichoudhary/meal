// pages/api/search.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { query } = req.query;

  try {
    const results = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true, // Include the Ingredient model
          },
        },
      },
      where: {
        OR: [
          {
            title: { contains: query },
          },
          {
            category: {
              contains: query, // Search in the category field
            },
          },
          {
            ingredients: {
              some: {
                ingredient: {
                  // Update to the correct property name
                  veggieName: {
                    contains: query, // Search in the veggieName field
                  },
                },
              },
            },
          },
        ],
      },
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
