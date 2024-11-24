import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { auth } from "@/server/auth";

export async function GET(request: NextRequest, { params }: any) {
  const { username } = await params;

  try {
    const posts = await db.post.findMany({
      where: {
        createdBy: {
          username: username,
        },
      },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = params;
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const post = await db.post.findUnique({
      where: { id: parseInt(postId) },
      include: { createdBy: true },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.createdBy.username !== session.user.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await db.post.delete({
      where: { id: parseInt(postId) },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
