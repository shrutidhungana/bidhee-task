import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Review {
  id: number;
  movieId: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

const reviewsFile = path.join(process.cwd(), "reviews.json");

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviewId = parseInt(params.id);
    const data = await fs.readFile(reviewsFile, "utf-8");
    const reviews: Review[] = JSON.parse(data);

    const review = reviews.find((r) => r.id === reviewId);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch review" },
      { status: 500 }
    );
  }
}
