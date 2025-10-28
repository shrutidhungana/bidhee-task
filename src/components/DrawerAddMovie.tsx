"use client";

import React, { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import ImageUpload from "./ImageUpload";
import Image from "next/image";

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
  buttonText?: string;

  isEdit?: boolean; // new prop
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
  buttonText = "Add",
  isEdit = false,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {isOpen && (
        <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      )}

      <div
        className="relative h-full bg-white shadow-xl overflow-y-auto p-6 flex flex-col gap-4
                      w-full sm:w-3/4 md:w-1/2 lg:w-96 transition-transform duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">
            {buttonText} Movie
          </h2>
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
          {isEdit ? (
            posterUrl && (
              <div className="w-40 h-60 relative border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                <Image
                  src={posterUrl}
                  alt="Poster"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )
          ) : (
            <ImageUpload
              value={posterUrl || ""}
              onChange={(file, base64) => onPosterChange(base64 || null)}
            />
          )}
        </div>

        
        {[
          { label: "Title", value: title, onChange: onTitleChange },
          { label: "Language", value: language, onChange: onLanguageChange },
          {
            label: "Genre (comma separated)",
            value: genre,
            onChange: onGenreChange,
          },
          { label: "Year", value: year, onChange: onYearChange },
          { label: "Rating (0-5)", value: rating, onChange: onRatingChange },
          { label: "Director", value: director, onChange: onDirectorChange },
          {
            label: "Runtime (minutes)",
            value: runtime,
            onChange: onRuntimeChange,
          },
          {
            label: "Cast (comma separated)",
            value: cast,
            onChange: onCastChange,
          },
        ].map((field) => (
          <div key={field.label} className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">{field.label}</label>
            <input
              type="text"
              placeholder={field.label}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        ))}

      
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

        <button
          onClick={onAdd}
          disabled={loading}
          className={`mt-4 py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {loading ? `${buttonText}ing...` : buttonText}
        </button>
      </div>
    </div>
  );
};

export default DrawerAddMovie;
