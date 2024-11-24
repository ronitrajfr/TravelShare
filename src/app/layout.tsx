import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
//import "@uploadthing/react/styles.css";
import { type Metadata } from "next";
import { auth } from "@/server/auth";
import RootLayoutClient from "@/components/RootLayoutClient";
import Providers from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "TravelShare",
  description:
    "Discover and share hidden gems with breathtaking photos and precise locations, powered by the community. ",
  openGraph: {
    images: ["/og.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelShare",
    description:
      "Discover and share hidden gems with breathtaking photos and precise locations, powered by the community. ",
    images: ["/og.webp"],
    creator: "@ronitrajfr",
  },
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <html lang="en" className={GeistSans.variable}>
      <Providers>
        <body className="bg-[#0c0c0c]">
          <RootLayoutClient user={user}>{children}</RootLayoutClient>
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
