"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const QuoteCard = ({ post, handleAuthorClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-700 bg-[#111416] bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit ">
      <div className="flex justify-between items-start gap-5 ">
        <Link
          href={`/profile?id=${post.creator._id}`}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col ">
            <h3 className="font-sans font-semibold ">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {post.creator.email}
            </p>
          </div>
        </Link>
      </div>
      <p className="mt-4 font-sans text-[0.9rem] text-gray-300">{post.quote}</p>
      <div
        className="mb-4 text-[0.95rem] font-medium text-gray-200"
        onClick={() => handleAuthorClick && handleAuthorClick(post.author)}
      >
        - {post.author}
      </div>
      {session?.user.id == post.creator._id && pathName === "/profile" && (
        <div className="mt-4 flex justify-start items-center gap-4 border-t border-gray-500 pt-3">
          <p
            className="text-sm text-emerald-600 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm text-red-600 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
