import LocalDiningIcon from "@mui/icons-material/LocalDining";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Footer() {
  return (
    <>
      <nav className="md:flex items-center md:justify-between  text-white font-serif  px-14 py-4 shadow-lg bg-neutral-800">
        <a href="/" className="text-xl">
          THE KITCHN
          <LocalDiningIcon style={{ marginLeft: "5px" }} />
        </a>
        <div className=" md:text-right md:my-0 my-4 ">
          <a href="mailto: choudharyshefali@gmail.com">
            choudharyshefali@gmail.com
          </a>
        </div>

        <div className="md:mb-0 mb-3 md:text-center">
          <a className="mr-5" href="">
            <InstagramIcon style={{ fontSize: "28px" }} />
          </a>

          <a className="mr-5" href="https://www.facebook.com/">
            <FacebookIcon style={{ fontSize: "28px" }} />
          </a>
          <a className="" href="https://www.whatsapp.com/">
            <WhatsAppIcon style={{ fontSize: "28px" }} />
          </a>
        </div>
      </nav>
    </>
  );
}
export default Footer;
