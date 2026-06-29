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
      <body>

        <Navbar />

        <main className="pt-[90px]">
          {children}
           <ScrollToTop />
        </main>

        <Footer />

      </body>
    </html>
  );
}