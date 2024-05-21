import Quote from "@/models/quote";
import { connecToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, quote, author } = await req.json();
  try {
    await connecToDB();
    const newQuote = new Quote({
      creator: userId,
      quote,
      author,
    });
    await newQuote.save();
    return new Response(JSON.stringify(newQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to post new Quote", { status: 500 });
  }
};
