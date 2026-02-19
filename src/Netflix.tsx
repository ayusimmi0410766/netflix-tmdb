import { useEffect, useState } from "react";

export default function Netflix() {
  const [movies, setMovies] = useState<any[]>([]);

  const API_KEY = "b5e519473d4a23c33af367df08efbfa7";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ background: "#141414", color: "white", minHeight: "100vh" }}>
      {/* Navbar */}
      <div style={navbar}>
        <h2 style={{ color: "red" }}>NETFLIX</h2>
        <div style={menu}>
          <span>Home</span>
          <span>TV Shows</span>
          <span>Movies</span>
          <span>Originals</span>
        </div>
        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>

      {/* Section */}
      <h2 style={{ marginLeft: 30 }}>Trending Now</h2>

      <div style={grid}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            style={poster}
          />
        ))}
      </div>
    </div>
  );
}

const navbar: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  backgroundColor: "black",
};

const menu: React.CSSProperties = {
  display: "flex",
  gap: "20px",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "15px",
  padding: "20px 30px",
};

const poster: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  transition: "transform 0.3s",
  cursor: "pointer",
};

const logoutBtn: React.CSSProperties = {
  padding: "8px 15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
