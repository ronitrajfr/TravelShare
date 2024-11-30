import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function POST(req: Request, { params }: any) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { type } = await req.json();
    const postId = parseInt(params.id);

    // Remove any existing votes by this user on this post
    await db.vote.deleteMany({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    // Create new vote
    const vote = await db.vote.create({
      data: {
        type,
        postId,
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(vote), { status: 201 });
  } catch (error) {
    console.error("Error voting:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
