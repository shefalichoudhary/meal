import "tailwindcss/tailwind.css";
import { signIn, useSession, signOut } from "next-auth/react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Link from "next/link";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Header(props: any) {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-xl">
      <nav className="bg-white md:flex md:items-center md:justify-between py-4 px-24">
        <Link href="/" className="font-sans tracking-widest text-emerald-800">
          THE KITCHN
          <LocalDiningIcon
            style={{
              color: "rgb(16 185 129)",
              marginLeft: "5px",
            }}
          />
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-5 cursor-pointer text-emerald-800 md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul
          className={`md:flex md:items-center tracking-wide md:pb-0 pb-2 md:pt-0 pt-2 font-sans ${
            open ? "sticky" : "hidden"
          }`}
        >
          {status === "authenticated" ? (
            <>
              {[
                ["AddRecipe", "/add-recipe"],
                ["Recipes", "/recipes"],
              ].map(([title, url]) => (
                <li key={title} className="md:mx-3 md:my-0 my-3">
                  <Link
                    href={url}
                    className="text-md leading-6 font-medium text-emerald-800 decoration-1 duration-500"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <>
              {[
                ["Home", "/"],
                ["Recipes", "/recipes"],
              ].map(([title, url]) => (
                <li key={title} className="md:mx-3 md:my-0 my-3">
                  <Link
                    href={url}
                    className="text-emerald-800 font-medium hover:underline decoration-1 duration-500"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </>
          )}
          <button
            className="text-emerald-800 font-medium"
            onClick={() => {
              status === "authenticated" ? signOut() : signIn();
            }}
          >
            {status === "authenticated" ? "Logout" : "Login"}
          </button>
        </ul>
      </nav>
    </div>
  );
}
