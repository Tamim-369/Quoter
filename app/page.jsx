import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className="w-full pt-24 flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center md:w-5/12 sm:w-8/12 w-10/12 items-center">
        <h1 className=" text-center text-[1.7rem] font-semibold">
          Discover and Share
        </h1>
        <span className="text-center  text-3xl font-bold">
          Motivational Qoutes
        </span>
        <p className="text-center  text-lg text-gray-200 font-semibold ">
          Quoter is a platform for ambitious people to collaborate and motivate
          each others.
        </p>
      </div>
      <Feed />
    </section>
  );
};

export default Home;
