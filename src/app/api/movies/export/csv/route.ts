import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { stringify } from "csv-stringify/sync";

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
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const passwordHeader = req.headers.get("x-admin-password");

  if (!passwordHeader || passwordHeader !== adminPassword) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await initTempMoviesFile();
    const data = await fs.readFile(tempMoviesFile, "utf-8");
    const movies: Movie[] = JSON.parse(data);

    const records = movies.map((m) => ({
      ID: m.id,
      Title: m.title,
      Language: m.language,
      Year: m.year,
      Genre: m.genre.join(", "),
      Rating: m.rating,
      Director: m.director,
      Runtime: m.runtime,
      Synopsis: m.synopsis,
      Cast: m.cast.join(", "),
      PosterURL: m.posterUrl,
      ReviewCount: m.reviewCount,
      AverageReviewRating: m.averageReviewRating,
    }));

    const csv = stringify(records, { header: true });

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=movies.csv",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to export CSV" },
      { status: 500 }
    );
  }
}
