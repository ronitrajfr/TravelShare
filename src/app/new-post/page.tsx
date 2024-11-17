"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type UploadedFile = {
  name: string;
  url: string;
  key: string;
};

export default function NewPost() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const removeFile = (key: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.key !== key));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const postData = {
        name: formData.get("name"),
        state: formData.get("state"),
        city: formData.get("city"),
        country: formData.get("country"),
        address: formData.get("address"),
        imageUrls: uploadedFiles.map((file) => file.url),
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("Failed to create post");

      toast({
        title: "Success",
        description: "Your post has been created successfully.",
      });

      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card className="border-[#2c2c2c] bg-[#1c1c1c]">
        <CardHeader>
          <CardTitle className="text-white">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="images" className="text-white">
                Images
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.key} className="relative">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-48 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(file.key)}
                      className="absolute right-2 top-2 rounded-full bg-black/50 p-1"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
                {uploadedFiles.length < 4 && (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res) {
                        const newFiles = res.map((file) => ({
                          name: file.name,
                          url: file.url,
                          key: file.key,
                        }));
                        setUploadedFiles((prev) => [...prev, ...newFiles]);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description: `Upload failed: ${error.message}`,
                      });
                    }}
                    className="rounded-lg border-2 border-dashed border-gray-600 transition-colors hover:border-gray-500"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Location Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  required
                  className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white">
                  State
                </Label>
                <Input
                  id="state"
                  name="state"
                  required
                  className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-white">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                required
                className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Full Address
              </Label>
              <Input
                id="address"
                name="address"
                required
                className="border-[#3c3c3c] bg-[#2c2c2c] text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || uploadedFiles.length === 0}
              className="w-full bg-white text-black hover:bg-gray-200"
            >
              {isSubmitting ? "Creating Post..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
