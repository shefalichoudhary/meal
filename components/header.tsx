import "tailwindcss/tailwind.css";
import { signIn, useSession, signOut } from "next-auth/react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Header(props: any) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  if (session) {
    return (
      <>
        <nav className="md:flex md:items-center md:justify-between py-4 px-8 shadow-xl">
          <a href="/" className="font-serif tracking-widest ">
            THE KITCHN
            <LocalDiningIcon style={{ color: "black", marginLeft: "5px" }} />
          </a>
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-5 cursor-pointer md:hidden"
          >
            {open ? <MenuIcon /> : <CloseIcon />}
          </div>
          <ul
            className={`md:flex md :items-center tracking-wide  md:pb-0 pb-2  md:pt-0 pt-2 font-serif  ${
              open ? "hidden" : "static"
            }`}
          >
            {[
              ["AddRecipe", "/add-recipe"],
              ["Recipes", "/recipes"],
            ].map(([title, url]) => (
              <li key={title} className=" md:mx-3 md:my-0 my-3">
                <a
                  href={url}
                  className="   text-black  hover:underline decoration-1 duration-500 "
                >
                  {title}
                </a>
              </li>
            ))}
            <li>
              <button onClick={() => signOut()}>signOut</button>
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="md:flex md:items-center md:justify-between py-4 px-8 shadow-xl  ">
          <a href="/" className="font-serif tracking-widest ">
            THE KITCHN
            <LocalDiningIcon style={{ color: "black", marginLeft: "5px" }} />
          </a>
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-5 cursor-pointer md:hidden"
          >
            {open ? <MenuIcon /> : <CloseIcon />}
          </div>
          <ul
            className={`md:flex md :items-center tracking-wide  md:pb-0 pb-2  md:pt-0 pt-2 font-serif  ${
              open ? "hidden" : "static"
            }`}
          >
            {[
              ["Home", "/"],
              ["Recipes", "/recipes"],
            ].map(([title, url]) => (
              <li key={title} className=" md:mx-3 md:my-0 my-3">
                <a
                  href={url}
                  className="   text-black font-medium  hover:underline decoration-1 duration-500 "
                >
                  {title}
                </a>
              </li>
            ))}
            <li>
              <button onClick={() => signIn()}>signIn</button>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}
