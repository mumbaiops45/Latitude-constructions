import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export const metadata = {
   title: {
    default: "Latitude Constructions",
    template: "%s | Latitude Constructions",
  },
  description: "Brick by Brick, We Build Your Dream Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#041423" />
      </head>
      <body>
        <Navbar />

        <main className="pt-[84px] sm:pt-[96px]">
          {children}
          <ScrollToTop />
        </main>

        <Footer />
      </body>
    </html>
  );
}