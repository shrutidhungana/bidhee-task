"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Review {
  id: number;
  movieId: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

const fetchReviews = async (movieId: number): Promise<Review[]> => {
  const res = await fetch(`/api/reviews?movieId=${movieId}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

export const useReviews = (movieId: number) => {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery<Review[], Error>({
    queryKey: ["reviews", movieId],
    queryFn: () => fetchReviews(movieId),
    enabled: !!movieId,
  });

  // Mutation for posting a new review
  const addReviewMutation = useMutation({
    mutationFn: async (newReview: Omit<Review, "id" | "createdAt">) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to add review");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
    },
  });

  return {
    ...reviewsQuery,
    addReview: addReviewMutation.mutateAsync,
    isAdding: addReviewMutation.isPending,
  };
};
