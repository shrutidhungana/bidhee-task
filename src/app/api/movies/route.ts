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

export async function GET(req: NextRequest) {
  try {
    const data = await fs.readFile(moviesFile, "utf-8");
    let movies: Movie[] = JSON.parse(data);

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search")?.toLowerCase() || "";
    const genreFilter = searchParams.get("genre")?.toLowerCase();
    const languageFilter = searchParams.get("language")?.toLowerCase();
    const sortField = searchParams.get("sortField") || "id";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    if (search) {
      movies = movies.filter(
        (m) =>
          m.title.toLowerCase().includes(search) ||
          m.director.toLowerCase().includes(search) ||
          m.cast.some((c) => c.toLowerCase().includes(search))
      );
    }

    if (genreFilter) {
      movies = movies.filter((m) =>
        m.genre.some((g) => g.toLowerCase() === genreFilter)
      );
    }

    if (languageFilter) {
      movies = movies.filter(
        (m) => m.language.toLowerCase() === languageFilter
      );
    }

    movies.sort((a, b) => {
      let valA = (a as any)[sortField];
      let valB = (b as any)[sortField];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const start = (page - 1) * limit;
    const paginatedMovies = movies.slice(start, start + limit);

    return NextResponse.json({
      total: movies.length,
      page,
      limit,
      data: paginatedMovies,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to load movies" },
      { status: 500 }
    );
  }
}
