import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexGen AI - Premium Autonomous Agents",
  description: "Premium autonomous agents tailored for your business.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} bg-black`}
    >
      <body className="selection:bg-dark-pink selection:text-white font-sans">
        <SmoothScroll>
          {children}
          <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />
        </SmoothScroll>
      </body>
    </html>
  );
}
