"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Post = {
  id: string;
  imageUrls: string[];
  name: string;
  city: string;
  state: string;
  country: string;
  createdAt: string;
  createdBy: {
    name: string;
    username: string;
    image: string;
  };
  votes: {
    id: string;
    type: "upvote" | "downvote";
  }[];
};

export default function SinglePostView() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : (params.id?.[0] ?? "");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Post not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 max-md:py-24">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <PostCard post={post} currentUser={null} />
        </CardContent>
      </Card>
    </div>
  );
}
