import { Theme } from "@radix-ui/themes";
import { Barlow } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

const barlow = Barlow({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata = {
  title: "Current Weather",
  description: "",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
