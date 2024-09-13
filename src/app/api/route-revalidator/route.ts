import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  try {
    // It's only going to revalidate the specific path, just for testing purposes
    revalidatePath("/volumes/1");

    // if (id) {
    //   console.log(`[Next.js] Revalidating /volume/${id}`);
    //   revalidatePath(`/volume/${id}`);
    // }
  } catch (error) {
    return new Response(`API error: ${error}`, {
      status: 400,
    });
  }

  return new Response("Success!", {
    status: 200,
  });
}
