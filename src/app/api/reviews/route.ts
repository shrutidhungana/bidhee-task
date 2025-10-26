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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const movieIdParam = searchParams.get("movieId");
    if (!movieIdParam) {
      return NextResponse.json(
        { message: "Missing movieId parameter" },
        { status: 400 }
      );
    }

    const movieId = parseInt(movieIdParam);
    const data = await fs.readFile(reviewsFile, "utf-8");
    const reviews: Review[] = JSON.parse(data);

    const movieReviews = reviews.filter((r) => r.movieId === movieId);
    movieReviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(movieReviews);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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

    const data = await fs.readFile(reviewsFile, "utf-8");
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
    await fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2));

    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to create review" },
      { status: 500 }
    );
  }
}
