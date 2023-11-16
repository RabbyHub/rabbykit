import { Metadata } from "next";
import seoConfig from "../seo.config";
export const metadata: Metadata = {
  ...seoConfig,
};
import { Providers } from "../src/component/rabbykit";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
