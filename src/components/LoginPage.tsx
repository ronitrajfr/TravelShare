"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Hero Image */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1598324789736-4861f89564a0?q=80&w=2070"
          alt="Taj Mahal at sunrise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 max-w-md text-white">
          <h2 className="mb-2 text-2xl font-bold">Discover India's Beauty</h2>
          <p className="text-sm opacity-90">
            From the majestic Taj Mahal to the serene backwaters of Kerala,
            share your journey through the incredible landscapes of India
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center bg-black p-8 lg:w-1/2">
        <Card className="w-full max-w-md space-y-8 border-zinc-800 bg-black p-8">
          <div className="space-y-2 text-center">
            <div className="mb-4 flex justify-center gap-x-3">
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
              <h1 className="text-3xl font-bold tracking-tight text-white">
                TravelShare
              </h1>
            </div>

            <p className="text-zinc-400">
              Connect with fellow travelers and share your adventures across
              India
            </p>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full bg-white text-black transition-colors hover:bg-zinc-200"
              onClick={() => signIn("google", { callbackUrl: "/home" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31.27"
                height="32"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-sm text-zinc-500">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-white">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
