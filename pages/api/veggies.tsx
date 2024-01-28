import prisma from "@/pages/lib/prisma";
import { Ingredient } from "@prisma/client";

export default async function handle(req: any, res: any) {
  if (req.method === "GET") {
    //THIS IS FOR GETTING THE VALUES FOR THE SELECT

    let data: Ingredient[] = [];
    data = (await prisma?.ingredient.findMany()) as Ingredient[];
    return res.status(200).json({ vegetables: data });
  }
}
