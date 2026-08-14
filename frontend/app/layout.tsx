import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Todo Manager",
  description:
    "Next.js Todo application with Django REST Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}