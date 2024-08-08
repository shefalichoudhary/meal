import LocalDiningIcon from "@mui/icons-material/LocalDining";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-emerald-800">
      <nav className="     md:flex items-center md:justify-between  text-white font-sans  px-24 py-4 ">
        <Link href="/" className="text-xl">
          THE KITCHN
          <LocalDiningIcon style={{ marginLeft: "5px" }} />
        </Link>
        <div className=" md:text-right md:my-0 my-4 ">
          <Link href="mailto: choudharyshefali@gmail.com">
            choudharyshefali@gmail.com
          </Link>
        </div>

        <div className="md:mb-0 mb-3 md:text-center">
          <Link className="mr-5" href="">
            <InstagramIcon style={{ fontSize: "28px" }} />
          </Link>

          <Link className="mr-5" href="https://www.facebook.com/">
            <FacebookIcon style={{ fontSize: "28px" }} />
          </Link>
          <Link className="" href="https://www.whatsapp.com/">
            <WhatsAppIcon style={{ fontSize: "28px" }} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
export default Footer;
