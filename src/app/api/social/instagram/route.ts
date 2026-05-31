import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || "me";

  if (!accessToken) {
    return NextResponse.json({ data: [], configured: false });
  }

  const params = new URLSearchParams({
    fields: "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp",
    access_token: accessToken,
    limit: "8",
  });

  try {
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?${params.toString()}`,
      { next: { revalidate: 1800 } },
    );
    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { data: [], configured: true, error: payload?.error?.message || "Instagram request failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      configured: true,
      data: (payload.data || []).map((item: any) => ({
        id: item.id,
        url: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
        link: item.permalink,
        caption: item.caption,
      })),
    });
  } catch {
    return NextResponse.json(
      { data: [], configured: true, error: "Failed to fetch Instagram media" },
      { status: 502 },
    );
  }
}
