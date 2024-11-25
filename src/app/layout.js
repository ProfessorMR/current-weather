import { Theme } from "@radix-ui/themes";
import { Barlow } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

const barlow = Barlow({ subsets: ["latin"], display: "swap", weight: "400" });

export const metadata = {
  title: "Current Weather",
  description: "",
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
