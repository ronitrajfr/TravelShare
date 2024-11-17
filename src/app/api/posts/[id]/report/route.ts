import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function POST(request: NextRequest, { params }: any) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = parseInt(params.id);

    // Check if user has already reported this post
    const existingReport = await db.report.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    if (existingReport) {
      return NextResponse.json(
        { error: "You have already reported this post" },
        { status: 400 },
      );
    }

    // Create report
    const report = await db.report.create({
      data: {
        reason: "Reported by user", // You could add more specific reasons
        postId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Error reporting:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
