import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Netflix from "./Netflix";

export default function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/netflix" /> : <Login />}
      />

      {/* Protected route */}
      <Route
        path="/netflix"
        element={isLoggedIn ? <Netflix /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
