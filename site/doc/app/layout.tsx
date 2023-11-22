import { Metadata } from "next";
import seoConfig from "../seo.config";
export const metadata: Metadata = {
  ...seoConfig,
};
import "../style/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
