import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const post = await db.post.create({
      data: {
        ...data,
        createdById: session?.user?.username,
      },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
