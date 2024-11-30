import type {Metadata} from "next";
import "./globals.css";
import localFont from 'next/font/local';

const geistFont = localFont({
    src: [
        {
            path: './fonts/Geist-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Geist-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        // Add other font weights and styles as needed
    ],
    variable: '--font-geist',
});


export const metadata: Metadata = {
    title: "Ch-ai",
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
            className={geistFont.className}
        >
        {children}
        </body>
        </html>
    );
}
