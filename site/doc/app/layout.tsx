import seoConfig from "../seo.config";
export const metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
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
