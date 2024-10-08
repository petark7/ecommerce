import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "../index.css";
import "react-toastify/dist/ReactToastify.css";
import AuthWrapper from "../components/AuthWrapper";

export const metadata = {
  title: "Bluzify - a Firebase-based Ecommerce NextJS App",
  description: "Ecommerce built with Firebase, NextJS, Tailwind, FireCMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="/dist/output.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <ToastContainer />
          <AuthWrapper>{children}</AuthWrapper>
        </StoreProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
