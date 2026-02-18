import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Netflix from "./Netflix";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/netflix" element={<Netflix />} />
    </Routes>
  );
}
