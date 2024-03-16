// pages/api/recipes/[category].ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/pages/lib/prisma";

interface CategoryParams {
  category: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        category: { equals: category?.toString() },
      },
    });
    return res.status(200).json(recipes);
  } catch (error) {
    console.error(`Error fetching ${category} recipes:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
