// pages/api/search.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { query } = req.query;

  try {
    const results = await prisma.recipe.findMany({
      where: {
        title: { contains: query },
      },
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
