import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import LoginPage from "@/components/LoginPage";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return <LoginPage />;
}
