"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowBigDown,
  ArrowBigUp,
  ChevronLeft,
  ChevronRight,
  Flag,
  MoreHorizontal,
  Share,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function PostCard({ post, currentUser }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  const upvotes = post.votes.filter((vote: any) => vote.type === "upvote");
  const downvotes = post.votes.filter((vote: any) => vote.type === "downvote");
  const userVote = currentUser
    ? post.votes.find((vote: any) => vote.userId === currentUser.id)
    : null;

  const handleVote = async (type: "upvote" | "downvote") => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to vote.",
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (!res.ok) throw new Error("Failed to vote");

      // Handle vote toggling
      const newVote =
        userVote?.type === type
          ? null // Remove vote if the same type is clicked again
          : { type, userId: currentUser.id };

      post.votes = post.votes.filter(
        (vote: any) => vote.userId !== currentUser.id,
      );

      if (newVote) {
        post.votes.push(newVote);
      }

      toast({
        title: "Success",
        description: `Your ${type} has been recorded.`,
      });
    } catch (error) {
      console.error("Error voting:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to record your vote. Please try again.",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleReport = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to report posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.id}/report`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to report");

      toast({
        title: "Success",
        description: "Thank you for your report. We'll review it shortly.",
      });
    } catch (error) {
      console.error("Error reporting:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit report. Please try again.",
      });
    }
  };

  return (
    <Card className="border-[#2c2c2c] bg-[#1c1c1c]">
      <CardHeader className="flex flex-row items-center p-4">
        <Link
          href={`/${post.createdBy.username}`}
          className="flex items-center gap-2"
        >
          <Avatar className="h-8 w-8 border border-[#2c2c2c]">
            <AvatarImage src={post.createdBy.image} alt={post.createdBy.name} />
            <AvatarFallback>{post.createdBy.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {post.createdBy.name}
            </span>
            <span className="text-xs text-gray-400">
              @{post.createdBy.username}
            </span>
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleReport}>
              <Flag className="mr-2 h-4 w-4" />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={post.imageUrls[currentImageIndex]}
            alt={post.name}
            className="h-full w-full object-cover"
          />
          {post.imageUrls.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? post.imageUrls.length - 1 : prev - 1,
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === post.imageUrls.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
                {post.imageUrls.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("upvote")}
              disabled={isVoting}
            >
              <ArrowBigUp
                className={`h-6 w-6 ${
                  userVote?.type === "upvote"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
            </Button>
            <span className="text-sm font-medium text-white">
              {upvotes.length - downvotes.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("downvote")}
              disabled={isVoting}
            >
              <ArrowBigDown
                className={`h-6 w-6 ${
                  userVote?.type === "downvote"
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await navigator.share({
                title: post.name,
                text: `Check out ${post.name} on TravelShare`,
                url: `${window.location.origin}/posts/${post.id}`,
              });
            }}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-white">
          <h3 className="font-semibold">{post.name}</h3>
          <p className="text-sm text-gray-400">
            {post.city}, {post.state}, {post.country}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
