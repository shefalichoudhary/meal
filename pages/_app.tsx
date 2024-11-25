import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider from next-auth
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  console.log(pageProps);
  return (
    <SessionProvider session={session}>
      {/* Wrap the app with SessionProvider */}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default App;
