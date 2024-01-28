import prisma from "@/pages/lib/prisma";

export default async function handle(req: any, res: any) {
  const recipeId = req.query.id;
  if (req.method === "DELETE") {
    const recipe = await prisma.recipe.delete({
      where: { id: recipeId },
    });
    res.json(recipe);
  } else if (req.method === "PUT") {
    const updateRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { published: true },
    });
    res.json(updateRecipe);
  }
}
