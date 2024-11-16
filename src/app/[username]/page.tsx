import { notFound } from "next/navigation";
import { auth } from "@/server/auth";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import { CustomSidebar } from "@/components/Sidebar";

type PageProps = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getProfile(username: string) {
  const res = await fetch(
    `http://localhost:3000/api/profile?username=${username}`,
    { cache: "no-store" },
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}
export default async function ProfilePage({ params }: any) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  const session = await auth();
  const user = session?.user;

  const isOwner = session?.user?.id === profile.id;

  if (isOwner) {
    return <ProfileEdit profile={profile} />;
  } else {
    return <ProfileView profile={profile} />;
  }
}
