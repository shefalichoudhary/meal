import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "@/components/footer";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Header></Header>
      <Component {...pageProps} />
      <Footer></Footer>
    </SessionProvider>
  );
};

export default App;
