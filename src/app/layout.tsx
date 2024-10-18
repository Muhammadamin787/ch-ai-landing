import type {Metadata} from "next";
import "./globals.css";
import {Quicksand} from "@next/font/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const quicksand = Quicksand({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: "CH-AI",
    description: "This is a ch-ai app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={quicksand.className}
        >
        {children}
        </body>
        </html>
    );
}
