"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  }, []);
  return (
    <nav className="flex justify-between items-center w-full mb-16 p-3 bg-[#111416] border-b border-b-gray-800">
      <Link href={"/"} className="flex gap-1 justify-center items-center">
        <span className=" text-2xl  font-semibold  py-[0.14rem] px-2 rounded-full">
          Quoter
        </span>
      </Link>
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex  gap-3 md:gap-5">
            <Link
              href={"/new-quote"}
              className="font-sans transition-all duration-150 ease-linear bg-gray-100 border py-1 px-3  flex justify-center items-center   hover:bg-transparent hover:text-white text-black rounded-full"
            >
              New Quote
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="font-sans transition-all duration-150 ease-linear hover:bg-gray-100 border py-1 px-3  flex justify-center items-center   bg-transparent text-white hover:text-black rounded-full"
            >
              Sign Out
            </button>
            <Link href={"/new-quote"} className="">
              <Image
                src="/user.png"
                alt="user"
                font-sans
                width={40}
                height={40}
                className="rounded-full border p-[0.1rem] bg-gray-400"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => () => {
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="font-sans transition-all duration-150 ease-linear hover:bg-gray-100 border py-1 px-3  flex justify-center items-center   bg-transparent text-white hover:text-black rounded-full"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex  relative">
        {isUserLoggedIn ? (
          <div className="flex justify-center items-center">
            <Image
              src="/user.png"
              alt="user"
              font-sans
              width={40}
              height={40}
              className="rounded-full border p-[0.1rem] bg-gray-400"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-[#111416] border text-white border-gray-600 min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href={"/profile"}
                  className="text-base font-bold font-inter text-gray-300 hover:text-gray-500 "
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={"/new-quote"}
                  className="text-base font-bold font-inter text-gray-300 hover:text-gray-500 "
                  onClick={() => setToggleDropDown(false)}
                >
                  New Quote
                </Link>
                <button
                  className="mt-4 w-full font-sans transition-all duration-150 ease-linear bg-gray-100 border py-1 px-3  flex justify-center items-center   hover:bg-transparent hover:text-white text-black rounded-full"
                  onClick={() => signOut()}
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => () => {
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="font-sans transition-all duration-150 ease-linear hover:bg-gray-100 border py-1 px-3  flex justify-center items-center   bg-transparent text-white hover:text-black rounded-full"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
