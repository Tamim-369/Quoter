import Quote from "@/models/quote";
import { connecToDB } from "@/utils/database";

export const GET = async (req, res) => {
  try {
    await connecToDB();

    const allQuote = await Quote.find({}).populate("creator");
    return new Response(JSON.stringify(allQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to get all Quotes", { status: 500 });
  }
};
