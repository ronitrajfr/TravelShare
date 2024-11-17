import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { PostCard } from "@/components/PostCard";

export default async function Home() {
  const session = await auth();
  const posts = await db.post.findMany({
    include: {
      createdBy: true,
      votes: true,
      reports: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={session?.user} />
        ))}
      </div>
    </div>
  );
}
