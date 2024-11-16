"use client";

import { usePathname } from "next/navigation";
import { CustomSidebar } from "@/components/Sidebar";

export default function RootLayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const pathname = usePathname();

  // Show sidebar on all pages except home ("/") and only if user is authenticated
  const shouldShowSidebar = user && pathname !== "/";

  return (
    <div className="flex min-h-screen">
      {shouldShowSidebar && <CustomSidebar user={user} />}
      <main className={`flex-1 ${shouldShowSidebar ? "md:ml-64" : ""}`}>
        <div className="min-h-screen w-full">{children}</div>
      </main>
    </div>
  );
}
