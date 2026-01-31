import { useState } from "react";

export default function Login({ onLoggedIn }) {
    // 1. Local state for form inputs
    const [username, setUserName] = useState(import.meta.env.VITE_DEFAULT_EMAIL || "");
    const [password, setPassword] = useState(import.meta.env.VITE_DEFAULT_PASSWORD || "");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Stop page refresh        
        setErr("");
        setLoading(true); // lock the button
        try {
            await onLoggedIn({ username, password }); // talk to parent
        } catch (ex) {
            setErr(ex.message || "Login Failed");
        } finally {
            setLoading(false); // unlock the button
        }
    };

    return (
        <div className="login">
            <h1>Auth Demo — Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Controlled Inpute: Value comes from State, Change input state */}
                <input 
                    type="email"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
            {err && <p className="error">{err}</p>}
        </div>
    );
}