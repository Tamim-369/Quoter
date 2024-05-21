"use client";

import { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Profile = ({ desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [info, setInfo] = useState({});
  useEffect(() => {
    if (data) {
      // console.log(data[0]?.creator);
      setInfo(data[0]?.creator);
    }
  }, [data]);
  return (
    <section className="md:w-full w-11/12 mx-auto  flex flex-col justify-center pt-10 items-center">
      <div className="img p-2 rounded-full mb-3">
        <Image
          src={info?.image || "/user.png"}
          alt="user_image"
          width={100}
          height={100}
          className="rounded-full object-center object-contain"
        />
      </div>
      <h1 className="text-left text-3xl font-medium">{info?.username}</h1>
      <p className="mt-3 text-lg text-gray-300 sm:text-xl max-w-2xl">
        All quotes from {info?.username || ""}
      </p>
      <div className="mt-10  space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data.map((post) => {
          return (
            <QuoteCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
