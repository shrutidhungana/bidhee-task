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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const passwordHeader = req.headers.get("x-admin-password");
  if (!passwordHeader || passwordHeader !== adminPassword) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const movieId = parseInt(params.id);
    const body = await req.json();

    const data = await fs.readFile(moviesFile, "utf-8");
    const movies: Movie[] = JSON.parse(data);
    const index = movies.findIndex((m) => m.id === movieId);
    if (index === -1)
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });

    movies[index] = { ...movies[index], ...body };
    await fs.writeFile(moviesFile, JSON.stringify(movies, null, 2));
    return NextResponse.json(movies[index]);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update movie" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const passwordHeader = req.headers.get("x-admin-password");
  if (!passwordHeader || passwordHeader !== adminPassword) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const movieId = parseInt(params.id);
    const data = await fs.readFile(moviesFile, "utf-8");
    let movies: Movie[] = JSON.parse(data);
    const index = movies.findIndex((m) => m.id === movieId);
    if (index === -1)
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });

    const deleted = movies.splice(index, 1)[0];
    await fs.writeFile(moviesFile, JSON.stringify(movies, null, 2));
    return NextResponse.json(deleted);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to delete movie" },
      { status: 500 }
    );
  }
}

