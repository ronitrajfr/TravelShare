import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Twitter, Instagram, Music } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";

export default function ProfileView({ profile }: { profile: any }) {
  return (
    <div className="min-h-screen bg-[#0c0c0c] p-4 md:p-8">
      <Card className="mx-auto max-w-4xl border-[#2c2c2c] bg-[#1c1c1c]">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-[#2c2c2c]">
              <AvatarImage alt="Profile picture" src={profile.image} />
              <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl text-white">
                {profile.name}
              </CardTitle>
              <CardDescription className="text-gray-400">
                @{profile.username}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white">About</h3>
              <p className="mt-2 text-gray-400">
                {profile.bio || "This user hasn't added a bio yet."}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Connect</h3>
              <div className="mt-2 flex space-x-4">
                {profile.email && (
                  <Link
                    href={`mailto:${profile.email}`}
                    className="text-gray-400 hover:text-white"
                  >
                    <Mail className="h-6 w-6" />
                  </Link>
                )}
                {profile.twitter && (
                  <Link
                    href={`https://twitter.com/${profile.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Twitter className="h-6 w-6" />
                  </Link>
                )}
                {profile.instagram && (
                  <Link
                    href={`https://instagram.com/${profile.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                )}
                {profile.spotify && (
                  <Link
                    href={`https://open.spotify.com/user/${profile.spotify}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Music className="h-6 w-6" />
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-white">Posts</h3>
              {profile.posts && profile.posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {profile.posts.map((post: any) => (
                    <PostCard key={post.id} post={post} currentUser={null} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No posts yet.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
