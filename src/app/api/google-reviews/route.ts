import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ data: null, configured: false });
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "rating,user_ratings_total,reviews,url",
    key: apiKey,
  });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      { next: { revalidate: 3600 } },
    );
    const payload = await response.json();

    if (!response.ok || payload.status !== "OK") {
      return NextResponse.json(
        { data: null, configured: true, error: payload.error_message || payload.status },
        { status: 502 },
      );
    }

    const result = payload.result || {};
    const reviews = Array.isArray(result.reviews) ? result.reviews : [];

    return NextResponse.json({
      configured: true,
      data: {
        averageRating: result.rating || 0,
        totalRatings: result.user_ratings_total || reviews.length,
        url: result.url,
        reviews: reviews.map((review: any) => ({
          author: review.author_name,
          avatar: review.profile_photo_url,
          date: review.relative_time_description,
          rating: review.rating,
          comment: review.text,
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { data: null, configured: true, error: "Failed to fetch Google reviews" },
      { status: 502 },
    );
  }
}
