import Searchbar from "./searchbar";

function HomePage() {
  return (
    <div className="my-20">
      <Searchbar></Searchbar>
      <div className="  container  md:mt-12 md:mb-32 my-16  grid  md:grid-cols-4 grid-cols-2 gap-6 mx-auto items-center  md:max-w-3xl max-w-sm">
        <div className="">
          <img
            src="./img-1.jpeg"
            className="h-auto  max-w-full rounded-lg shadow-2xl transition duration-300 ease-in-out hover:scale-110 "
          ></img>
        </div>
        <div>
          <img
            src="./img-2.jpeg"
            className="h-auto max-w-full rounded-lg shadow-2xl transition duration-300 ease-in-out hover:scale-110 "
          ></img>
        </div>{" "}
        <div>
          <img
            src="./img-3.jpeg"
            className="h-auto max-w-full rounded-lg shadow-2xl transition duration-300 ease-in-out hover:scale-110 "
          ></img>
        </div>
        <div>
          <img
            src="./img-4.jpeg"
            className="h-auto max-w-full rounded-lg shadow-2xl transition duration-300 ease-in-out hover:scale-110 "
          ></img>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
