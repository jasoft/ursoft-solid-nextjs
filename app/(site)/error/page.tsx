import { Metadata } from "next";
import ErrorView from "@/components/ErrorView";

export const metadata: Metadata = {
  title: "404 - Not Found",

  // other metadata
  description: "Not Found",
};

const ErroPage = () => {
  return <ErrorView />;
};

export default ErroPage;
