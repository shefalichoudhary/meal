import Router from "next/router";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import MyButton from "@/components/my-button";

type FormData = {
  id: string;
  title?: string | undefined;
  category?: string | undefined;
  ingredients?: { label: string; value: number }[] | undefined;
  directions?: string | undefined;
  image?: string | undefined;
};

export default function AddRecipe(recipe: FormData) {
  const { control, register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: recipe,
  });

  const [veggieOptions, setveggieOptions] = useState<any>([]);

  const onSubmit = async (data: FormData) => {
    try {
      const body = { data };
      await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      Router.push("/recipes");
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/veggies");
      let { vegetables } = await resp.json();
      let veggies = vegetables.map((vegetable: any) => {
        return {
          value: vegetable.id,
          label: vegetable.veggieName,
        };
      });
      setveggieOptions(veggies);
    })();
  }, []);

  return (
    <div className="container max-w-sm  md:max-w-xl m-auto md:py-8 py-4">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="font-thin text-3xl my-3  text-center tracking-widest text-emerald-800">
          ADD RECIPE
        </div>
        <div className="   grid grid-col-1 pt-2 gap-5 ">
          <label>
            <span className="text-emerald-800">Title</span>
            <input
              type="text"
              className="
            form-input
             w-full
            border
            border-slate-300
                    rounded
                    mt-1
                    p-3"
              required
              {...register("title")}
            ></input>
          </label>

          <label>
            <span className="text-emerald-800">Category</span>
            <select
              className="
              form-select
              
            border
            w-full
            border-slate-300
            bg-white
                    rounded
                    mt-1
                     p-3
                    "
              {...register("category")}
            >
              <option value="">Select...</option>

              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
              <option value="dessert">dessert</option>
            </select>
          </label>
          <label>
            <span className="text-emerald-800">Ingredients</span>

            <Controller
              control={control}
              name="ingredients"
              defaultValue={[]}
              render={({ field: { value, onChange } }) => (
                <Multiselect
                  className="mt-2 "
                  options={veggieOptions}
                  displayValue="label"
                  onSelect={(selected: any) => onChange(selected)}
                  selectedValues={value}
                />
              )}
            />
          </label>
          <label>
            <span className="text-emerald-800">Directions</span>
            <textarea
              className="
             w-full
             border-2
             resize-none
                    rounded 
                    mt-1
                     p-2"
              {...register("directions")}
            />
          </label>
          <label>
            <span className="text-emerald-800">Upload image</span>
            <input
              type="url"
              className="
            form-input
             w-full
            border
            border-slate-300
                    rounded
                    mt-1
                    p-3"
              required
              {...register("image")}
            ></input>
          </label>
        </div>

        <div>
          <MyButton type="submit" name="Create Recipe"></MyButton>
        </div>
      </form>
    </div>
  );
}
