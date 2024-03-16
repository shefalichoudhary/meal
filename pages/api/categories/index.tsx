import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/pages/lib/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const categories = await prisma.recipe.findMany({
      distinct: ["category"],
      select: {
        category: true,
      },
    });
    const uniqueCategories = categories.map((c) => c.category);
    return res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
