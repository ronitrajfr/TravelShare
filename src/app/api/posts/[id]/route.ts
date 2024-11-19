import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(request: NextRequest, { params }: any) {
  const postId = await params.id;
  const parsedPostId = parseInt(postId);

  try {
    const post = await db.post.findUnique({
      where: { id: parsedPostId },
      include: {
        createdBy: {
          select: {
            name: true,
            username: true,
            image: true,
          },
        },
        votes: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
