import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quoter",
  description: "Discover and share motivational Qoutes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="w-full min-h-screen bg-[#0e1113]  text-gray-100">
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
