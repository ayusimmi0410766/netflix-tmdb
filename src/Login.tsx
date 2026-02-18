import { useState } from "react";

export default function Login() {
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

      // ✅ IMPORTANT — save login session
      if (data.message === "Login success") {
        localStorage.setItem("user", email);
        window.location.href = "/netflix";
      }
    } catch (err) {
      alert("Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #141E30 0%, #243B55 100%)",
      }}
    >
      <div
        style={{
          width: 360,
          padding: 32,
          borderRadius: 16,
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {isSignup && (
          <>
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSubmit} style={buttonStyle}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          style={{
            marginTop: 16,
            textAlign: "center",
            cursor: "pointer",
            color: "#00c6ff",
            fontSize: 14,
          }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New here? Create account"}
        </p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  backgroundImage: "linear-gradient(45deg, #ff416c, #ff4b2b)",
  color: "white",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
};
