import MyButton from "@/components/my-button";
import { useRouter } from "next/navigation";

function HomePage() {
  const { push } = useRouter();
  const handleClick = () => {
    push("/explore-recipes");
  };
  return (
    <>
      <div className=" bg-emerald-800 py-14 mb-1 ">
        <div className="  container m-auto grid md:grid-cols-2  ">
          <div className=" mx-4 md:mx-0 md:mt-8">
            <div className=" font-sans text-5xl md:text-5xl lg:text-7xl leading-none font-semibold  text-white tracking-wide   mb-4 sm:mb-5">
              The Easiest Way To Make Your Favorite Meal
            </div>
            <div className=" text-sm text-white font-normal mb-2">
              A Recipe is Soulless.The essence of Recipe must come from you. The
              Cook
            </div>

            <MyButton
              type="button"
              name=" Explore Recipes"
              onClick={handleClick}
            ></MyButton>
          </div>

          <img src="./bg.png" height="50px" width="600px"></img>
        </div>
      </div>
    </>
  );
}
export default HomePage;
