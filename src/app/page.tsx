"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import FilterSelect from "@/components/FilterSelect";
import SortingSelect from "@/components/SortingSelect";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import Card from "@/components/CardComponent";

import { useFilterStore } from "@/store/filterStore";
import { useMovies } from "@/hooks/useMovies";

export default function Home() {
  const isAdmin = true;

  const page = useFilterStore((state) => state.page);
  const limit = useFilterStore((state) => state.limit);
  const search = useFilterStore((state) => state.search);
  const genre = useFilterStore((state) => state.genre);
  const language = useFilterStore((state) => state.language);
  const sortField = useFilterStore((state) => state.sortField);
  const sortOrder = useFilterStore((state) => state.sortOrder);
  const setFilter = useFilterStore((state) => state.setFilter);

  // --- Fetch movies ---
  const { data, isLoading, isError, error } = useMovies({
    page,
    limit,
    search,
    genre,
    language,
    sortField,
    sortOrder,
  });

  const genres = [
    "All",
    "Action",
    "Drama",
    "Comedy",
    "Sci-Fi",
    "Horror",
    "Romance",
  ];
  const languages = ["All", "English", "Hindi", "Nepali"];
  const sortOptions = [
    { value: "all", label: "All" },
    { value: "rating", label: "Rating" },
    { value: "year", label: "Year" },
    { value: "title", label: "Title" },
    { value: "reviewCount", label: "Review Count" },
  ];

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="Movie Dashboard">
        <div className="flex flex-1 justify-center md:justify-center px-2">
          <SearchBar
            value={search}
            onChange={(val) => setFilter("search", val)}
            placeholder="Search movies..."
          />
        </div>
        {isAdmin && (
          <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100">
            Admin Panel
          </button>
        )}
      </Navbar>

      <div className="hidden md:flex pt-6">
        {/* Sidebar */}
        <div className="w-64 mt-8">
          <Sidebar title="Filters">
            <FilterSelect
              value={genre}
              onChange={(val) => setFilter("genre", val)}
              options={genres.map((g) => ({ value: g, label: g }))}
              label="Genre"
            />
            <FilterSelect
              value={language}
              onChange={(val) => setFilter("language", val)}
              options={languages.map((l) => ({ value: l, label: l }))}
              label="Language"
            />
            <SortingSelect
              label="Sort by"
              value={sortField}
              onChange={(val) => setFilter("sortField", val)}
              options={sortOptions}
            />
          </Sidebar>
        </div>

        {/* Movie Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-16">
          {isLoading && <p>Loading movies...</p>}
          {isError && <p>Error: {error?.message}</p>}
          {data?.data.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              subtitle={movie.genre.join(", ")}
              rating={movie.rating}
              year={movie.year}
              onClick={() => console.log("Movie clicked:", movie.id)}
              buttonText="View Details"
            />
          ))}
        </main>
      </div>

      {/* Mobile Sidebar & Grid */}
      <div className="md:hidden px-4 pt-6">
        <Sidebar title="Filters">
          <FilterSelect
            value={genre}
            onChange={(val) => setFilter("genre", val)}
            options={genres.map((g) => ({ value: g, label: g }))}
            label="Genre"
          />
          <FilterSelect
            value={language}
            onChange={(val) => setFilter("language", val)}
            options={languages.map((l) => ({ value: l, label: l }))}
            label="Language"
          />
          <SortingSelect
            label="Sort by"
            value={sortField}
            onChange={(val) => setFilter("sortField", val)}
            options={sortOptions}
          />
        </Sidebar>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          {isLoading && <p>Loading movies...</p>}
          {isError && <p>Error: {error?.message}</p>}
          {data?.data.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              subtitle={movie.genre.join(", ")}
              rating={movie.rating}
              year={movie.year}
              onClick={() => console.log("Movie clicked:", movie.id)}
              buttonText="View Details"
            />
          ))}
        </main>
      </div>

      {/* Footer + Pagination */}
      <Footer>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(val) => setFilter("page", val)}
        />
      </Footer>
    </div>
  );
}
