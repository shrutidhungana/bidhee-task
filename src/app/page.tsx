"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import LoginForm from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";
import { useLoginStore } from "@/store/loginStore";
import useToast from "@/hooks/useToast";
import { CardSkeleton } from "@/components/Skeleton"; 


export default function Home() {
  const router = useRouter();
  const { success, error } = useToast();

  const page = useFilterStore((state) => state.page);
  const limit = useFilterStore((state) => state.limit);
  const search = useFilterStore((state) => state.search);
  const genre = useFilterStore((state) => state.genre);
  const language = useFilterStore((state) => state.language);
  const sortField = useFilterStore((state) => state.sortField);
  const sortOrder = useFilterStore((state) => state.sortOrder);
  const setFilter = useFilterStore((state) => state.setFilter);

  const {
    data,
    isLoading,
    isError,
    error: moviesError,
  } = useMovies({
    page,
    limit,
    search,
    genre,
    language,
    sortField,
    sortOrder,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleCardClick = (id: string | number) => {
    router.push(`/movies/${id}/`);
  };

  // --- Login modal state ---
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginStore = useLoginStore();
  const loginMutation = useLogin();

 

  const handleAdminClick = () => {
    if (!loginStore.isLoggedIn) {
      setIsLoginOpen(true);
    } 
  };

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({ username, password });
      loginStore.setLogin(true);
      setIsLoginOpen(false);
      success("Logged in successfully!");
      setUsername("");
      setPassword("");
      router.push("/admin");
    } catch (err: any) {
      loginStore.setError(err.message);
      error(err.message);
    }
  };

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

        <button
          onClick={handleAdminClick}
          className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          Login
        </button>
      </Navbar>

      <div className="hidden md:flex pt-6">
        <div className="w-64 mt-8">
          <Sidebar title="Filters">
            <FilterSelect
              value={genre}
              onChange={(val) => setFilter("genre", val)}
              options={[
                "All",
                "Action",
                "Drama",
                "Comedy",
                "Sci-Fi",
                "Horror",
                "Romance",
              ].map((g) => ({ value: g, label: g }))}
              label="Genre"
            />
            <FilterSelect
              value={language}
              onChange={(val) => setFilter("language", val)}
              options={["All", "English", "Hindi", "Nepali"].map((l) => ({
                value: l,
                label: l,
              }))}
              label="Language"
            />
            <SortingSelect
              label="Sort by"
              value={sortField}
              onChange={(val) => setFilter("sortField", val)}
              options={[
                { value: "all", label: "All" },
                { value: "title_asc", label: "Title A-Z" },
                { value: "title_desc", label: "Title Z-A" },
                { value: "rating_desc", label: "Rating High-Low" },
                { value: "rating_asc", label: "Rating Low-High" },
                { value: "year_desc", label: "Year New-Old" },
                { value: "year_asc", label: "Year Old-New" },
              ]}
            />
          </Sidebar>
        </div>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-16">
          {isLoading ? (
            Array.from({ length: limit }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : isError ? (
            <p>Error: {moviesError?.message}</p>
          ) : (
            data?.data.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                subtitle={movie.genre.join(", ")}
                rating={movie.rating}
                year={movie.year}
                imageUrl={movie.posterUrl}
                onClick={() => handleCardClick(movie.id)}
                onButtonClick={() => handleCardClick(movie.id)}
                buttonText="View Details"
              />
            ))
          )}
        </main>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 pt-6">
        <Sidebar title="Filters">
          <FilterSelect
            value={genre}
            onChange={(val) => setFilter("genre", val)}
            options={[
              "All",
              "Action",
              "Drama",
              "Comedy",
              "Sci-Fi",
              "Horror",
              "Romance",
            ].map((g) => ({ value: g, label: g }))}
            label="Genre"
          />
          <FilterSelect
            value={language}
            onChange={(val) => setFilter("language", val)}
            options={["All", "English", "Hindi", "Nepali"].map((l) => ({
              value: l,
              label: l,
            }))}
            label="Language"
          />
          <SortingSelect
            label="Sort by"
            value={sortField}
            onChange={(val) => setFilter("sortField", val)}
            options={[
              { value: "all", label: "All" },
              { value: "title_asc", label: "Title A-Z" },
              { value: "title_desc", label: "Title Z-A" },
              { value: "rating_desc", label: "Rating High-Low" },
              { value: "rating_asc", label: "Rating Low-High" },
              { value: "year_desc", label: "Year New-Old" },
              { value: "year_asc", label: "Year Old-New" },
            ]}
          />
        </Sidebar>

        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-16">
          {isLoading ? (
            Array.from({ length: limit }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : isError ? (
            <p>Error: {moviesError?.message}</p>
          ) : (
            data?.data.map((movie) => (
              <Card
                key={movie.id}
                title={movie.title}
                subtitle={movie.genre.join(", ")}
                rating={movie.rating}
                year={movie.year}
                imageUrl={movie.posterUrl}
                onClick={() => handleCardClick(movie.id)}
                onButtonClick={() => handleCardClick(movie.id)}
                buttonText="View Details"
              />
            ))
          )}
        </main>
      </div>

      <Footer>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(val) => setFilter("page", val)}
        />
      </Footer>

      {/* --- Login Modal --- */}
      {isLoginOpen && (
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
          loading={loginMutation.isLoading}
          errorMessage={loginStore.error}
          onClose={() => setIsLoginOpen(false)} // <-- close modal
        />
      )}
    </div>
  );
}
