export default function Netflix() {
    const logout = () => {
      localStorage.removeItem("user");
      window.location.href = "/";
    };
  
    return (
      <div style={{ color: "white", background: "black", minHeight: "100vh", padding: 20 }}>
        <h1>🎬 Netflix Home</h1>
        <button onClick={logout} style={{ padding: 10, marginTop: 20 }}>
          Logout
        </button>
      </div>
    );
  }
  