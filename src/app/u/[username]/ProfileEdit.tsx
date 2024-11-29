"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  Globe,
  Mail,
  User,
  Twitter,
  Instagram,
  Music,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PostCard } from "@/components/PostCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfileEdit({ profile }: { profile: any }) {
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [image, setImage] = useState(profile.image);
  const [bio, setBio] = useState(profile.bio || "");
  const [spotify, setSpotify] = useState(profile.spotify || "");
  const [instagram, setInstagram] = useState(profile.instagram || "");
  const [twitter, setTwitter] = useState(profile.twitter || "");
  const [posts, setPosts] = useState(profile.posts || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Here you would typically upload to your storage service
    // For demo purposes, we'll just create a local URL
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/profile?username=${profile.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: profile.username,
          newUsername: username,
          name,
          image,
          bio,
          spotify,
          instagram,
          twitter,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile");
      }

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });

      // Redirect to the new username profile page
      router.push(`/u/${username}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update profile. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const res = await fetch(
        `/api/users/${profile.username}/posts?postId=${postId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setPosts(posts.filter((post: any) => post.id !== postId));
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] p-4 md:p-8">
      <Card className="mx-auto max-w-4xl border-[#2c2c2c] bg-[#1c1c1c]">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-[#2c2c2c]">
              <AvatarImage alt="Profile picture" src={image} />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl text-white">{name}</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your TravelShare profile settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="text-white">
            <TabsList className="grid w-full grid-cols-3 border-b border-[#2c2c2c] bg-[#1c1c1c]">
              <TabsTrigger value="general" className="text-white">
                General
              </TabsTrigger>
              <TabsTrigger value="social" className="text-white">
                Social
              </TabsTrigger>
              <TabsTrigger value="posts" className="text-white">
                Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    <User className="mr-2 inline-block h-4 w-4" />
                    Display Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                  />
                  <p className="text-sm text-gray-500">
                    This is how other travelers will see you on TravelShare
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    <Globe className="mr-2 inline-block h-4 w-4" />
                    Username
                  </Label>
                  <div className="flex">
                    <span className="flex items-center rounded-l-md border border-r-0 border-[#3c3c3c] bg-[#2c2c2c] px-3 text-sm text-gray-500">
                      travelshare.com/
                    </span>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="rounded-l-none border-[#3c3c3c] bg-[#2c2c2c] text-white"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Your unique profile URL for sharing your travel experiences
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    <Mail className="mr-2 inline-block h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-gray-500"
                  />
                  <p className="text-sm text-gray-500">
                    Your email address is used for account notifications and
                    cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-300">
                    About You
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-[#3c3c3c]">
                      <AvatarImage alt="Profile picture" src={image} />
                      <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <label htmlFor="photo-upload">
                      <Button
                        variant="outline"
                        className="border-[#3c3c3c] bg-[#2c2c2c] text-white hover:bg-[#3c3c3c]"
                        asChild
                      >
                        <span>
                          <Camera className="mr-2 h-4 w-4" />
                          Change Photo
                        </span>
                      </Button>
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="social" className="space-y-6 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-gray-300">
                    <Twitter className="mr-2 inline-block h-4 w-4" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                    placeholder="https://x.com/ronitajfr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-gray-300">
                    <Instagram className="mr-2 inline-block h-4 w-4" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                    placeholder="https://instagram.com/ronitajfr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spotify" className="text-gray-300">
                    <Music className="mr-2 inline-block h-4 w-4" />
                    Spotify
                  </Label>
                  <Input
                    id="spotify"
                    value={spotify}
                    onChange={(e) => setSpotify(e.target.value)}
                    className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                    placeholder="Your Spotify username url"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="posts" className="space-y-6 pt-6">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Your Posts
              </h2>
              {posts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post: any) => (
                    <div key={post.id} className="relative">
                      <PostCard post={post} currentUser={profile} />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute right-2 top-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure you want to delete this post?
                            </DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your post.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  You haven&apos;t created any posts yet.
                </p>
              )}
            </TabsContent>
          </Tabs>
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="bg-white text-black hover:bg-gray-200"
            >
              {isUpdating ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
