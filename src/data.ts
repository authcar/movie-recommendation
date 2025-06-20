import type { Movie, UserRatings } from "./types";

export const movieDatabase: Movie[] = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    director: "Wachowski Sisters",
    duration: 136,
    image: "🎬",
    description: "A hacker discovers reality is a simulation",
    popularity: 95,
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    director: "Christopher Nolan",
    duration: 148,
    image: "🎭",
    description: "Dreams within dreams in a mind-bending heist",
    popularity: 92,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    director: "Quentin Tarantino",
    duration: 154,
    image: "🔫",
    description: "Interconnected criminal stories in LA",
    popularity: 89,
  },
  {
    id: 4,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    rating: 9.2,
    director: "Francis Ford Coppola",
    duration: 175,
    image: "👑",
    description: "The story of a powerful crime family",
    popularity: 97,
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    director: "Robert Zemeckis",
    duration: 142,
    image: "🏃",
    description: "Life lessons from an extraordinary ordinary man",
    popularity: 94,
  },
  {
    id: 6,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    director: "Christopher Nolan",
    duration: 152,
    image: "🦇",
    description: "Batman faces his greatest challenge",
    popularity: 96,
  },
  {
    id: 7,
    title: "Goodfellas",
    year: 1990,
    genre: ["Crime", "Drama"],
    rating: 8.7,
    director: "Martin Scorsese",
    duration: 146,
    image: "🍕",
    description: "Rise and fall in the mob world",
    popularity: 88,
  },
  {
    id: 8,
    title: "Shrek",
    year: 2001,
    genre: ["Animation", "Comedy", "Family"],
    rating: 7.9,
    director: "Andrew Adamson",
    duration: 90,
    image: "👹",
    description: "An ogre's journey to save a princess",
    popularity: 85,
  },
  {
    id: 9,
    title: "Titanic",
    year: 1997,
    genre: ["Drama", "Romance"],
    rating: 7.9,
    director: "James Cameron",
    duration: 194,
    image: "🚢",
    description: "Love story aboard the doomed ship",
    popularity: 93,
  },
  {
    id: 10,
    title: "Avatar",
    year: 2009,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.9,
    director: "James Cameron",
    duration: 162,
    image: "🌍",
    description: "Alien world colonization conflict",
    popularity: 91,
  },
  {
    id: 11,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    director: "Christopher Nolan",
    duration: 169,
    image: "🚀",
    description: "Space exploration to save humanity",
    popularity: 90,
  },
  {
    id: 12,
    title: "The Lion King",
    year: 1994,
    genre: ["Animation", "Drama", "Family"],
    rating: 8.5,
    director: "Roger Allers",
    duration: 88,
    image: "🦁",
    description: "Young lion's journey to become king",
    popularity: 92,
  },
];

export const userRatings: UserRatings = {
  1: { 1: 5, 2: 4, 6: 5, 11: 4 }, // User likes sci-fi and action
  2: { 3: 5, 4: 5, 7: 4, 6: 3 }, // User likes crime dramas
  3: { 5: 5, 9: 4, 8: 5, 12: 4 }, // User likes feel-good movies
};

export const userProfiles = [
  {
    id: 1,
    name: "User 1 (Sci-Fi Fan)",
    description: "Loves science fiction and action movies",
  },
  {
    id: 2,
    name: "User 2 (Crime Drama Lover)",
    description: "Prefers crime dramas and thrillers",
  },
  {
    id: 3,
    name: "User 3 (Feel-Good Movies)",
    description: "Enjoys family-friendly and romantic films",
  },
];

export const getAllGenres = (): string[] => {
  const genres = new Set<string>(["All"]);
  movieDatabase.forEach((movie) => {
    movie.genre.forEach((g) => genres.add(g));
  });
  return Array.from(genres);
};
