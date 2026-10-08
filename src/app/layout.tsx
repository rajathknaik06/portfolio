import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rajath K Naik — Python & Cloud Developer",
  description:
    "Portfolio of Rajath K Naik, Computer Science undergraduate at GITAM University specializing in Python, real-time socket architecture, Django backends, and Microsoft Azure cloud development.",
  keywords: [
    "Rajath K Naik",
    "Python Developer",
    "Cloud Developer",
    "Microsoft Azure",
    "Socket Programming",
    "Django",
    "PostgreSQL",
    "GITAM University",
    "Software Engineer",
  ],
  authors: [{ name: "Rajath K Naik" }],
  openGraph: {
    title: "Rajath K Naik — Python & Cloud Developer",
    description: "Architecting concurrent socket servers, scalable Django backends, and Microsoft Azure cloud solutions.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#020611",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#020611] text-[#f3f4f6] antialiased selection:bg-amber-400/30 selection:text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
