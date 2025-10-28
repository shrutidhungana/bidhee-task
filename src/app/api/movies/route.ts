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


const tempMoviesFile = path.join("/tmp", "movies.json");

const originalMoviesFile = path.join(process.cwd(), "movies.json");

async function initTempMoviesFile() {
  try {
    await fs.access(tempMoviesFile);
  } catch {
    const data = await fs.readFile(originalMoviesFile, "utf-8");
    await fs.writeFile(tempMoviesFile, data);
  }
}

export async function GET(req: NextRequest) {
  try {
    await initTempMoviesFile();
    const data = await fs.readFile(tempMoviesFile, "utf-8");
    let movies: Movie[] = JSON.parse(data);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search")?.toLowerCase() || "";
    const genreFilter = searchParams.get("genre")?.toLowerCase();
    const languageFilter = searchParams.get("language")?.toLowerCase();
    let sortField = searchParams.get("sortField") || "all";
    let sortOrder: "asc" | "desc" = "asc";

    if (sortField.includes("_")) {
      const [field, order] = sortField.split("_");
      sortField = field;
      sortOrder = order as "asc" | "desc";
    }

    if (search) {
      movies = movies.filter(
        (m) =>
          m.title.toLowerCase().includes(search) ||
          m.director.toLowerCase().includes(search) ||
          m.cast.some((c) => c.toLowerCase().includes(search))
      );
    }

    if (genreFilter && genreFilter !== "all") {
      movies = movies.filter((m) =>
        m.genre.some((g) => g.toLowerCase() === genreFilter)
      );
    }

    if (languageFilter && languageFilter !== "all") {
      movies = movies.filter(
        (m) => m.language.toLowerCase() === languageFilter
      );
    }

    if (sortField !== "all") {
      movies.sort((a, b) => {
        let valA = (a as any)[sortField];
        let valB = (b as any)[sortField];
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    const start = (page - 1) * limit;
    const paginatedMovies = movies.slice(start, start + limit);

    return NextResponse.json({
      total: movies.length,
      page,
      limit,
      data: paginatedMovies,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to load movies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const passwordHeader = req.headers.get("x-admin-password");
  if (!passwordHeader || passwordHeader !== adminPassword) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await initTempMoviesFile();
    const body = await req.json();
    const requiredFields = [
      "title",
      "language",
      "year",
      "genre",
      "rating",
      "director",
      "runtime",
      "synopsis",
      "cast",
      "posterUrl",
    ];

    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const data = await fs.readFile(tempMoviesFile, "utf-8");
    const movies: Movie[] = JSON.parse(data);

    
    const movieExists = movies.some(
      (m) => m.title.toLowerCase() === body.title.toLowerCase()
    );
    if (movieExists) {
      return NextResponse.json(
        { message: "Movie already exists" },
        { status: 409 } 
      );
    }

    const newMovie: Movie = {
      id: movies.length ? Math.max(...movies.map((m) => m.id)) + 1 : 1,
      ...body,
      reviewCount: 0,
      averageReviewRating: 0,
    };

    movies.push(newMovie);
    await fs.writeFile(tempMoviesFile, JSON.stringify(movies, null, 2));

    return NextResponse.json(newMovie, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create movie" },
      { status: 500 }
    );
  }
}

