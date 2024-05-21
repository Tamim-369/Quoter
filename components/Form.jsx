import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit, userName }) => {
  return (
    <section className="flex pt-20 w-full max-w-full min-h-full justify-center items-center flex-col ">
      <h1 className="text-3xl text-left font-medium mb-5">{type} Quote</h1>
      <form
        className=" w-full max-w-2xl flex flex-col justify-center items-center gap-7 rounded-xl  bg-[#111416] p-5"
        onSubmit={handleSubmit}
      >
        <label className="w-full">
          <span className="font-semibold text-base text-gray-300">
            Enter Quote
          </span>
          <textarea
            value={post.quote}
            onChange={(e) => setPost({ ...post, quote: e.target.value })}
            name=""
            placeholder="write a quote ..."
            required
            className="w-full bg-[#1a1e20] border-zinc-100  flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-100 outline-0"
          />
        </label>
        <label className="w-full ">
          <span className="font-semibold text-base text-gray-300">
            Enter Quote Author
          </span>
          <input
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            name=""
            placeholder="author's name ..."
            required
            className=" w-full bg-[#1a1e20] border-zinc-100  flex rounded-lg  mt-2 p-3 text-sm text-gray-100 outline-0"
          />
        </label>
        <div className="flex justify-between w-full px-5 items-center mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="px-4 py-2 border border-zinc-600 cursor-pointer  text-base bg-zinc-600 text-white rounded-full"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 border border-zinc-600 cursor-pointer  text-base bg-gray-100 text-black rounded-full"
          >
            {type} Quote {submitting ? `...` : ""}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
