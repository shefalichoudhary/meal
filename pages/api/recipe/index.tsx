import prisma from "@/pages/lib/prisma";

export default async function handle(req: any, res: any) {
  const { data } = req.body;
  const newRecipe = await prisma.recipe.create({
    data,
  });
  console.log(newRecipe, "hello");
  return res.status(201).send(newRecipe);
}
