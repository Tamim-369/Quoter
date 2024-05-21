import User from "@/models/user";
import { connecToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connecToDB();
    const user = await User.findById(params.id);
    if (user) {
      console.log(user);
      return new Response(JSON.stringify(user), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to get all Quotes", { status: 500 });
  }
};
