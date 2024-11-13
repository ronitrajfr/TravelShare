import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      email: true,
      spotify: true,
      instagram: true,
      twitter: true,
      bio: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  const data = await request.json();
  const { newUsername, name, image, bio, spotify, instagram, twitter } = data;

  const currentUser = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!currentUser || currentUser.username !== username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if new username is already taken
  if (newUsername && newUsername !== username) {
    const existingUser = await db.user.findUnique({
      where: { username: newUsername },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }
  }

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: {
      name,
      ...(newUsername && { username: newUsername }),
      ...(image && { image }),
      bio,
      spotify,
      instagram,
      twitter,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      email: true,
      spotify: true,
      instagram: true,
      twitter: true,
      bio: true,
    },
  });

  return NextResponse.json(updatedUser);
}
