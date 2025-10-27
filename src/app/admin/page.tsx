"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import TableComponent, { TableRow } from "@/components/TableComponent";
import DrawerAddMovie from "@/components/DrawerAddMovie";
import DeleteModal from "@/components/DeleteModal";
import { useLoginStore } from "@/store/loginStore";
import { useFilterStore } from "@/store/filterStore";
import { useMovies, useCreateMovie, useDeleteMovie } from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { FiPlus } from "react-icons/fi";

const Admin: React.FC = () => {
  const loginStore = useLoginStore();
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const handleLogout = () => {
    loginStore.setLogin(false);
    success("Logged out successfully!");
    router.push("/");
  };

  // Pagination & Filters
  const page = useFilterStore((state) => state.page);
  const limit = useFilterStore((state) => state.limit);
  const setFilter = useFilterStore((state) => state.setFilter);

  const { data, isLoading, isError, error } = useMovies({
    page,
    limit,
    search: "",
    genre: "",
    language: "",
    sortField: "id",
    sortOrder: "desc",
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const tableData: TableRow[] =
    data?.data.map((movie) => ({
      id: movie.id,
      imageUrl: movie.posterUrl,
      title: movie.title,
      genre: movie.genre.join(", "),
      year: movie.year?.toString() || "",
      language: movie.language,
    })) || [];

  const columns = [
    { key: "imageUrl", label: "Image" },
    { key: "title", label: "Title" },
    { key: "genre", label: "Genre" },
    { key: "year", label: "Year" },
    { key: "language", label: "Language" },
  ];

  // Add Movie Drawer States
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [posterUrl, setPosterUrl] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [director, setDirector] = useState("");
  const [runtime, setRuntime] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cast, setCast] = useState("");
  const [loading, setLoading] = useState(false);

  const createMovie = useCreateMovie();
  const deleteMovieMutation = useDeleteMovie();

  const handleAddMovie = () => {
    if (!posterUrl) {
      toastError("Please select a poster image");
      return;
    }

    const posterDemoUrl = posterUrl ? URL.createObjectURL(posterUrl) : "";
    setLoading(true);

    createMovie.mutate(
      {
        title,
        language,
        genre: genre.split(",").map((g) => g.trim()),
        year,
        rating,
        director,
        runtime,
        synopsis,
        cast: cast.split(",").map((c) => c.trim()),
        posterUrl: posterDemoUrl,
      },
      {
        onSuccess: () => {
          success("Movie added successfully!");
          setDrawerOpen(false);

          setPosterUrl(null);
          setTitle("");
          setLanguage("");
          setGenre("");
          setYear("");
          setRating("");
          setDirector("");
          setRuntime("");
          setSynopsis("");
          setCast("");
          setLoading(false);
        },
        onError: (err: any) => {
          toastError(err.message || "Failed to add movie");
          setLoading(false);
        },
      }
    );
  };

  // Delete Modal States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<TableRow | null>(null);

  const handleDeleteClick = (row: TableRow) => {
    setMovieToDelete(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!movieToDelete) return;

    deleteMovieMutation.mutate(movieToDelete.id, {
      onSuccess: () => {
        success(`Movie "${movieToDelete.title}" deleted successfully!`);
        setDeleteModalOpen(false);
        setMovieToDelete(null);
      },
      onError: (err: any) => {
        toastError(err.message || "Failed to delete movie");
        setDeleteModalOpen(false);
        setMovieToDelete(null);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar title="Admin Panel">
        <button
          onClick={handleLogout}
          className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </Navbar>

      <div className="pt-20 px-6 flex justify-end mb-4">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow-md transition"
        >
          <FiPlus size={18} />
          Add
        </button>
      </div>

      <main className="flex-1 pt-2 px-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Welcome, Admin!
        </h1>

        <div className="bg-white shadow rounded p-4 mb-6">
          {isLoading ? (
            <p className="text-gray-600">Loading movies...</p>
          ) : isError ? (
            <p className="text-red-500">Error: {error?.message}</p>
          ) : (
            <TableComponent
              columns={columns}
              data={tableData}
              onEdit={(id) => console.log("Edit movie", id)}
              onDelete={(id) => {
                const row = tableData.find((r) => r.id === id);
                if (row) handleDeleteClick(row);
              }}
            />
          )}
        </div>
      </main>

      <Footer>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(val) => setFilter("page", val)}
        />
      </Footer>

   
      <DrawerAddMovie
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        posterUrl={posterUrl ? URL.createObjectURL(posterUrl) : ""}
        onPosterChange={setPosterUrl}
        title={title}
        onTitleChange={setTitle}
        language={language}
        onLanguageChange={setLanguage}
        genre={genre}
        onGenreChange={setGenre}
        year={year}
        onYearChange={setYear}
        rating={rating}
        onRatingChange={setRating}
        director={director}
        onDirectorChange={setDirector}
        runtime={runtime}
        onRuntimeChange={setRuntime}
        synopsis={synopsis}
        onSynopsisChange={setSynopsis}
        cast={cast}
        onCastChange={setCast}
        onAdd={handleAddMovie}
        loading={loading}
      />

     
          <DeleteModal
              title= "Delete Movie"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        question={`Are you sure you want to delete "${movieToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Admin;
