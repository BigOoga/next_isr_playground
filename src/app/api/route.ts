export async function GET(request: Request) {
  return Response.json({
    posts: [
      {
        slug: "1",
        name: "one",
      },
      {
        slug: "test",
        name: "test story",
      },
    ],
  });
}
