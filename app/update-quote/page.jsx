"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Form from "@/components/Form";
const updateQuotePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");
  const [post, setPost] = useState({
    quote: "",
    author: "",
  });
  useEffect(() => {
    const getQuote = async () => {
      const response = await fetch(`/api/quote/${quoteId}`);
      const data = await response.json();
      setPost({
        quote: data.quote,
        author: data.author,
      });
    };
    if (quoteId) getQuote();
  }, [quoteId]);
  const updateQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!quoteId) {
      setSubmitting(false);
      return alert("Quote ID not found");
    } else {
      try {
        const response = await fetch(`/api/quote/${quoteId}`, {
          method: "PATCH",
          body: JSON.stringify({
            quote: post.quote,

            author: post.author,
          }),
        });
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      userName={session?.user.name}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateQuote}
    />
  );
};

export default updateQuotePage;
