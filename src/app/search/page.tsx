"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { Search } from "@/components/Search";

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

export default function SearchPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query || "")}`,
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      void fetchSearchResults();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Search Results</h1>
      <div className="mb-8">
        <Search />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={null} />
          ))}
        </div>
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </div>
  );
}
