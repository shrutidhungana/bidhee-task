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
import {
  useMovies,
  useCreateMovie,
  useDeleteMovie,
  useUpdateMovie,
} from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";
import { FiPlus, FiDownload } from "react-icons/fi";
import { useExportMovies } from "@/hooks/useExportMovies";
import { TableSkeleton } from "@/components/Skeleton";

const Admin: React.FC = () => {
  const loginStore = useLoginStore();
  const router = useRouter();
  const { success, error: toastError } = useToast();

  const handleLogout = () => {
    loginStore.setLogin(false);
    success("Logged out successfully!");
    useFilterStore.getState().setFilter("page", 1);
    router.push("/");
  };

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
      rating: movie.rating.toString(),
      director: movie.director,
      runtime: movie.runtime.toString(),
      synopsis: movie.synopsis,
      cast: movie.cast.join(", "),
    })) || [];

  const columns = [
    { key: "imageUrl", label: "Image" },
    { key: "title", label: "Title" },
    { key: "genre", label: "Genre" },
    { key: "year", label: "Year" },
    { key: "language", label: "Language" },
  ];

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
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
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovieMutation = useDeleteMovie();
  const exportMutation = useExportMovies();

  const openAddDrawer = () => {
    setEditingMovieId(null);
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
    setDrawerOpen(true);
  };

  const handleAddOrUpdate = () => {
    if (!title || !language) {
      toastError("Title and Language are required");
      return;
    }

    setLoading(true);

    const movieData = {
      title,
      language,
      genre: genre.split(",").map((g) => g.trim()),
      year,
      rating,
      director,
      runtime,
      synopsis,
      cast: cast.split(",").map((c) => c.trim()),
      posterUrl: posterUrl || "",
    };

    if (editingMovieId) {
      updateMovie.mutate(
        { id: editingMovieId, data: movieData },
        {
          onSuccess: () => {
            success("Movie updated successfully!");
            setDrawerOpen(false);
            setEditingMovieId(null);
            setLoading(false);
          },
          onError: (err: any) => {
            toastError(err.message || "Failed to update movie");
             setDrawerOpen(false);
            setLoading(false);
          },
        }
      );
    } else {
      createMovie.mutate(movieData, {
        onSuccess: (createdMovie) => {
          success("Movie added successfully!");
          data?.data.unshift(createdMovie);
          setDrawerOpen(false);
          setLoading(false);
        },
        onError: (err: any) => {
          toastError(err.message || "Failed to add movie");
           setDrawerOpen(false);
          setLoading(false);
        },
      });
    }
  };

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
        setFilter("page", 1);
      },
      onError: (err: any) => {
        toastError(err.message || "Failed to delete movie");
        setDeleteModalOpen(false);
        setMovieToDelete(null);
      },
    });
  };

  const handleEditClick = (id: number | string) => {
    const movie = tableData.find((m) => m.id === id);
    if (!movie) return;

    setEditingMovieId(Number(id));
    setPosterUrl(movie.imageUrl || null);
    setTitle(movie.title || "");
    setLanguage(movie.language || "");
    setGenre(movie.genre || "");
    setYear(movie.year?.toString() || "");
    setRating(movie.rating || "");
    setDirector(movie.director || "");
    setRuntime(movie.runtime || "");
    setSynopsis(movie.synopsis || "");
    setCast(movie.cast || "");
    setDrawerOpen(true);
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

      <div className="pt-20 px-6 mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-purple-700">Welcome, Admin!</h1>

        <div className="flex gap-4">
          <button
            onClick={openAddDrawer}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded shadow-md transition"
          >
            <FiPlus size={18} />
            Add
          </button>
          <button
            onClick={() => exportMutation.mutate()}
            disabled={exportMutation.isLoading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition"
          >
            <FiDownload size={18} />
            {exportMutation.isLoading ? "Exporting..." : "Export CSV"}
          </button>
        </div>
      </div>

      <main className="flex-1 pt-2 px-6">
        <div className="bg-white shadow rounded p-4 mb-6">
          {isLoading ? (
            <TableSkeleton rows={10} cols={columns.length} />
          ) : isError ? (
            <p className="text-red-500">Error: {error?.message}</p>
          ) : (
            <TableComponent
              columns={columns}
              data={tableData}
              onEdit={handleEditClick}
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
        posterUrl={posterUrl || ""}
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
        onAdd={handleAddOrUpdate}
        loading={loading}
        buttonText={editingMovieId ? "Update" : "Add"}
        isEdit={!!editingMovieId}
      />

      <DeleteModal
        title="Delete Movie"
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
