import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Movie {
  id: number;
  title: string;
  language: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  runtime: number;
  synopsis: string;
  cast: string[];
  posterUrl: string;
  reviewCount: number;
  averageReviewRating: number;
}

const moviesFile = path.join(process.cwd(), "movies.json");

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(moviesFile, "utf-8");
    const movies: Movie[] = JSON.parse(data);

    const movieId = parseInt(params.id);
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to load movie" },
      { status: 500 }
    );
  }
}
