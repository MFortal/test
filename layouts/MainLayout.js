import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const MainLayout = ({
  children,
  title = "Title",
  description = "description",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};
