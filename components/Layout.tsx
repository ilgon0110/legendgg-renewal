import React from "react";
import Navbar from "./Navbar";
import Seo from "./Seo";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Seo />
      <Navbar />
      <div>{children}</div>
    </>
  );
}
