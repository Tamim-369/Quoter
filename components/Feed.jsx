"use client";

import { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredPosts(allPosts);
    }
    const filteredPosts = allPosts.filter((post) => {
      if (post.quote.toLowerCase().includes(searchText.toLowerCase())) {
        return post;
      }
      if (post.author.toLowerCase().includes(searchText.toLowerCase())) {
        return post;
      }
    });
    setFilteredPosts(filteredPosts);
  };
  const fetchPosts = async () => {
    const response = await fetch("/api/quote");
    const data = await response.json();
    if (data.length > 0) {
      setAllPosts(data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  // useEffect(() => {
  //   console.log(allPosts);
  // }, [allPosts]);

  return (
    <section className="mt-16 mx-auto sm:w-full w-11/12 max-w-xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full  flex-center">
        <input
          type="text"
          placeholder="Search for a quote or an author"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-800 bg-[#111416] py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-gray-600 text-white focus:outline-none focus:ring-0"
        />
      </form>
      <div className="mt-16  space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => {
              return <QuoteCard key={post._id} post={post} />;
            })
          : allPosts.map((post) => {
              return <QuoteCard key={post._id} post={post} />;
            })}
      </div>
    </section>
  );
};

export default Feed;
