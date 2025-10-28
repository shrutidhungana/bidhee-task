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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initTempReviewsFile();

    const reviewId = parseInt(params.id);
    const data = await fs.readFile(tempReviewsFile, "utf-8");
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
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch review" },
      { status: 500 }
    );
  }
}
