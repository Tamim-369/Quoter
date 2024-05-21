"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import { ErrorBoundary } from "react-error-boundary";

const ProfilePageContent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const router = useRouter();

  const handleEdit = async (post) => {
    router.push(`/update-quote?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this quote?");
    if (hasConfirmed) {
      try {
        const deleted = await fetch(`/api/quote/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (deleted.ok) {
          const filteredPost = allPosts.filter((item) => item._id !== post._id);
          setAllPosts(filteredPost);
        }
      } catch (error) {
        console.error("Failed to delete the quote:", error);
      }
    }
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${userId}/posts`);
    const data = await response.json();
    if (data.length > 0) {
      setAllPosts(data);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <div className="pt-20">
      <Profile
        name="My"
        desc={"welcome to your profile page"}
        data={allPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const ProfilePage = () => (
  <ErrorBoundary fallback={<div>Something went wrong.</div>}>
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePageContent />
    </Suspense>
  </ErrorBoundary>
);

export default ProfilePage;
