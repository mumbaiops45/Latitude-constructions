import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Latitude Constructions",
  description: "Brick by Brick, We Build Your Dream Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="pt-[90px]">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}