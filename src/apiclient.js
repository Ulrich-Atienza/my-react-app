// src/apiclient.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";
const RES_API_BASE = import.meta.env.VITE_RES_API_BASE;

export async function login({ username, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST", // 1. method
    headers: { 
      "Content-Type": "application/json",
    }, // 2. header
    body: JSON.stringify({ username, password }), // 3. body
  });
  if (!res.ok) throw new Error("Login Failed");

  const data = await res.json();
  return { token: data.token};
}

export async function fetchRecipes(auth) {
    const res = await fetch(`${RES_API_BASE}/api//recipes`, {
        //no method (GET is default)
        //no body
        headers: { Authorization: `Bearer ${auth.token}` }, // The VIP Pass
    });
    if (!res.ok) throw new Error ("Failed to load recipes");
    return res.json();
}

export async function logout(auth) {
    //client side only logout (forgot token)
}