import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    revalidateTag("volumes");
  } catch (error) {
    return new Response(`API error: ${error}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
