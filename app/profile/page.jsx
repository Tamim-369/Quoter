"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

const ProfilePage = () => {
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
      } catch (error) {}
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
  // useEffect(() => {
  //   console.log(allPosts);
  // }, [allPosts]);
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

export default ProfilePage;
