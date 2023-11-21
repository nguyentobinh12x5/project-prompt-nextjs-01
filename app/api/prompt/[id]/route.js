import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log(params);
    //{ id: '655b2c360647f3b856d526d0' } kết quả của console.log(params);
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("Failed to fetch prompts", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
//PATCH (update)
export const PATCH = async function (request, { params }) {
  try {
    await connectToDB();
    const existingPrompts = await Prompt.findById(params.id);
    if (!existingPrompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;
    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return Response("Prompt deleted sucessfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
