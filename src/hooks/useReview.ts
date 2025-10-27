"use client";

import { useQuery } from "@tanstack/react-query";
import type { Review } from "./useReviews";

const fetchReview = async (id: number): Promise<Review> => {
  const res = await fetch(`/api/reviews/${id}`);
  if (!res.ok) throw new Error("Failed to fetch review");
  return res.json();
};

export const useReview = (id?: number) => {
  return useQuery<Review, Error>({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id!),
    enabled: !!id,
  });
};
