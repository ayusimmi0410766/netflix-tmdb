import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
};

export default function App() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`${BASE}/movie/popular?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setPopular(d.results));

    fetch(`${BASE}/trending/movie/week?api_key=${API_KEY}`)
      .then(r => r.json())
      .then(d => setTrending(d.results));
  }, []);

  const Row = ({ title, movies }: { title: string; movies: Movie[] }) => (
    <div style={{ marginBottom: 30 }}>
      <h2 style={{ marginLeft: 20 }}>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 12,
          padding: 20
        }}
      >
        {movies.map(m => (
          <img
            key={m.id}
            src={IMG + m.poster_path}
            alt={m.title}
            style={{
              width: 160,
              borderRadius: 8,
              cursor: "pointer",
              transition: "transform 0.3s"
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "15px 25px",
          background: "black",
          position: "sticky",
          top: 0
        }}
      >
        <h1 style={{ color: "red", marginRight: 30 }}>NETFLIX</h1>
        <span>Home</span>
        <span style={{ marginLeft: 20 }}>Movies</span>
        <span style={{ marginLeft: 20 }}>Trending</span>
      </div>

      {/* Rows */}
      <Row title="Popular on Netflix" movies={popular} />
      <Row title="Trending Now" movies={trending} />
    </div>
  );
}
