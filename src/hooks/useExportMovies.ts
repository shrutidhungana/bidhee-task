"use client";

import { useMutation } from "@tanstack/react-query";

export const useExportMovies = () => {
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/movies/export/csv", {
        headers: {
          "x-admin-password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
        },
      });

      if (!res.ok) throw new Error("Failed to export CSV");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "movies.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
  });
};
