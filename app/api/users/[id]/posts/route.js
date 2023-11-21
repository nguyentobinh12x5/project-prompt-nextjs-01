import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// param ở đây chính là session?.user.id khi fetch data trong /Profile
// file bên ngoài ghi rõ users/[id]/posts
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params);
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
