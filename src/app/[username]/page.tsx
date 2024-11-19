import { notFound } from "next/navigation";
import { auth } from "@/server/auth";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";
import { db } from "@/server/db";

type PageProps = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getProfile(username: string) {
  const profile = await db.user.findUnique({
    where: { username },
    include: {
      posts: {
        include: {
          votes: true,
          createdBy: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!profile) {
    return null;
  }

  return {
    ...profile,
    posts: profile.posts.map((post) => ({
      ...post,
      createdBy: {
        name: profile.name,
        username: profile.username,
        image: profile.image,
      },
    })),
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  const session = await auth();
  const user = session?.user;

  const isOwner = user?.username === profile.username;

  if (isOwner) {
    return <ProfileEdit profile={profile} />;
  } else {
    return <ProfileView profile={profile} />;
  }
}
