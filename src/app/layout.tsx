import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import "@uploadthing/react/styles.css";
import { type Metadata } from "next";
import { auth } from "@/server/auth";
import RootLayoutClient from "@/components/RootLayoutClient";
import Providers from "@/components/Provider";

export const metadata: Metadata = {
  title: "TravelShare",
  description: "Share your travel experiences",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        </body>
      </Providers>
    </html>
  );
}
