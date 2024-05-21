import Quote from "@/models/quote";
import { connecToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connecToDB();

    const quote = await Quote.findById(params.id).populate("creator");
    if (!quote) {
      return new Response("Quote not found", { status: 404 });
    }
    console.log(quote);
    return new Response(JSON.stringify(quote), { status: 200 });
  } catch (error) {
    return new Response("Failed to get Quote", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { quote, author } = await request.json();
  try {
    await connecToDB();
    const existQuote = await Quote.findById(params.id);
    if (!existQuote) {
      return new Response("Quote not found", { status: 404 });
    }
    existQuote.quote = quote;
    existQuote.author = author;
    await existQuote.save();
    return new Response(JSON.stringify(existQuote), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Quote", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  // const { quote } = await request.json();
  try {
    await connecToDB();
    const deleted = await Quote.findByIdAndDelete(params.id);
    if (deleted) {
      return new Response("Quote deleted successfully", { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to delete Quote", { status: 500 });
  }
};
