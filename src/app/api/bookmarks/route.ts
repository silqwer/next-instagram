import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, bookmark } = await request.json();

  if (!id || bookmark === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const result = bookmark ? addBookmark : removeBookmark;

  return result(user.id, id)
    .then((response) => NextResponse.json(response))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
