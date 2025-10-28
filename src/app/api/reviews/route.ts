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


const tempReviewsFile = path.join("/tmp", "reviews.json");

const originalReviewsFile = path.join(process.cwd(), "reviews.json");


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
