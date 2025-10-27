import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
