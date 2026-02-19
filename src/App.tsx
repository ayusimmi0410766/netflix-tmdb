import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Netflix from "./Netflix";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/netflix"
        element={
          <ProtectedRoute>
            <Netflix />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
