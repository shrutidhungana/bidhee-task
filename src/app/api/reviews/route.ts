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

// Writable file in Vercel serverless
const tempReviewsFile = path.join("/tmp", "reviews.json");
// Original read-only JSON file
const originalReviewsFile = path.join(process.cwd(), "reviews.json");

// Initialize /tmp/reviews.json if it doesn't exist
async function initTempReviewsFile() {
  try {
    await fs.access(tempReviewsFile);
  } catch {
    const data = await fs.readFile(originalReviewsFile, "utf-8");
    await fs.writeFile(tempReviewsFile, data);
  }
}

export async function GET(req: NextRequest) {
  try {
    await initTempReviewsFile();

    const { searchParams } = new URL(req.url);
    const movieIdParam = searchParams.get("movieId");
    if (!movieIdParam) {
      return NextResponse.json(
        { message: "Missing movieId parameter" },
        { status: 400 }
      );
    }

    const movieId = parseInt(movieIdParam);
    const data = await fs.readFile(tempReviewsFile, "utf-8");
    const reviews: Review[] = JSON.parse(data);

    const movieReviews = reviews
      .filter((r) => r.movieId === movieId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return NextResponse.json(movieReviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await initTempReviewsFile();

    const body = await req.json();
    const requiredFields = ["movieId", "userName", "rating", "reviewText"];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (typeof body.rating !== "number" || body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { message: "Rating must be a number between 1 and 5" },
        { status: 400 }
      );
    }

    const data = await fs.readFile(tempReviewsFile, "utf-8");
    const reviews: Review[] = JSON.parse(data);

    const newReview: Review = {
      id: reviews.length ? Math.max(...reviews.map((r) => r.id)) + 1 : 1,
      movieId: body.movieId,
      userName: body.userName,
      rating: body.rating,
      reviewText: body.reviewText,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    await fs.writeFile(tempReviewsFile, JSON.stringify(reviews, null, 2));

    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create review" },
      { status: 500 }
    );
  }
}
