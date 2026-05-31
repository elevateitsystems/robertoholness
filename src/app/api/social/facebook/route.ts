import { NextResponse } from "next/server";

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    return NextResponse.json({ data: [], configured: false });
  }

  const params = new URLSearchParams({
    fields: "id,message,permalink_url,full_picture,created_time",
    access_token: accessToken,
    limit: "6",
  });

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pageId}/posts?${params.toString()}`,
      { next: { revalidate: 1800 } },
    );
    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { data: [], configured: true, error: payload?.error?.message || "Facebook request failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      configured: true,
      data: (payload.data || []).map((item: any) => ({
        id: item.id,
        text: item.message,
        imageUrl: item.full_picture,
        link: item.permalink_url,
        createdAt: item.created_time,
      })),
    });
  } catch {
    return NextResponse.json(
      { data: [], configured: true, error: "Failed to fetch Facebook posts" },
      { status: 502 },
    );
  }
}
