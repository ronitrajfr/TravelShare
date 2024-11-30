"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, PlusCircle, User } from "lucide-react";
import Image from "next/image";

type NavItem = {
  icon: React.ElementType;
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { icon: Home, href: "/home", label: "Home" },
  { icon: Search, href: "/search", label: "Search" },
  { icon: Compass, href: "/explore", label: "Explore" },
];

export function CustomSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col justify-between border-r border-gray-800 bg-black p-4 text-white md:flex overflow-x-hidden">
        <div>
          <Link href="/" className="mb-8 flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 274 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M133.395 249.066C110.637 248.615 87.8783 243.21 67.5987 232.842C48.8964 223.379 32.222 209.859 20.0543 192.959C7.21053 174.933 0 153.301 0 130.994V89.3078V39.7355V15.8506C0 5.26015 10.5905 -1.95038 20.2796 2.10554L71.6546 22.8335C75.0345 24.1855 78.8651 24.4108 82.2451 23.0589C98.9194 16.7497 117.396 13.1444 137 13.1444C156.604 13.1444 175.081 16.5243 191.755 23.0589C195.135 24.4108 198.965 24.1855 202.345 22.8335L253.72 1.4273C263.412 -2.4033 274 4.58191 274 15.1724V32.5227V82.3204V128.062C274 152.175 266.564 175.381 252.145 194.762C239.525 211.661 222.397 225.181 203.472 234.194C182.742 244.109 159.984 249.066 137 249.066H133.395ZM208 114.218C208 101.825 199.416 80.2183 187.023 80.2183C174.63 80.2183 165 101.602 165 114.218C165 126.611 176.107 144.218 188.5 144.218C200.893 144.218 208 126.611 208 114.218ZM110 114.218C110 101.825 99.3701 80.2183 86.977 80.2183C74.5839 80.2183 67.5987 101.602 67.5987 114.218C67.5987 126.611 74.5839 144.218 86.977 144.218C99.3701 144.218 110 126.611 110 114.218ZM199 173C199 173 175.84 185.403 101 184.5C85.7838 184.316 108.92 205.754 124.125 206.357C147.745 207.293 181.498 198.83 199 173Z"
                fill="url(#paint0_linear_1_54)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_54"
                  x1="137"
                  y1="0.365723"
                  x2="137"
                  y2="249.066"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#7AFFA7" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold">TravelShare</span>
          </Link>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-colors ${
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <Link
            href={"/new-post"}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-black transition-colors hover:bg-gray-200"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New Post</span>
          </Link>
        </div>
        <div className="mt-auto">
          <Link
            href={`/u/${user.username}`}
            className="flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-gray-800"
          >
            <div className="h-8 w-8 rounded-full bg-gray-600 shrink-0 flex-shrink-0">
              {user.image ? (
                <Image
                  width={32}
                  height={32}
                  src={user.image}
                  alt={user.name}
                  className="h-full w-full rounded-full aspect-square object-cover shrink-0 flex-shrink-0"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-gray-400 truncate max-w-[180px]">
                @{user.username}
              </span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-gray-800 bg-black p-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-2xl ${
              pathname === item.href ? "text-white" : "text-gray-400"
            }`}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        ))}
        <Link href={"/new-post"} className="text-2xl text-gray-400">
          <PlusCircle className="h-6 w-6" />
        </Link>
        <Link
          href={`/u/${user.username}`}
          className="overflow-hidden rounded-full"
        >
          <div className="h-6 w-6 rounded-full bg-gray-600">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs text-white">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </Link>
      </nav>
    </>
  );
}
