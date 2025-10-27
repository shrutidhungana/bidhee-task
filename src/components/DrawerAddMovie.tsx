"use client";

import React, { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import ImageUpload from "./ImageUpload";

interface DrawerAddMovieProps {
  isOpen: boolean;
  onClose: () => void;

  posterUrl: string | null;
  onPosterChange: (file: File | null) => void;
  title: string;
  onTitleChange: Dispatch<SetStateAction<string>>;
  language: string;
  onLanguageChange: Dispatch<SetStateAction<string>>;
  genre: string;
  onGenreChange: Dispatch<SetStateAction<string>>;
  year: string;
  onYearChange: Dispatch<SetStateAction<string>>;
  rating: string;
  onRatingChange: Dispatch<SetStateAction<string>>;
  director: string;
  onDirectorChange: Dispatch<SetStateAction<string>>;
  runtime: string;
  onRuntimeChange: Dispatch<SetStateAction<string>>;
  synopsis: string;
  onSynopsisChange: Dispatch<SetStateAction<string>>;
  cast: string;
  onCastChange: Dispatch<SetStateAction<string>>;

  onAdd: () => void;
  loading?: boolean;
}

const DrawerAddMovie: React.FC<DrawerAddMovieProps> = ({
  isOpen,
  onClose,
  posterUrl,
  onPosterChange,
  title,
  onTitleChange,
  language,
  onLanguageChange,
  genre,
  onGenreChange,
  year,
  onYearChange,
  rating,
  onRatingChange,
  director,
  onDirectorChange,
  runtime,
  onRuntimeChange,
  synopsis,
  onSynopsisChange,
  cast,
  onCastChange,
  onAdd,
  loading = false,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Overlay */}
      {isOpen && (
        <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      )}

      {/* Drawer */}
      <div
        className="relative h-full bg-white shadow-xl overflow-y-auto p-6 flex flex-col gap-4
                      w-full sm:w-3/4 md:w-1/2 lg:w-96 transition-transform duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">Add Movie</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Poster */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Poster</label>
          <ImageUpload
            value={posterUrl || ""}
            onChange={(file, preview) => {
              onPosterChange(file);
              if (preview) {
                
                onPosterChange(file);
              }
            }}
            storageKey="newMoviePoster"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Language */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Language</label>
          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Genre</label>
          <input
            type="text"
            placeholder="Genre (comma separated)"
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Year */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Year</label>
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => onYearChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Rating</label>
          <input
            type="text"
            placeholder="Rating (0-10)"
            value={rating}
            onChange={(e) => onRatingChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Director */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Director</label>
          <input
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => onDirectorChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Runtime */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">
            Runtime (minutes)
          </label>
          <input
            type="text"
            placeholder="Runtime"
            value={runtime}
            onChange={(e) => onRuntimeChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Synopsis */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Synopsis</label>
          <textarea
            placeholder="Synopsis"
            value={synopsis}
            onChange={(e) => onSynopsisChange(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Cast */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Cast</label>
          <input
            type="text"
            placeholder="Cast (comma separated)"
            value={cast}
            onChange={(e) => onCastChange(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={onAdd}
          disabled={loading}
          className={`mt-4 py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default DrawerAddMovie;
