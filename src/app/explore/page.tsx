"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/explore?page=${page}&limit=20`);
      const data = await res.json();
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Explore Travel Moments
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="relative aspect-square cursor-pointer">
              <Image
                src={post.imageUrls[0] as string}
                alt={post.name}
                fill
                className="rounded-lg object-cover transition-opacity hover:opacity-80"
              />
            </div>
          </Link>
        ))}
      </div>
      {loading && (
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      {!loading && hasMore && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
}
