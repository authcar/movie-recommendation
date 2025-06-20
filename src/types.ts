export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  duration: number;
  image: string;
  description: string;
  popularity: number;
  recommendationScore?: number;
  combinedScore?: number;
}

export interface UserRatings {
  [userId: number]: {
    [movieId: number]: number;
  };
}

export interface RecommendationResult {
  movie: Movie;
  score: number;
  reason: string;
}

export interface FilterOptions {
  searchTerm: string;
  selectedGenre: string;
}

export interface UserSimilarity {
  [userId: string]: number;
}

export type TabType = 'recommend' | 'browse';