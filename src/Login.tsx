import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const BASE = "https://netflix-backend-w20o.onrender.com";
      const url = isSignup ? `${BASE}/signup` : `${BASE}/login`;

      const body = isSignup
        ? { name, phone, email, password }
        : { email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      alert(data.message);

      // ✅ successful login → redirect
      if (res.ok && !isSignup) {
        localStorage.setItem("user", email);
        navigate("/netflix");
      }
    } catch (err) {
      alert("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {isSignup && (
          <>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={input}
            />
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={input}
            />
          </>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleSubmit} style={button}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)} style={toggle}>
          {isSignup
            ? "Already have an account? Login"
            : "New here? Create account"}
        </p>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #141E30, #243B55)",
};

const card: React.CSSProperties = {
  width: 360,
  padding: 32,
  borderRadius: 16,
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  color: "white",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const toggle: React.CSSProperties = {
  marginTop: 16,
  textAlign: "center",
  cursor: "pointer",
  color: "#00c6ff",
};
